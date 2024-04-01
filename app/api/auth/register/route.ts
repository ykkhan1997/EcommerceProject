import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/lib/models/UserModel";
export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();
  await dbConnect();
  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = new UserModel({
    name,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    return Response.json(
      { message: "User has been created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
