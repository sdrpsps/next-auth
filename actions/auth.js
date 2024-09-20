"use server";

import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(_prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (!password || password.trim().length < 8) {
    errors.password = "Please enter a password with at least 8 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    createUser(email, hashUserPassword(password));
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      errors.email = "User with this email address already exists";
      return { errors };
    }

    throw error;
  }

  redirect("/training");
}
