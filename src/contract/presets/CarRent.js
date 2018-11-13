var template = {
    name: "Auto Verhuur",
    index: 0,
    description: "Contract voor het verhuren van auto's",
    roles: [
        {
            name: "Eigenaar",
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
                            label: "Kenmerk (Object met..)",
                            type: "text",
                            data: "een rode kleur"
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
            name: "Huurder",
            fields: [
                {
                    name: "age",
                    label: "Leeftijd",
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
};

exports.template = template;