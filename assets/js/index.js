let list = document.getElementById('channel-list');
// let button = document.getElementById('button');
// let channelName = document.getElementById('channel-name');
// let data = document.getElementById('data');
// let username = document.getElementById('uname');
// let textMessage = document.getElementById('umessage');
// let channelId;
let channelArea = document.getElementById('channel-area');
let messageArea = document.getElementById('message-area');

// function addChannel(channel) {

//     var listItem = document.createElement('li');
//     listItem.innerText = channel.name;
//     Object.assign(listItem, {
//         className: "list-group-item",
//         id: channel.id
//     });
//     var particularChannel = listItem.innerText;
//     list.appendChild(listItem);
//     listItem.onclick = () => {
//         channelId = listItem.id;
//         data.style.display = "inline-block";
//         data.style.width = "100%";
//         username.value = null;
//         textMessage.value = null;
//         getMessages(listItem.id, particularChannel);
//     }
// }
// var channelList = () => {
//     fetch('http://0.0.0.0:5000/channels/')
//         .then(response => {
//             console.log(response);
//             return response.json()
//         })
//         .then(res => {
//             console.log(res);
//             var channel = res.resources;
//             channel.forEach(item => {
//                 if (item.name != "")
//                     addChannel(item);
//             });
//         })
// }
// channelList();

// button.onclick = function(event) {
//     event.preventDefault();
//     var name = channelName.value;
//     var data = {
//         name: name
//     }
//     fetch('http://0.0.0.0:5000/channels/', {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }).then((res) => {
//         console.log(res);
//         res.json()
//             .then(res => {
//                 console.log(res);
//                 addChannel(res.name)
//             });
//     })

//     .catch((err) => console.log(err));
//     channelName.value = null;
// };

// function getMessages(id, name) {
//     fetch(`http://0.0.0.0:5000/messages/?channel_id=${id}`)
//         .then(response => {
//             return response.json()
//         }).then(res => {

//             var message_channel = res.resources;
//             // console.log(x)
//             messageArea.innerHTML = "";
//             if (message_channel.length == 0) {
//                 channelArea.innerText = name;
//             }
//             message_channel.forEach(item => {
//                 console.log(item);
//                 displayMessages(item, name);
//             })
//         })
// }

// function addMessage() {

//     event.preventDefault();
//     // console.log(event);
//     let userx = '@' + username.value;
//     let message = textMessage.value;
//     console.log(messageArea);
//     let id = channelId
//     let dataMessage = {
//         username: userx,
//         text: message,
//         channel_id: id
//     };
//     fetch('http://0.0.0.0:5000/messages/', {
//             method: 'POST',
//             body: JSON.stringify(dataMessage)
//         })
//         .then(() => {
//             // debugger;
//             let userhtml = `<p>${userx}</p><p>${message}</p>`;
//             messageArea.innerHTML += userhtml;
//             console.log('I am ');
//             // event.preventDefault();
//         });
//     // addMessageToChannel(userx, message);
// }

// function addMessageToChannel(name, message) {

// }

// function prevent() {
//     let form = document.querySelector('#message_form');
//     form.addEventListener("click", function(event) {
//         event.preventDefault();
//     });
// }
// prevent();

// function displayMessages(message, channelName) {
//     {
//         channelArea.innerText = channelName;
//         console.log(channelName);
//         if (message.text != "" && message.username != "") {

//             let returnedMessage = `<p>${message.username}</p><p>${message.text}</p>`;
//             messageArea.innerHTML += returnedMessage;
//         }
//     }
// }
// var pusher = new Pusher('5164262e0c99192eb7c7', {
//     cluster: 'ap2',
//     forceTLS: true,
//     authEndpoint: 'http://0.0.0.0:5000/broadcast'
// });
// pusher.connection.bind('connected', function() {
//     alert('Realtime is go!');
// });
// const channel = pusher.subscribe("channels");
// console.log(channel);
var main = document.getElementById('channel-list');
var channelClickedId;

function displayChannels(item) {
    // let current_id = channelname.id;
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

function addChannel() {

    let name = document.getElementById('channel-name');
    event.preventDefault();
    let channelItem = "<li>" + `${name}` + "</li>";
    main.innerHTML += channelItem;
    let data = {
        name: name
    };
    fetch('http://0.0.0.0:5000/channels/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            return response.json()
        })
        .then(res => {
            console.log(res);
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

function preventDefaultAction() {
    var form = document.querySelector('#message_form');
    form.addEventListener("click", function(event) {
        event.preventDefault();
    });
}
preventDefaultAction();

function addMessage() {
    let username_messaging = document.getElementById('uname').value;
    let message_messaging = document.getElementById('umessage').value;

    let finalText = `<p> @${username_messaging}:</p>` + `<p>${message_messaging}</p>`;
    messageArea.innerHTML += finalText;

    let data = {
        username: `@${username_messaging}:`,
        text: message_messaging,
        channel_id: channelClickedId,
    }
    fetch('http://0.0.0.0:5000/messages/', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json()
                .then(res => {

                })
        })
}