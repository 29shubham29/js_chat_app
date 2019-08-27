var list = document.getElementById('channel-list');
var button = document.getElementById('button');
var channelName = document.getElementById('channel-name');
var data = document.getElementById('data');
var sendMessage = document.getElementById('send_message');
var username = document.getElementById('uname');
var textMessage = document.getElementById('umessage');
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
        username.value = null;
        textMessage.value = null;
        getMessages(channel_id, );
    }
    listItem.innerText = channel.name;
    Object.assign(listItem, {
        className: "channel",
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
        // })
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
    // document.getElementById("channel-form").reset();
};

function getMessages(id) {
    fetch(`http://0.0.0.0:5000/messages/?channel_id=${id}`)
        .then(response => {
            return response.json()
        }).then(res => {
            var x = res.resources;
            console.log(x);
            // displayMessages(x);
            x.forEach(item => {
                if (item.text != "") {
                    console.log(item.text);
                    displayMessages(item);
                } else {
                    console.log("text is null")
                }
                // console.log(x.username);
            })
        })
}
sendMessage.onclick = () => {
    console.log(channelId);
    var userx = username.value;
    var message = textMessage.value;
    var id = channelId
    var dataMessage = {
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
}

function displayMessages(message) {
    console.log(message[0]);
    var resource =
        channelArea.innerText = particularChannel;
    let channelUsername = document.createElement('p');
    let channelMessage = document.createElement('p');
    channelUsername.innerText = message.username;
    channelMessage.innerText = message.text;
    messageArea.appendChild(channelUsername);
    messageArea.appendChild(channelMessage);
}