// app/api/login/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { email, password } = await request.json();

  // Validate user credentials (mocked here)
  if (email === "test@example.com" && password === "password") {
    const token = jwt.sign({ email }, "secret_key", { expiresIn: "1h" });
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}