import mongoose from 'mongoose';

const tipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => new Date().setHours(0, 0, 0, 0), 
  },
  tips: [
    {
      type: String,
      required: true,
    },
  ],
});

const Tip = mongoose.model('Tip', tipSchema);
export default Tip;
