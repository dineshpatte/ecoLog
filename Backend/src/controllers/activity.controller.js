import asyncHandler from "../utils/asyncHandler.js";
import { Activity } from "../models/activity.model.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Helpers to calculate category scores separately

const calculateTransportScore = (transport = []) => {
  let score = 0;
  const factors = {
    car: 0.21,
    bike: 0.05,
    walk: 0,
    public: 0.1,
  };
  for (const t of transport) {
    score += t.distanceKm * (factors[t.mode] || 0.15);
  }
  return score;
};

const calculateFoodScore = (food = {}) => {
  let score = 0;
  score += (food.meatServings || 0) * 5.0;
  score += (food.dairyServings || 0) * 2.0;
  score += (food.vegetarianServings || 0) * 1.5;
  score += (food.veganServings || 0) * 1.0;
  if (food.localProducePercent) {
    score *= 1 - (food.localProducePercent / 100) * 0.2; // reduce max 20%
  }
  return score;
};

const calculateEnergyScore = (energy = {}) => {
  const renewableFactor = 1 - (energy.renewablePercent || 0) / 100;
  const electricityScore = (energy.electricityKwh || 0) * 0.5 * renewableFactor;
  const gasScore = (energy.gasKwh || 0) * 0.25;
  return electricityScore + gasScore;
};

const calculateWasteScore = (waste = {}) => {
  return (
    (waste.landfillKg || 0) * 2.0 +
    (waste.recycledKg || 0) * 0.5 +
    (waste.compostedKg || 0) * 0.2
  );
};

// Main function to calculate total carbon score
const calculateCarbonScore = ({
  transport,
  food,
  energy,
  waste,
  otherEcoActions = [],
}) => {
  const transportScore = calculateTransportScore(transport);
  const foodScore = calculateFoodScore(food);
  const energyScore = calculateEnergyScore(energy);
  const wasteScore = calculateWasteScore(waste);

  let totalScore =
    transportScore + foodScore + energyScore + wasteScore - (otherEcoActions.length || 0) * 1.5;

  return {
    totalScore: Math.max(0, Number(totalScore.toFixed(2))),
    transportScore: Number(transportScore.toFixed(2)),
    foodScore: Number(foodScore.toFixed(2)),
    energyScore: Number(energyScore.toFixed(2)),
    wasteScore: Number(wasteScore.toFixed(2)),
  };
};

const logActivity = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const {
    date,
    transport,
    food,
    energy: { energySource, electricityKwh = 0, gasKwh = 0 } = {},
    waste: { wasteType } = {},
    otherEcoActions = [],
  } = req.body;

  if (!date) throw new ApiError(400, "Date is required");

  // Assuming you have these helper functions already to convert user input:
  const getRenewablePercent = (source) => {
    switch (source) {
      case "mostly renewable":
        return 80;
      case "some renewable":
        return 40;
      case "no renewable":
        return 0;
      default:
        return 20;
    }
  };

  const getWasteBreakdown = (type) => {
    switch (type) {
      case "mostly recycled":
        return { recycledKg: 5, compostedKg: 2, landfillKg: 1 };
      case "some recycled":
        return { recycledKg: 2, compostedKg: 1, landfillKg: 5 };
      case "no recycling":
        return { recycledKg: 0, compostedKg: 0, landfillKg: 8 };
      default:
        return { recycledKg: 1, compostedKg: 0.5, landfillKg: 4 };
    }
  };

  const renewablePercent = getRenewablePercent(energySource);
  const wasteValues = getWasteBreakdown(wasteType);

  // Prepare category data
  const energyData = { electricityKwh, gasKwh, renewablePercent };

  const {
    totalScore,
    transportScore,
    foodScore,
    energyScore,
    wasteScore,
  } = calculateCarbonScore({
    transport,
    food,
    energy: energyData,
    waste: wasteValues,
    otherEcoActions,
  });

  // Save all scores in DB
  const newLog = await Activity.create({
    userId,
    date,
    transport,
    food,
    energy: {
      energySource,
      electricityKwh,
      gasKwh,
      renewablePercent,
    },
    waste: {
      wasteType,
      ...wasteValues,
    },
    otherEcoActions,
    carbonScore: totalScore,
    transportScore,
    foodScore,
    energyScore,
    wasteScore,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newLog, "Activity logged successfully"));
});

const getActivityByUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const userActivity = await Activity.find({ userId });

  if (!userActivity || userActivity.length === 0) {
    throw new ApiError(403, "User activity is not available");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userActivity, "Activities fetched successfully"));
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

  res.status(200).json(new ApiResponse(200, activity, "Activity fetched successfully"));
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

export { logActivity, getActivityByUser, getActivityByDate, deleteActivityLog };
