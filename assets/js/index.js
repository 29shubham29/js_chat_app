var list = document.getElementById('channel-list');
var button = document.getElementById('button');
var channelName = document.getElementById('channel-name');

function add(user) {
    var listItem = document.createElement('li');
    listItem.innerText = user;
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
                var name = item.name;
                if (name != "")
                    add(name);
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
                add(res.name)
            });
    })

    .catch((err) => console.log(err));
    channelName.value = null;
    // document.getElementById("channel-form").reset();
};