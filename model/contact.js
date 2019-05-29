const mongoose = require('mongoose')


let contactSchema = mongoose.Schema ({ 
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    

});

let contacts = module.exports = mongoose.model("Contacts", contactSchema);