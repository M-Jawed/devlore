import {betterAuth} from 'better-auth/minimal'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URL!)

export const auth = betterAuth({
    database: mongodbAdapter(client.db()),
    user: {
        additionalFields: {
            username: {
                type: "string",
                required: true,
            },
            role: {
                type: 'string',
                defaultValue: 'user'
            },
            bio: {
                type: 'string'
            },
            gender: {
                type: 'string'
            }
        }
    },
    emailAndPassword:{
        enabled: true
    }
})