import { NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/db";
import Blog from "../../models/BlogSchema";
// import { blogValidation } from "../../models/BlogSchema";

export async function GET(request) {
  await connectMongoDB();
  const blogs = await Blog.find();
  return NextResponse.json({ blogs });
}

export async function POST(request) {
  const { title, description, owner } = await request.json();
  if (!title || !description || !owner) {
    return NextResponse.json(
      {
        message: "fill out all the fields!!!",
      },
      { status: 400 }
    );
  }

  await connectMongoDB();
  await Blog.create({ title, description, owner });
  return NextResponse.json({ message: "Blog is created." });
}

export async function PATCH(request) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "Id couldn't be found" },
      { status: 400 }
    );
  }
  const { title, description, owner } = await request.json();
  await connectMongoDB();

  try {
    await Blog.findByIdAndUpdate(id, { title, description, owner });
    return NextResponse.json(
      { message: "The blog is successfully updated." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "the blog couldn't be found." },
      { status: 404 }
    );
  }
}

export async function DELETE(request) {
  await connectMongoDB();
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      {
        message: "id parameter missing.",
      },
      { status: 400 }
    );
  }

  try {
    await Blog.findByIdAndDelete(id);
    return NextResponse.json(
      {
        message: "The blog is deleted.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "the blog couldn't be found." },
      { status: 400 }
    );
  }
}
