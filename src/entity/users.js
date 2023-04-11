const { Schema, model, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, {
  timestamps: true,
});

UserSchema.pre('save', async function hashing() {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = model('User', UserSchema);