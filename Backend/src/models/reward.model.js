import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dateEarned: {
    type: Date,
    default: Date.now,
  },
  points: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'redeemed'],
    default: 'active',
  },
});

const Reward = mongoose.model('Reward', rewardSchema);
export default Reward;
