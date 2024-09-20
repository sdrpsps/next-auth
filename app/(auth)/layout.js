import { logout } from "@/actions/auth";
import { verifyAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import "../globals.css";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default async function AuthLayout({ children }) {
  const { user, session } = await verifyAuthSession();

  if (!user || !session) {
    return redirect("/");
  }
  return (
    <>
      <header id="auth-header">
        <p>Welcome back!</p>
        <form action={logout}>
          <button>Logout</button>
        </form>
      </header>
      {children}
    </>
  );
}
