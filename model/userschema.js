const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let UserSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    _contactId: [{ type: Schema.Types.ObjectId, ref: "Contacts" }]

});

let user = module.exports = mongoose.model("User", UserSchema);