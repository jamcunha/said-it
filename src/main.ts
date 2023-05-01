import {
  Client,
  Role,
  AutoModerationActionExecution,
  IntentsBitField,
  AutoModerationActionType,
} from "discord.js";
import { CLIENT_TOKEN, CHANNEL_ID, ROLE_NAME } from "./config";

console.log("Bot is starting...");

const client = new Client({
  intents: [
    IntentsBitField.Flags.AutoModerationExecution,
    IntentsBitField.Flags.Guilds,
  ],
});

// check if client is ready
client.on("ready", () => {
  if (!client.user || !client.application) {
    throw new Error("Client is not ready");
  }

  console.log(`${client.user.tag} is online`);
});

client.on(
  "autoModerationActionExecution",
  (action: AutoModerationActionExecution) => {
    if (action.action.type !== AutoModerationActionType.BlockMessage) {
      return;
    }

    if (action.action.metadata.channelId !== CHANNEL_ID) {
      return;
    }

    if (!action.userId) {
      return;
    }

    const role = action.guild?.roles.cache.find(
      (role: Role) => role.name === ROLE_NAME
    );

    if (!role) {
      throw new Error("Role not found");
    }

    action.guild?.members.fetch(action.userId).then((member) => {
      member.roles.add(role);
    });
  }
);

client.login(CLIENT_TOKEN);
