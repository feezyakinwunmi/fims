import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, password, firstName, lastName, farmName, phone } = body;

    // Validate input fields
    if (!email || !password || !firstName || !lastName || !farmName || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName, // Combine first and last names
        farmName,
        phone,
      },
      select: { // Exclude sensitive fields
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        farmName: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Return success response
    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    // Log the raw error
    console.error("Error during signup:", error);

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ error: "Email already registered." }, { status: 409 });
      }
    }

    // Handle other errors
    if (!error) {
      console.error("No error object was returned.");
      return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }

    return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
  } finally {
    // Ensure the Prisma client is properly closed (optional in Next.js)
    await prisma.$disconnect();
  }
}