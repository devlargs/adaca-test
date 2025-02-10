import { bodyParser } from "@/helpers/bodyParser";
import { connectToDatabase } from "@/helpers/connectToDatabase";
import cors from "@/helpers/cors";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO - Move this to an environment variable
const SECRET_KEY = "secretkey";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  bodyParser();
  await cors(req, res);
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required" });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = jwt.sign(
        { username: user.username, country: user.country },
        SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        })
      );

      return res.status(200).json({
        message: "Login successful",
        data: {
          username: user.username,
          country: user.country,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: `${error}` });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
