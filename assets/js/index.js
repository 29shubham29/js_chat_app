let list = document.getElementById('channel-list');
let channelArea = document.getElementById('channel-area');
let messageArea = document.getElementById('message-area');
var main = document.getElementById('channel-list');
var channelClickedId;

function displayChannels(item) {
    let list_of_channel = "<li onclick =" + `displayMessages(${item.id}) id = ${item.id}>` + `${item.name}` + "</li>"
    main.innerHTML += list_of_channel;
}

function getChannels() {
    fetch('http://0.0.0.0:5000/channels/')
        .then(response => {
            return response.json();
        }).then(res => {
            console.log(res);
            let arr = res.resources;
            arr.forEach(item => {
                displayChannels(item);
            })
        })
}
window.onload = getChannels;
document.getElementById('channel-name').value = "";
let button = document.querySelector('#channel-form');
button.addEventListener("click", function(event) {
    event.preventDefault();
});

function addChannel() {
    event.preventDefault();
    let name = document.getElementById('channel-name').value;
    let channelItem = "<li>" + `${name}` + "</li>";
    console.log(channelItem)
    main.innerHTML += channelItem;
    let data = {
        name: name
    };
    fetch('http://0.0.0.0:5000/channels/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    document.getElementById('channel-name').value = "";

}

function displayMessages(id) {
    messageArea.innerText = "";
    document.getElementById('uname').value = "";
    document.getElementById('umessage').value = "";
    let channelClicked = document.getElementById(`${id}`).innerText;
    channelArea.innerText = channelClicked;
    channelClickedId = id;
    document.querySelector('#data').setAttribute('style', 'display:inline-block; width:100%;');

    fetch(`http://0.0.0.0:5000/messages/?channel_id=${id}`)
        .then(response => {
            return response.json()
        }).then(res => {
            console.log(res);
            let message_resources = res.resources;
            message_resources.forEach(message => {
                if (message.text != "" && message.username != "") {
                    let returnedMessage = `<p>${message.username}</p><p>${message.text}</p>`;
                    messageArea.innerHTML += returnedMessage;
                }
            })

        })
}

function addMessage() {
    event.preventDefault();
    let username_messaging = document.getElementById('uname').value;
    let message_messaging = document.getElementById('umessage').value;

    let finalText = `<p> @${username_messaging}:</p>` + `<p>${message_messaging}</p>`;
    messageArea.innerHTML += finalText;
    document.getElementById('uname').value = "";
    document.getElementById('umessage').value = "";
    let data = {
        username: `@${username_messaging}:`,
        text: message_messaging,
        channel_id: channelClickedId,
    }
    fetch('http://0.0.0.0:5000/messages/', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    messagePusherBroadcast(data);
}
var pusher = new Pusher('5164262e0c99192eb7c7', {
    cluster: 'ap2',
    forceTLS: true,
    encrypted: false
});

var channel = pusher.subscribe('messages');

channel.bind('message-added', function(data) {
    broadcastByPusher(data);
});

function messagePusherBroadcast(data) {
    // console.log(data);
    fetch("http://localhost:5000/broadcast", {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

function broadcastByPusher(data) {
    if (data.channel_id === channelClickedId) {
        alert("New Message:\n" + `${data.username}` + "\n" + "messaged: " + `${data.text}`);
    }
}
Pusher.logToConsole = true;