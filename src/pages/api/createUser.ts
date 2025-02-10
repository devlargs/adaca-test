import { DEFAULT_SALT } from "@/constants/salt";
import { bodyParser } from "@/helpers/bodyParser";
import { connectToDatabase } from "@/helpers/connectToDatabase";
import cors from "@/helpers/cors";
import User from "@/models/User";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  bodyParser();
  await cors(req, res);
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { username, password, country } = req.body;
      if (!username)
        return res.status(400).json({ error: "Username is required" });
      if (!password)
        return res.status(400).json({ error: "Password is required" });
      if (!country)
        return res.status(400).json({ error: "Country is required" });

      const hashedPassword = await bcrypt.hash(password, DEFAULT_SALT);

      const newUser = new User({
        username,
        password: hashedPassword,
        country,
      });
      await newUser.save();
      return res.status(201).json({
        error: null,
        message: "User Successfully Created",
        data: {
          username,
          country,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
