import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  transport: [
    {
      mode: String,
      distanceKm: Number,
    },
  ],
  food: {
    meatServings: Number,
    dairyServings: Number,
    vegetarianServings: Number,
    veganServings: Number,
    localProducePercent: Number,
  },
  energy: {
    energySource: String,
    electricityKwh: Number,
    gasKwh: Number,
    renewablePercent: Number,
  },
  waste: {
    wasteType: String,
    recycledKg: Number,
    compostedKg: Number,
    landfillKg: Number,
  },
  otherEcoActions: [String],
  carbonScore: Number,

  // Add these new numeric fields:
  transportScore: { type: Number, default: 0 },
  foodScore: { type: Number, default: 0 },
  energyScore: { type: Number, default: 0 },
  wasteScore: { type: Number, default: 0 },
});

export const Activity = mongoose.model("Activity", activitySchema);
