import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import Reward from '../models/reward.model.js';
import { Activity } from '../models/activity.model.js';

const checkAndGiveReward = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, 'User not authenticated');
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  const yesterdayEnd = new Date(todayEnd);
  yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);

  console.log("Today range:", todayStart, "to", todayEnd);
  console.log("Yesterday range:", yesterdayStart, "to", yesterdayEnd);

  const todayActivity = await Activity.findOne({
    userId,
    date: { $gte: todayStart, $lte: todayEnd },
  });

  const yesterdayActivity = await Activity.findOne({
    userId,
    date: { $gte: yesterdayStart, $lte: yesterdayEnd },
  });

  console.log("Today activity:", todayActivity);
  console.log("Yesterday activity:", yesterdayActivity);

  if (!todayActivity || !yesterdayActivity) {
    throw new ApiError(404, 'Not enough activity data to check reward');
  }

  if (todayActivity.carbonScore < yesterdayActivity.carbonScore) {
    const reward = await Reward.create({
      userId,
      title: 'Carbon Improvement',
      description: `Nice job! Your carbon score improved from ${yesterdayActivity.carbonScore.toFixed(2)} to ${todayActivity.carbonScore.toFixed(2)}.`,
      points: 10,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, reward, 'Daily improvement reward granted'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'No reward: No improvement today'));
});

export { checkAndGiveReward };
