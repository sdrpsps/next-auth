"use client";

import { auth } from "@/actions/auth";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export default function AuthForm({ mode }) {
  const { pending } = useFormStatus();
  const [formState, formAction] = useFormState(auth.bind(null, mode), {});

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      <p>
        <button type="submit" disabled={pending}>
          {pending
            ? "Loading..."
            : mode === "login"
            ? "Login"
            : "Create Account"}
        </button>
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.values(formState.errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <p>
        <Link href={`/?mode=${mode === "login" ? "signup" : "login"}`}>
          {mode === "login"
            ? "Create an account."
            : "Login with existing account."}
        </Link>
      </p>
    </form>
  );
}
