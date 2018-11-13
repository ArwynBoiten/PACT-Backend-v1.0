var template = {
    name: "Voorbeeld",
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
            name: "Schoonmaker",
            fields: [
                {
                    name: "name",
                    label: "Naam",
                    type: "number",
                    data: ""
                },
                {
                    name: "beroep",
                    label: "Beroep",
                    type: "text",
                    data: ""
                },
            ]
        }
    ],
    rule_preset: "common",
    member_limit: 2
};

exports.template = template;