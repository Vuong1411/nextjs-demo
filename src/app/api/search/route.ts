import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Import Prisma Client

export async function POST(req: Request) {
  try {
    console.log("API called");
    const { email } = await req.json(); // Lấy email từ body của request
    console.log("Email received:", email);
    // Kiểm tra email
    if (!email) {
      return NextResponse.json({ message: "Vui lòng nhập emailemail." }, { status: 400 });
    }

    // Tìm kiếm user theo email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("User found:", user);

    if (user) {
      return NextResponse.json(user, { status: 200 }); // Trả về thông tin user
    } else {
      return NextResponse.json({ message: "Không thấy user." }, { status: 404 });
    }
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ message: "Lỗi server!", error: String(error) }, { status: 500 });
  }
}