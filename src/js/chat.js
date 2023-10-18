"use strict"

// 열려있는 서버와 연결
const socket = io();

// 돔
const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");

// sendButton 클릭시 이벤트 구현
sendButton.addEventListener("click", ()=>{
    const param = {
        name : nickname.value,
        msg : chatInput.value
    }

    // 메시지를 보내는 코드
    socket.emit('chatting', param);

    chatInput.value = '';
})



// 클라이언트로 부터 소켓을 받는 코드
socket.on("chatting", (data)=>{
    const li = document.createElement("li");
    li.innerText = `${data.name}님이 - ${data.msg}`

    // ul태그인 chatList에 li를 자식으로 추가한다.
    chatList.appendChild(li);
})

console.log(socket);