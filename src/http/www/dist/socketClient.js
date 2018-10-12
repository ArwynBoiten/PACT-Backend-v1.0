var socket = io.connect();

socket.on('errorMessage', function(data) {
    console.log('Server:', data);
    $('#messages').append($('<li>').text(data));
});

socket.on('session', function (data) {
    // Show container and clear members. //
    $('#sessionContainer').show();
    $('#sessionMembers > tbody').empty();

    // Fill ID & Contract section. //
    $('.sessionId').text("ID: " + data.id);
    $('.sessionCT').text("Contract: " + data.contractType.name);

    // Fill Memberlist. //
    $.each(data.members, function (key, value) {
        $('#sessionMembers > tbody:last-child').append('<tr><td>'+ value.name + '</td><td>'+ value.age +'</td></tr>');
    });

});

socket.on('connect', function() {

    $('#createButton').on('click', function () {

        var data = {
            id: $('.qrcoderef1').text(),
            ct: $('#contractType').val(),
            member: {
                name: $('#createFirstname').val() + " " + $('#createLastname').val(),
                age: $('#createAge').val()
            }
        }

        socket.emit('createSession', data);
        return false;
    });

    $('#joinButton').on('click', function () {
        var data = {
            id: $('.qrcoderef2').text(),
            member: {
                name: $('#joinFirstname').val() + " " + $('#joinLastname').val(),
                age: $('#joinAge').val()
            }
        }

        socket.emit('joinSession', data);
        return false;
    });

    $('#testButton').on('click', function () {
        socket.emit('generateContent', {contract: $('#contract').val(), age: 16});
        return false;
    });
});

$(function() {
    $('#clearButton').on('click', function () {
        $('#messages').empty();
    });

    generateQRCode();
});

function generateQRCode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    /*$('.qrcoderef1').text(text);
    $('.qrcoderef2').text(text);
    $('.qrcode').qrcode({width: 100,height: 100, text: text});*/
    $('.qrcoderef1').text("test");
    $('.qrcoderef2').text("test");
    $('.qrcode').qrcode({width: 100,height: 100, text: "test"});
}


