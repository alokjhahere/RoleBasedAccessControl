const { PrismaClient } = require("@prisma/client");

//Not necessary
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

prisma
  .$connect()
  .then(() => console.log("Prisma connected successfully"))
  .catch((err) => {
    console.error("Prisma connection failed:", err);
    process.exit(1);
  });
//Not necessary

module.export = prisma;
