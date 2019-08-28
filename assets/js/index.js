let list = document.getElementById('channel-list');
let button = document.getElementById('button');
let channelName = document.getElementById('channel-name');
let data = document.getElementById('data');
let sendMessage = document.getElementById('send_message');
let username = document.getElementById('uname');
let textMessage = document.getElementById('umessage');
let channelId, particularChannel;
let channelArea = document.getElementById('channel-area');
let messageArea = document.getElementById('message-area');

function addChannel(channel) {

    var listItem = document.createElement('li');
    listItem.onclick = () => {
        var channel_id = listItem.id;
        particularChannel = listItem.innerText;
        channelId = listItem.id;
        data.style.display = "inline-block";
        data.style.width = "100%";
        username.value = null;
        textMessage.value = null;
        getMessages(channel_id);
    }
    listItem.innerText = channel.name;
    Object.assign(listItem, {
        className: "list-group-item",
        id: channel.id
    })
    list.appendChild(listItem);
}
var x = () => {
    fetch('http://0.0.0.0:5000/channels/')
        .then(response => {
            console.log(response);
            return response.json()
        })
        .then(res => {
            console.log(res);
            var channel = res.resources;
            channel.forEach(item => {
                if (item.name != "")
                    addChannel(item);
            });
        })
}
x();

button.onclick = () => {
    var name = channelName.value;
    var data = {
        name: name
    }
    fetch('http://0.0.0.0:5000/channels/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        console.log(res);
        res.json()
            .then(res => {
                console.log(res);
                addChannel(res.name)
            });
    })

    .catch((err) => console.log(err));
    channelName.value = null;
};

function getMessages(id) {
    fetch(`http://0.0.0.0:5000/messages/?channel_id=${id}`)
        .then(response => {
            return response.json()
        }).then(res => {

            var x = res.resources;
            console.log(x)
            messageArea.innerHTML = "";
            if (x.length == 0) {
                channelArea.innerText = particularChannel;
            }
            x.forEach(item => {
                console.log(item);
                displayMessages(item);
            })
        })
}
document.querySelector("#send_message").addEventListener("click", function(event) {
        console.log(channelId);
        let userx = '@' + username.value;
        let message = textMessage.value;
        let id = channelId
        let dataMessage = {
            username: userx,
            text: message,
            channel_id: id
        }
        fetch(`http://0.0.0.0:5000/messages/`, {
            method: 'POST',
            body: JSON.stringify(dataMessage),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            console.log(response);
            response.json()
                .then(res => {
                    console.log(res);
                    var x = res.resources;
                    console.log(x);
                    displayMessages(x);
                })
        })
        event.preventDefault();
    })
    // sendMessage.onclick = function(event)

function displayMessages(message) {
    {
        if (message.text != "" && message.username != "") {
            channelArea.innerText = particularChannel;
            let channelUsername = document.createElement('p');
            let channelMessage = document.createElement('p');
            channelUsername.innerHTML = message.username + ':';
            channelMessage.innerHTML = message.text;
            messageArea.appendChild(channelUsername);
            messageArea.appendChild(channelMessage);
        }
    }
}