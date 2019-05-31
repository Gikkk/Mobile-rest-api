const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let contactSchema = new Schema ({
    _creator : { type: Schema.Types.ObjectId, ref: 'Person' },

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