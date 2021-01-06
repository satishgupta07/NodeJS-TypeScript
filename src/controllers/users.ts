import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { hashPassword } from "../utils/password";
import { sanitizeFields } from "../utils/security";
import { sign } from "../utils/jwt";

interface UserSignupData {
  username: string;
  password: string;
  email: string;
}

export async function createUser(data: UserSignupData) {

  // Check for data validity  
  if (!data.username) throw new Error("username is blank");
  if (!data.email) throw new Error("email is blank");
  if (!data.password) throw new Error("password is blank");

  const repo = await getRepository(User);

  // Check if user exists
  const existing = await repo.findOne(data.email);

  if (existing) throw new Error("User with this email exists");

  // Create user and send back
  try {
    const user = await repo.save(
      new User(data.email, data.username, await hashPassword(data.password))
    );
    console.log(sanitizeFields(user));
    user.token = await sign(user)
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
