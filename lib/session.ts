// import "server-only";
// import { SignJWT, jwtVerify } from "jose";
// import { SessionPayload } from "@/app/(auth)/auth/types";
// import { cookies } from "next/headers";

// const secretKey = process.env.SESSION_SECRET || "";
// const encodedKey = new TextEncoder().encode(secretKey);

// export async function encrypt(payload: SessionPayload) {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(encodedKey);
// }

// export async function decrypt(session: string | undefined = "") {
//   try {
//     const { payload } = await jwtVerify(session, encodedKey, {
//       algorithms: ["HS256"],
//     });
//     return payload;
//   } catch (error) {
//     console.log("Failed to verify session");
//     return null;
//   }
// }

// export async function createSession(payload: SessionPayload) {
//   const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000);

//   const session = await encrypt(payload);

//   cookies().set("session", session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: "lax",
//     path: "/",
//   });
// }

'use server';
import { SessionPayload } from '@/app/(auth)/auth/types';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import 'server-only';

const secretKey = process.env.SESSION_SECRET || '';
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('4h')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error: any) {
    await deleteSession();
    return null;
  }
}

export async function createSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000);
  const session = await encrypt(payload);

  const cookieStore = await cookies();
  cookieStore.set({
    name: '3w3k0',
    value: session,
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  return cookieStore.has('3w3k0');
}

export async function updateSession() {
  const session = (await cookies()).get('3w3k0')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 4 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set('3w3k0', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('3w3k0');
  return null;
}

export async function getCurrentSession(): Promise<SessionPayload | null> {
  try {
    const session = (await cookies()).get('3w3k0')?.value;

    if (!session) {
      return null; // No session cookie found
    }

    const payload = await decrypt(session);

    if (!payload) {
      return null; // Failed to decrypt session
    }

    return payload as SessionPayload;
  } catch (error) {
    console.error('Error retrieving current session:', error);
    return null;
  }
}
