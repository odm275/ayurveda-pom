const { ObjectId } = require("mongodb");
const { connectDatabase } = require("./database");

const tasks = [
  {
    _id: new ObjectId("5d378db94e84753160e08b30"),
    title: "TinyHouse Course",
    pomEstimate: 8,
    pomCount: 5,
    createdAt: new Date(),
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b31"),
    title: "unblock motivation",
    pomEstimate: 4,
    pomCount: 2,
    createdAt: new Date(),
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b32"),
    title: "freelancing course",
    pomEstimate: 2,
    pomCount: 1,
    createdAt: new Date(),
  },
  {
    _id: new ObjectId("5d378db94e84753160e08b33"),
    title: "my website",
    pomEstimate: 3,
    pomCount: 1,
    createdAt: new Date(),
  },
];

const users = [
  {
    _id: "5d378db94e84753160e08b55",
    token: "token_************",
    email: "test@gmail.com",
    name: "Test J.",
    avatar:
      "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg",
    walletId: "acct_************",
    tasks: [
      new ObjectId("5d378db94e84753160e08b30"),
      new ObjectId("5d378db94e84753160e08b31"),
      new ObjectId("5d378db94e84753160e08b32"),
      new ObjectId("5d378db94e84753160e08b33"),
    ],
  },
];

const seed = async () => {
  try {
    console.log("[seed]: running ...");
    const db = await connectDatabase();

    for (const user of users) {
      await db.users.insertOne(user);
    }

    for (const task of tasks) {
      await db.tasks.insertOne(task);
    }
    console.log(`[seed] : success`);
  } catch (error) {
    console.log(error);
    throw new Error("failed to seed database");
  }
};

seed();
