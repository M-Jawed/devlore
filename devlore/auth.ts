import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { username } from "better-auth/plugins";
import { nanoid } from "nanoid";

const client = new MongoClient(process.env.MONGODB_URL as string);

export const auth = betterAuth({
  plugins: [username()],
  database: mongodbAdapter(client.db()),
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
      },
      role: {
        type: "string",
        defaultValue: "user",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      gender: {
        type: "string",
        required: false,
      },
      country: {
        type: "string",
        required: false,
      },
      phone: {
        type: "number",
        required: false,
      },
      followers: {
        type: "string[]",
        required: false,
        defaultValue: [],
      },
      following: {
        type: "string[]",
        required: false,
        defaultValue: [],
      },
      likedPosts: {
        type: "string[]",
        required: false,
        defaultValue: [],
      },
      topicsInterestedIn: {
        type: "string[]",
        required: false,
        defaultValue: [],
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const baseUsername = user.name
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9_]/g, "");

          const username = `${baseUsername}_${nanoid(4)}`;

          return {
            data: {
              ...user,
              username,
            },
          };
        },
      },
    },
  },
});
