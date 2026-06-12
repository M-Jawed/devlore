import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { username } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URL!);

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
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
