import mongoose from 'mongoose';

const summaryCacheSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  summary: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SummaryCache', summaryCacheSchema);