import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
