import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
export const PUT = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json({ message: "un authorized" }, { status: 401 });
  }
  const { user } = req.auth;
  const { name, email, password } = req.json();
  await dbConnect();
  try {
    const dbUser = await UserModel.findById(user._id);
    if (!dbUser) {
      return Response.json({ mesage: "User not found" }, { status: 404 });
    }
    dbUser.name = name;
    dbUser.email = email;
    dbUser.password = password
      ? await bcrypt.hash(password, 12)
      : dbUser.password;
    return Response.json({ message: "User hasbeen updated" });
  } catch (err: any) {
    return Response.json({ message: err.mesage }, { status: 500 });
  }
});
