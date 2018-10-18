var template = {
    name: "Auto Verhuur",
    description: "Contract voor het verhuren van auto's",
    roles: [
        {
            name: "owner"
        },
        {
            name: "renter"
        }
    ],
    fields: [
        {
            name: "license",
            label: "Driver License",
            type: "text",
            description: "Controleer of huurder juiste rijbewijs heeft."
        }
    ],
    member_limit: 2
};

exports.template = template;