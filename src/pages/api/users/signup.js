import User from "@/models/userModel";
import initMiddleware from "@/utils/init-Middleware";
import Cors from "cors";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { hash } from "bcryptjs";
import crypto from "crypto";
import connectDb from "@/lib/connectDB";

const cors = initMiddleware(
  Cors({
    // Set allowed origins based on your requirements
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
};

async function handler(req, res) {
  // Only POST method is accepted

  // ...

  if (req.method === "POST") {
    const { username, email, password} = req.body;

    if (!email || !email.includes("@") || !password || !username) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Please characters must be at least 6 characters");
    }

    await cors(req, res);
    try {
      await connectDb();

      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        res.status(422).json({ message: "User already exists" });
        return;
      }

      const resetToken = crypto.randomBytes(20).toString("hex"); // Generate a reset token
      const resetTokenExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour

      
      const hashedPassword = await hash(password, 12);


      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        resetToken, // Store the reset token in the user document
        resetTokenExpires, 
      });

      const token = generateToken(user._id);


      if (user) {
        const {_id, username, email, role} = user;
        const parsedCookie = cookie.serialize("cookie", token, {
          maxAge: new Date(Date.now() + 1000 * 86400),
          path: "/", // Path where the cookie is available
          httpOnly: true, // Make the cookie accessible only via HTTP (not JavaScript)
          // secure: process.env.NODE_ENV === 'production', // Set to true in production for secure cookies
          // sameSite: 'strict', // Set the SameSite attribute for cross-site requests
        });
        res.status(201).json({ message: "User created", _id, username, email, role, token });
        // Send the cookie in the response header
        res.setHeader("Set-Cookie", parsedCookie);
      } else {
        res.status(400);
        throw new Error("Invalid user");
      }

      await user.save();
     
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the user" });
    }
  } else {
    res.status(200).json({ message: "Route not valid" });
  }
}

export default handler;