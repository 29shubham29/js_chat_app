var list = document.getElementById('channel-list');
var button = document.getElementById('button');
var channelName = document.getElementById('channel-name');
var data = document.getElementById('data');


function addChannel(channel) {
    var listItem = document.createElement('li');
    listItem.onclick = () => {
        console.log(listItem);
        var id = listItem.id;
        console.log(id);
        data.style.display = "inline-block"
        getMessages(id);
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
    fetch('http://0.0.0.0:5000/messages/?channel_id = id')
        .then(response => {
            return response.json()
        }).then(res => {
            console.log(res)
        })
}
var sendMessage = document.getElementById('send_message');
var username = document.getElementById('uname');
var textMessage = document.getElementById('umessage');
sendMessage.onclick = () => {
    var userx = username.value;
    var message = textMessage.value;
    console.log(userx);
    console.log(message);
    username.value = null;
    textMessage.value = ""
}