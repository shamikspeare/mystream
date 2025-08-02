import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { upsertStreamUser } from '../lib/stream.js'; 

export async function signup(req, res) {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const existingUser = await User.findOne({ email }); //checks existing email
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists, please use a different one" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`; // random pfp

    const newUser = await User.create({ // register new user
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    });


    // creating jwt token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevents XSS attacks
      sameSite: "strict", // prevents CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true, user: newUser });


     // Create Stream user 
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created for ${newUser.fullName}`);
    } catch (streamErr) {
      console.log("Error creating Stream user:", streamErr);
    }

  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req,res){
    try{
        const{email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "all fields are required"})
        }

        const user = await User.findOne({email});
        if (!user) return res.status(401).json({message:"invalid email or password"})
        
        const isPasswordCorrect = await user.matchPassword(password); 
        if(!isPasswordCorrect) return res.status(401).json({message:"invalid email or password"})
    
        // creating jwt token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
        });
        // creating cookies
        res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevents XSS attacks
        sameSite: "strict", // prevents CSRF attacks
        secure: process.env.NODE_ENV === "production",
        });

        res.status(201).json({ success: true, user });
        }catch(error){
            console.log("Error in login controller", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
}
export async function logout(req,res){
    res.clearCookie("jwt");
    res.status(200).json({success:true, message:"Logout successful"});

}
export async function onboarding(req,res){
  try{
    const userId = req.user._id;

    const { fullName, bio, nativeLanguage, location } = req.body;

    if (!fullName || !bio || !nativeLanguage || !location) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !location && "location",
        ].filter(Boolean), // filters the false ones
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      {new: true}
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    
    //updating in user info in stream
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
    
    } catch (streamError) {
      console.log("Error updating Stream user during onboarding:", streamError.message);
    }
    res.status(200).json({ success: true, user: updatedUser });

    } catch (error) {
      console.error("Onboarding error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}
