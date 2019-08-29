$(() => {
    //YOUR JQUERY CODE
    var list = document.getElementById('channel-list');
    var button = document.getElementById('button');
    var channelName = document.getElementById('channel-name');

    function add(user) {
        var listItem = document.createElement('li');
        listItem.setAttribute("class", "list-group-item");
        listItem.innerText = user.name;
        list.appendChild(listItem);
    }
    $.ajax({
        type: "GET",
        url: "http://0.0.0.0:5000/channels/",
        success: (users) => {
            console.log('users', users)
            var channel = users.resources;
            console.log(channel)
            $.each(channel, (i, user) => {
                // console.log(user.name);
                if (user.name != "") {
                    add(user);
                }
            });
        },
        error: () => {
            console.log('an error occured fetching users');
        }
    });

    button.onclick = () => {
        event.preventDefault();
        var data = {
            name: channelName.value,
        };
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5000/channels/",
            data: JSON.stringify(data),
            success: (newChannel) => {
                console.log(newChannel.name);
                add(newChannel);
            },
            error: (jqXHR, exception) => {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                console.log(msg);
            },
        })
        channelName.value = "";
    }
});
// fetch('https://api.github.com/users/saurabhpanja')
//     .then(res => res.json())
//     .then(result => console.log(result));