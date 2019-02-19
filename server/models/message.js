const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    provider: { type: Schema.Types.ObjectId, required: true},
    messages: {type: [Schema.Types.ObjectId]}
}, { timestamps: true });


module.exports = mongoose.model('Chatroom', ChatroomSchema);
