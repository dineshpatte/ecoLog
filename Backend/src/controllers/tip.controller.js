import asyncHandler from "../utils/asyncHandler.js";
import Tip from "../models/tip.model.js";
import { Activity } from "../models/activity.model.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const TIP_LIBRARY = {
  transport: [
    "Try biking or walking for short distances.",
    "Use public transport to reduce emissions.",
    "Carpool with others when possible.",
  ],
  food: [
    "Eat more vegetarian meals.",
    "Buy locally sourced produce.",
    "Reduce dairy and meat consumption.",
  ],
  energy: [
    "Turn off lights when not in use.",
    "Use energy-efficient appliances.",
    "Switch to LED bulbs to save energy.",
  ],
  waste: [
    "Compost your kitchen waste.",
    "Separate recyclables properly.",
    "Avoid single-use plastic products.",
  ],
  general: [
    "Carry a reusable water bottle.",
    "Plant a tree this month.",
    "Participate in a local clean-up drive.",
  ],
};

const getTipsForActivity = (Activity) => {
  const tips = [];

  if (Activity.transport?.length > 0) {
    tips.push(randomTip("transport"));
  }

  if (Activity.food?.meatServings > 0 || Activity.food?.dairyServings > 0) {
    tips.push(randomTip("food"));
  }

  if ((Activity.energy?.electricityKwh || 0) > 3) {
    tips.push(randomTip("energy"));
  }

  if ((Activity.waste?.landfillKg || 0) > 1) {
    tips.push(randomTip("waste"));
  }

  tips.push(randomTip("general"));

  return tips;
};

const randomTip = (category) => {
  const tips = TIP_LIBRARY[category];
  return tips[Math.floor(Math.random() * tips.length)];
};

export const generateDailyTips = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const activityLog = await Activity.findOne({
    userId,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  if (!activityLog) {
    throw new ApiError(404, "No activity log found for today.");
  }

  const dailyTips = getTipsForActivity(activityLog);

  const tipDoc = await Tip.findOneAndUpdate(
    { userId, date: startOfDay },
    { $set: { tips: dailyTips } },
    { new: true, upsert: true }
  );

  return res.status(200).json(
    new ApiResponse(200, tipDoc, "Daily tips generated successfully")
  );
});

export const getTipsByDate = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const dateQuery = req.query.date ? new Date(req.query.date) : new Date();

  const startOfDay = new Date(dateQuery);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(dateQuery);
  endOfDay.setHours(23, 59, 59, 999);

  const tipDoc = await Tip.findOne({
    userId,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  if (!tipDoc) {
    throw new ApiError(404, "No tips found for this date.");
  }

  return res.status(200).json(
    new ApiResponse(200, tipDoc, "Tips fetched successfully")
  );
});

