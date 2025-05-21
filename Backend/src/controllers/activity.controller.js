
import asyncHandler from "../utils/asyncHandler.js";
import { Activity } from "../models/activity.model.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Convert user-friendly energy input into renewable percentage
const getRenewablePercent = (source) => {
  switch (source) {
    case 'mostly renewable': return 80;
    case 'some renewable': return 40;
    case 'no renewable': return 0;
    default: return 20;
  }
};

// Convert user-friendly waste input into real kg breakdown
const getWasteBreakdown = (type) => {
  switch (type) {
    case 'mostly recycled': return { recycledKg: 5, compostedKg: 2, landfillKg: 1 };
    case 'some recycled': return { recycledKg: 2, compostedKg: 1, landfillKg: 5 };
    case 'no recycling': return { recycledKg: 0, compostedKg: 0, landfillKg: 8 };
    default: return { recycledKg: 1, compostedKg: 0.5, landfillKg: 4 };
  }
};

// Estimate carbon score (simplified)
const calculateCarbonScore = ({
  transport = [],
  food = {},
  energy = {},
  waste = {},
  otherEcoActions = [],
}) => {
  let score = 0;

  // Transport emissions
  for (const t of transport) {
    const { mode, distanceKm } = t;
    const factors = {
      car: 0.21,
      bike: 0.05,
      walk: 0,
      public: 0.1
    };
    score += distanceKm * (factors[mode] || 0.15);
  }

  // Food emissions (per serving)
  score += (food.meatServings || 0) * 5.0;
  score += (food.dairyServings || 0) * 2.0;
  score += (food.vegetarianServings || 0) * 1.5;
  score += (food.veganServings || 0) * 1.0;
  if (food.localProducePercent) {
    score *= (1 - food.localProducePercent / 100 * 0.2); // reduce by 20% max
  }

  // Energy emissions
  const renewableFactor = 1 - (energy.renewablePercent || 0) / 100;
  score += (energy.electricityKwh || 0) * 0.5 * renewableFactor;
  score += (energy.gasKwh || 0) * 0.25;

  // Waste emissions
  score += (waste.landfillKg || 0) * 2.0;
  score += (waste.recycledKg || 0) * 0.5;
  score += (waste.compostedKg || 0) * 0.2;

  // Green actions bonus
  score -= (otherEcoActions.length || 0) * 1.5;

  return Math.max(0, Number(score.toFixed(2))); // prevent negative
};

const logActivity = asyncHandler(async (req,res) => {
   const userId = req.user?._id;
  const {
    date,
    transport,
    food,
    energy: { energySource, electricityKwh = 0, gasKwh = 0 } = {},
    waste: { wasteType } = {},
    otherEcoActions = []
  } = req.body;
  if (!date) throw new ApiError(400, "Date is required");

  const renewablePercent = getRenewablePercent(energySource);
  const wasteValues = getWasteBreakdown(wasteType);

  const carbonScore = calculateCarbonScore({
    transport,
    food,
    energy: { electricityKwh, gasKwh, renewablePercent },
    waste: wasteValues,
    otherEcoActions
  });

  const newLog = await Activity.create({
    userId,
    date,
    transport,
    food,
    energy: {
      energySource,
      electricityKwh,
      gasKwh,
      renewablePercent
    },
    waste: {
      wasteType,
      ...wasteValues
    },
    otherEcoActions,
    carbonScore
  });

  return res.status(201).json(new ApiResponse(201, newLog, "Activity logged successfully"));
});

const getActivityByUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const userActivity = await Activity.find({ userId });

  if (!userActivity || userActivity.length === 0) {
    throw new ApiError(403, "User activity is not available");
  }

  return res.status(200).json(
    new ApiResponse(200, userActivity, "Activities fetched successfully")
  );
});

const getActivityByDate = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const date = req.query.date;

  if (!date) {
    return res.status(400).json({ message: "Date is required in query" });
  }

  const activity = await Activity.findOne({ userId, date: new Date(date) });

  if (!activity) {
    return res.status(404).json({ message: "No activity found for this date" });
  }

  res.status(200).json(new ApiResponse(200,activity,"activity fetched successfully"));
});

const deleteActivityLog = asyncHandler(async (req, res) => {
  const activityId = req.params.id;
  const userId = req.user?._id;

  const activity = await Activity.findOne({ _id: activityId, userId });

  if (!activity) {
    throw new ApiError(404, "Activity log not found or you don't have permission to delete it");
  }

  await Activity.deleteOne({ _id: activityId });

  return res.status(200).json(new ApiResponse(200, null, "Activity log deleted successfully"));
});


export{logActivity,getActivityByUser,getActivityByDate,deleteActivityLog}

    

