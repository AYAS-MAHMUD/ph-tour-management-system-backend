import mongoose from "mongoose";
import http from "http";
import dotenv from "dotenv";
import app from "./app";
import { config } from "./app/config";

// dotenv.config();


const server = http.createServer(app);

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log("✅ MongoDB Connected");

    server.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });

  } catch (error) {
    console.log("❌ Database connection failed", error);
  }
}

main();


process.on("unhandledRejection",(err)=>{
    console.log("Unhandled Rejection, shutting down...",err);
    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception detected...");
  console.log(error);
  process.exit(1);
});

// Promise.reject(new Error("Test unhandled rejection"));