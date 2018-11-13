$(function() {
    $('#clearButton').on('click', function () {
        $('#messages').empty();
    });

    generateQRCode();
});

function createRoleFields(presetTemplate){

    var roles = presetTemplate.template.roles;

    for(index in roles){
        $('#role1')
            .append($('<option>', { value : index })
                .text(roles[index].name));

        $('#role2')
            .append($('<option>', { value : index })
                .text(roles[index].name));
    }
}

var socket = io.connect();

socket.on('errorMessage', function(data) {
    console.log('Server:', data);
    alert(data);
    $('#messages').append($('<li>').text(data));
});

socket.on('session', function (data) {
    // Show container and clear members. //
    $('#joinContainer').show();
    $('#sessionContainer').show();
    $('#presetContainer').show();
    $('#sessionMembers > tbody').empty();

    // Fill ID & Contract section. //
    $('.sessionId').text(data.id);
    if(data.contractType) {
        $('.sessionCT').text(data.contractType.template.name);
        $('#role1').show();
        $('#role2').show();

        createRoleFields(data.contractType);


    } else {
        $('.sessionCT').text("Contract");
    }

    // Fill Memberlist. //
    $.each(data.members, function (key, value) {
        $('#sessionMembers > tbody:last-child').append('<tr><td>'+ value.name + '</td><td>'+ value.age +'</td></tr>');
    });
});

socket.on('presets', function (data) {
    for(index in data){
            $('#contractType')
                .append($('<option>', { value : index })
                    .text(index));
        }

});

socket.on('connect', function() {

    $('#createButton').on('click', function () {

        var data = {
            id: $('.sessionID1').val(),
            ct: $('#contractType').val(),
            member: {
                name: $('#createFirstname').val() + " " + $('#createLastname').val(),
                age: $('#createAge').val(),
                public: $('#createPublicKey').val(),
                private: $('#createPrivateKey').val()
            }
        }

        socket.emit('createSession', data);
        return false;
    });

    $('#joinButton').on('click', function () {
        var data = {
            id: $('.sessionID2').val(),
            member: {
                name: $('#joinFirstname').val() + " " + $('#joinLastname').val(),
                age: $('#joinAge').val(),
                public: $('#joinPublicKey').val(),
                private: $('#joinPrivateKey').val(),
                role: {name: 'Owner'}
            }
        }

        socket.emit('joinSession', data);
        return false;
    });

    $('#loadPresets').on('click', function () {
        var data = {
            id: $('.sessionID1').val()
        };

        socket.emit('getPresetList', data);
    });

    $('#submitPreset').on('click', function () {
        var data = {
            id: $('.sessionID1').val(),
            ct: $('#contractType').val()
        };

        socket.emit('updateSession', data);
    });

    $('#generateContract').on('click', function () {
        var data = {
            id: $('.sessionId').text()
        };

        socket.emit('generateContract', data);
    });

});

function generateQRCode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    $('.sessionID1').val(text);
    $('.sessionID2').val(text);
    $('.qrcode').qrcode({width: 100,height: 100, text: text});

    return text;
}


