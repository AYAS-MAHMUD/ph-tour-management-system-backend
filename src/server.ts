// import mongoose from "mongoose";
import app from "./app";

// import dotenv from "dotenv";

// dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    // await mongoose.connect(process.env.DB_URL as string);
    // console.log("Database connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();