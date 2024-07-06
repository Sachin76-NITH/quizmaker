const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quizzesCreated: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
});

module.exports = mongoose.model('User', userSchema);
