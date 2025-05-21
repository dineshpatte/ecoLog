import express from "express"
import Router from "express"
import { changeCurrentPassword, deleteUser, getUserprofile, loginUser, logoutUser, registeruser, updateAccountDetails } from "../controllers/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"
const router = Router()

router.route("/register").post( upload.fields([
    { name: "avatar", maxCount: 1 },
  ]),registeruser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/getuser").get(verifyJWT,getUserprofile)
router.route("/updatedetails").post( verifyJWT,updateAccountDetails)
router.route("/changepassword").post(verifyJWT,changeCurrentPassword)
router.route("/deleteuser").delete(verifyJWT,deleteUser)

export default router;