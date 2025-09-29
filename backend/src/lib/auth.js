import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../config/database.js"; 
import * as schema from "../models/auth-schema.js";
import { _config } from "../config/config.js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", 
        schema: schema,
    }),

    emailAndPassword: { 
        enabled: true, 
    }, 
    socialProviders: { 
        github: { 
            clientId: _config.GITHUB_CLIENT_ID, 
            clientSecret: _config.GITHUB_CLIENT_SECRET, 
        }, 
        google: { 
            clientId: _config.GOOGLE_CLIENT_ID, 
            clientSecret: _config.GOOGLE_CLIENT_SECRET, 
        }, 
        linkedin: { 
            clientId: _config.LINKEDIN_CLIENT_ID, 
            clientSecret: _config.LINKEDIN_CLIENT_SECRET, 
        }  ,
        twitter: {
            clientId: _config.TWITTER_CLIENT_ID,
            clientSecret: _config.TWITTER_CLIENT_SECRET,
        } 
    },
    session: {
        updateAge: 24 * 60 * 60, // 24 hours
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5, // 5 minutes
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "user"
            }
        }
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    trustedOrigins: ["http://localhost:5173"],
});