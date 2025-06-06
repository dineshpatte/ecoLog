
import { User } from "../models/user.model.js"
import ApiError from "../utils/apiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

import { ApiResponse } from "../utils/apiResponse.js"


const getAccessAndrefreshTokens= async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validationBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      501,
      "something went wrong whule generating refresh and access tokens"
    );
  }
};

const registeruser = asyncHandler(async (req,res) => {

    const{username,email,password} =req.body;

    if(!(username||email||password)){
        throw new ApiError(402,"both email and username are reuiqred")
    }

    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(403,"user is there")
    }

    const avatarlocalpath = req.files?.avatar?.[0].path;

    if(!avatarlocalpath){
        throw new ApiError(405,"no local path for avatar avialble")
    }

    const avatar = await uploadOnCloudinary(avatarlocalpath)

    if(!avatar){
        throw new ApiError(405,"avatar not available")
    }

    const createdUser  = await User.create({
        username,
        email,
        password,
        avatar: avatar.url
    });

    return res.status(200)
    .json(new ApiResponse(200,createdUser,"user created"))

  
    
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  if (!(username || email)) {
    throw new ApiError(409, "either email or username is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  console.log("Entered password:", password);
  console.log("Stored hash:", user.password);

  const isPasswordValid = await user.isPasswordCorrect(password);

  console.log("Password match:", isPasswordValid);

  if (!isPasswordValid) {
    throw new ApiError(401, "invalid user credentials");
  }

  const { refreshToken, accessToken } = await getAccessAndrefreshTokens(
    user._id
  );
  console.log(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: loggedInUser,
        refreshToken,
        accessToken,
      }),
      "user logged in successfully"
    );
});


    
const logoutUser = asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(req.user?._id,{
        $set:{refreshToken:undefined},
     

    },{new: true})

    const options = {
        httpOnly: true,
        secure: true
    }

    
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "logout successfull"));
});

const getUserprofile = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user?._id)

    if(!user){
        throw new ApiError(406,"user not found")
    }

    return res.status(200)
    .json(new ApiResponse(200,user,"user fetched successfully"))
    
})

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  if (!(username || email)) {
    throw new ApiError(404, "both emai and fullane are required");
  }

  const user =await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { username, email: email } },
    { new: true }
  ).select("-password");

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Account details updated successfully"
    )
  );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findOne(req.user?._id);
  const isPasswordvalid =  await user.isPasswordCorrect(oldPassword);

  if (!isPasswordvalid) {
    throw new ApiError(400, "invalid password request");
  }

  user.password = newPassword;
  await user.save({ validationBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password change successfull"));
});

const deleteUser = asyncHandler(async (req,res) => {
  const deleteduser = await User.findByIdAndDelete(
        req.user?._id
    )

    if(!deleteduser){
        throw new ApiError(405,"user not found")
    }

    return res.status(200)
    .json(new ApiResponse(200,"user deleted successfully"))
    
})



export{changeCurrentPassword,registeruser,loginUser,logoutUser,updateAccountDetails,getUserprofile,deleteUser}
