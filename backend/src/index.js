import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/db.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Express app error", error);
      throw error;
    });
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Express app is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MONGO DB connection Failed!!", error);
  });

// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`);
//     console.log("MONGODB CONNECTED SUCCESFULLY!!");

//     app.on("error", (error) => {
//       console.log("Express app error!!", error);
//       throw error;
//     });

//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`App is listening at port ${process.env.PORT || 5000}`);
//     });
//   } catch (error) {
//     console.error("MONGODB CONNECTION FAILED!!", error);
//   }
// })();
