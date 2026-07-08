import "dotenv/config";
import Post from "@/models/Post";
import connectDB from "@/config/db";
import { posts } from "./sample-data";

const seed = async () => {
  const admin = await fetch(`${process.env.APP_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: process.env.APP_URL!,
    },
    body: JSON.stringify({
      name: "John Doe",
      username: "johnadmin",
      email: "johndoe@admin.com",
      password: "12345678",
      gender: "male",
    }),
  });

  const user = await fetch(`${process.env.APP_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: process.env.APP_URL!,
    },
    body: JSON.stringify({
      name: "Jane Joe",
      username: "janejoe",
      email: "janejoe@user.com",
      password: "12345678",
      gender: "female",
    }),
  });

  console.log("Admin status", admin.status);
  console.log("Admin result", await admin.json());
  console.log("User result", await user.json());
  console.log("seeded succesfully");
};

const seedPosts = async () => {
  await connectDB();

  Post.deleteMany();
  Post.insertMany(posts);

  console.log("seeded post collection successfuly");
  return;
};

seedPosts();
