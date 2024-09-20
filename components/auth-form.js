"use client";

import Link from "next/link";
import { useFormStatus, useFormState } from "react-dom";
import { signup } from "@/actions/auth";

export default function AuthForm() {
  const { pending } = useFormStatus();
  const [formState, formAction] = useFormState(signup, {});

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
          {pending ? "Loading..." : "Create Account"}
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
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
