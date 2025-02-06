import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const Signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(409).json({ message: "Missing credentials" });
  }
  // console.log(username, password, email);
  const ExisitedUser = await User.findOne({ email });
  if (ExisitedUser) {
    return res.status(409).json({ message: "User ALreday exists " });
  }
  const hashPass = await bcrypt.hash(password, 10);
  // console.log(hashPass);
  const newUser = new User({
    username: username,
    email: email,
    password: hashPass,
  });
  await newUser.save();
  console.log(newUser);
  const user = {
    username: newUser.username,
    email: newUser.email,
    id: newUser._id,
  };
  return res.status(200).json({
    message: "User Registered Successfully!!",
    user,
  });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      return res.status(409).json({ message: "Missing Credentials" });
    }
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(409).json({ message: "User not exist Signup again!!" });
    }
    const CorrectUser = await bcrypt.compare(password, user.password);
    // console.log(password);
    // console.log(user.password);
    // console.log(CorrectUser);
    if (!CorrectUser) {
      return res.status(409).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
      expiresIn: "1m",
    });
    const Loggeduser={
      username: user.username,
    email: user.email,
    id: user._id,
    token:token
    }
    console.log(token);
    return res.status(201).json({
      message: "LoggedIn Successfully",Loggeduser});
  } catch (err) {
    return res.status(404).json({ message: "Data not found", err });
  }
};
export const VerifyOtp=async(req,res)=>{
  const{email}=req.body;
  if(!email){
    return res.status(409).json({message:"Enter Email Id"});
  }
  const user=await User.findOne({email});
  if(!user){
    return res.status(409).json({message:"Entered email not exist try again"});
  }
  return res.status(200).json({message:"OTP sent successfully!"});
}