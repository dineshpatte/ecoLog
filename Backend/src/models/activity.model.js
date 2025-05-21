import mongoose,{Schema} from "mongoose"

const activityShema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
     date: {
    type: Date,
    required: true
  },

  transport: [{
    mode: { type: String },           // e.g., 'car', 'bike', 'walk', 'public'
    distanceKm: { type: Number }      // Distance in kilometers
  }],

  food: {
    meatServings: { type: Number },
    dairyServings: { type: Number },
    vegetarianServings: { type: Number },
    veganServings: { type: Number },
    localProducePercent: { type: Number }, // % of food that's local
  },

energy: {
  energySource: {
    type: String,
    enum: ['mostly renewable', 'some renewable', 'no renewable', 'unknown'],
    default: 'unknown'
  },
  electricityKwh: { type: Number, default: 0 },
  gasKwh: { type: Number, default: 0 },
  renewablePercent: { type: Number, default: 0 } 
},

waste: {
  wasteType: {
    type: String,
    enum: ['mostly recycled', 'some recycled', 'no recycling', 'unknown'],
    default: 'unknown'
  },
  recycledKg: { type: Number, default: 0 },
  compostedKg: { type: Number, default: 0 },
  landfillKg: { type: Number, default: 0 }
},

  otherEcoActions: [String], // e.g., ['planted tree', 'used reusable bag']

  carbonScore: {
    type: Number,
    default: 0
  },

  

},{timestamps: true})

export const Activity = mongoose.model("Activity",activityShema)