import dotenv from "dotenv";

dotenv.config();

const CLIENT_TOKEN = process.env.CLIENT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const ROLE_NAME = process.env.ROLE_NAME;

if (!CLIENT_TOKEN) {
  throw new Error("Missing CLIENT_TOKEN");
}

if (!CHANNEL_ID) {
  throw new Error("Missing CHANNEL_ID");
}

if (!ROLE_NAME) {
  throw new Error("Missing ROLE_NAME");
}

export { CLIENT_TOKEN, CHANNEL_ID, ROLE_NAME };
