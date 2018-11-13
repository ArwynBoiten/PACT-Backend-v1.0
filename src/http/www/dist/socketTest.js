var socket = io.connect();
var step = 0;

var data = {
    id: "238583",
    member: {
        name: "Arwyn Boiten",
        age: 23,
        publicKey: "0xTEST",
        privateKey: "0x23f20b4b1d01cdc73f945ed40180fcc58620cebea26dd79f67b779c8f0a1245e",
        role: ""
    }
};
var dataUpdate = {
    id: "238583",
    preset: {
        name: "Auto Verhuur",
        index: 0,
        description: "Contract voor het verhuren van auto's",
        roles: [
            {
                name: "Owner",
                fields: [
                    {
                        name: "object",
                        label: "Object",
                        type: "object",
                        fields: [
                            {
                                name: "name",
                                label: "Naam",
                                type: "text",
                                data: "Porsche Panamera"
                            },
                            {
                                name: "kenmerk",
                                label: "Kenmerk",
                                type: "text",
                                data: "Rode kleur"
                            },
                            {
                                name: "price",
                                label: "Prijs",
                                type: "number",
                                data: 123000
                            }
                        ]
                    }
                ]
            },
            {
                name: "Renter",
                fields: [
                    {
                        name: "age",
                        label: "Age",
                        type: "number",
                        data: 23
                    },
                    {
                        name: "licenseType",
                        label: "Rijbewijstype",
                        type: "text",
                        data: "B"
                    },
                ]
            }
        ],
        rule_preset: "carRent",
        member_limit: 2
    },
    members: [
        {
            age: 23,
            name: "Arwyn Boiten",
            privateKey: "0x23f20b4b1d01cdc73f945ed40180fcc58620cebea26dd79f67b779c8f0a1245e",
            publicKey: "0x5BcB19F00e6725d0bC337AF763289EA237905083",
            role: {
                name: "Eigenaar"
            }
        },
        {
            age: 23,
            name: "Klaas Boiten",
            privateKey: "0xbfadac44f2f4bc1c89d5464163e35c803d542c8d1b3acc1fc326a833522ce14f",
            publicKey: "0x7A9beB05101cD693f38eCd73ED15c6f0fDa99155",
            role: {
                name: "Huurder"
            }
        }
    ],
    data: [
        { age: 23 },
        { licenseType: "B" },
        {
            object: [
                { name: "Porsche Panamera" },
                { kenmerk: "Rode Kleur" },
                { price: 123000 }
            ]}
    ]
};


/** THIS FUNCTION RUNS AUTOMATIC WHEN PAGE IS LOADED **/
$(function() {

});

/** THIS FUNCTION RUNS AUTOMATIC WHEN THERE IS A SOCKET CONNECTION. **/
socket.on('connect', function() {
    socket.emit('createSession', data);
});

socket.on('session', function (_data){
    var session = _data;
    step++;

    if(step == 1){
        socket.emit('updateSession', dataUpdate);
    }

    if(step == 2){
        socket.emit('generateContract', session.id);
    }

    if(step == 3){
        socket.emit('signContract', session.id);
    }

    if(step == 4){
        socket.emit('signContract', session.id);
    }
});

socket.on('contract', function (_data) {
    console.log("Signed:");
    console.log(_data);
});

socket.on('status', function (_message) {
    console.log(_message);
});

socket.on('contract-address', function (_address) {
    var data = {
        id: dataUpdate.id,
        address: _address,
        pk: dataUpdate.members[0].privateKey
    };

    socket.emit('getContract', data);
});

socket.on('contract-data', function (data) {
    console.log(data);
});

socket.on('errorMessage', function (error) { 
    console.error(error); 
});
