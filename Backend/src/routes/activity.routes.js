import express from "express"
import Router from "express"
import { changeCurrentPassword, deleteUser, getUserprofile, loginUser, logoutUser, registeruser, updateAccountDetails } from "../controllers/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"
import { getActivityByUser, logActivity ,getActivityByDate,deleteActivityLog} from "../controllers/activity.controller.js"
const router = Router()

router.route("/logactivity").post(verifyJWT,logActivity)
router.route("/getactivity").get(verifyJWT,getActivityByUser)
router.get("/by-date", verifyJWT, getActivityByDate);
router.delete("/delete/:id", verifyJWT, deleteActivityLog);


export default router