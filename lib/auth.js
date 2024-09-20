import { cookies } from "next/headers";
import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

import db from "./db";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

function setSessionCookie(sessionId) {
  const sessionCookie = lucia.createSessionCookie(sessionId);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  setSessionCookie(session.id);
}

export async function verifyAuthSession() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie || !sessionCookie.value) {
    return { user: null, session: null };
  }

  const session = await lucia.validateSession(sessionCookie.value);
  try {
    if (session.session) {
      setSessionCookie(session.session.id);
    }
  } catch (error) {}

  return session;
}
