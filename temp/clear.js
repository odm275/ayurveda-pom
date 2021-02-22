// import { connectDatabase } from "./database.js";
const { connectDatabase } = require("./database");

const clear = async () => {
  try {
    console.log("[clear]: running...");
    const db = await connectDatabase();
    const users = await db.users.find({}).toArray();
    const tasks = await db.tasks.find({}).toArray();
    if (users.length > 0) {
      await db.users.drop();
    }

    if (tasks.length > 0) {
      await db.tasks.drop();
    }

    console.log(`[clear] : success`);
  } catch {
    throw new Error("failed to clear database");
  }
};

clear();
