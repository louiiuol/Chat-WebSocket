const socket = io.connect('http://localhost:8080');

const formChat = $("#form_chat");
const message = $("#message");
const zoneChat = $("#zone_chat");
const feedbackZone = $("#feedback");

const nickname = prompt("enter your name");
socket.emit("new_user", nickname); 
document.title = " 🤟Welcome "+nickname+" 🤟";

socket.on('message', (data) => {
    feedbackZone.html('');
    getMessage(data.message, data. nickname);
});

socket.on("new_user", (name) => {
    zoneChat.prepend("<i><b>" + name + "</b> has join the conversation ... </i>");
});

socket.on('typing', (data) => {
    if (data) { feedbackZone.html("<p><i><b>" + nickname + "</b> is typing ... </i></p>"); } 
});

formChat.keypress( () => {
    socket.emit('typing' );
});

formChat.submit(() => {
    let msg = message.val();
    socket.emit("message", msg);
    getMessage(msg, nickname);
    message.val('').focus();
    return false;
});

const getMessage = (msg, name) => {
    const time = new Date().toLocaleTimeString();
    zoneChat.prepend("<p>" + time + "<strong>" + name + "</strong>: " + msg + "</p>");
}