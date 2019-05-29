const mongoose = require('mongoose')


let UserSchema = mongoose.Schema ({
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
    }

});

let user = module.exports = mongoose.model("User", UserSchema);