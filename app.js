const express = require('express')
const http = require('http');
const app = express();
const path = require('path');
// 이 app이 http를 통해 실행되도록 설정
const server = http.createServer(app)
const socketIO = require('socket.io');

const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'src')));
// 운영체제에서 할당하는 포트가 안되면 5000번 포트를 사용
const PORT = process.env.PORT || 5000;

// io를 통해 소켓 핸들링
// 현제 서버에서 소켓을 연것과 같다. 클라이언트에서 연결을 시도해 이루어지면 콜백을 실행
// 커넥션 될 때 모든 내용은 socket에 저장된다. 
io.on('connection', (socket) =>{

  // 클라이언트에서 보낸 내용을 data로 받는다.
  // 여기서 "chatting"은 일종의 ID같은 것 보내는 쪽과 받는 쪽이 같아야 한다
    socket.on("chatting", (data)=>{ 
        console.log(data);
        io.emit("chatting", data); // 서버에서 보내는 것 
    })
})

// app.listen을 server.listen으로 바꿔주어야 한다
server.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
})