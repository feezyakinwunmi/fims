// app/api/verify/route.js
import jwt from "jsonwebtoken";

export async function GET(request) {
  const token = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    return NextResponse.json({ user: decoded });
  } catch (error) {
    return new Response("Invalid token", { status: 401 });
  }
}