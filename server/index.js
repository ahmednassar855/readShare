import Express from "express";
import connection from "./database/connection.js";
import authRoute from "./src/modules/auth/authRoute.js";
import userRoute from "./src/modules/user/userRoutes.js";
import bookRoute from "./src/modules/book/bookRoutes.js";
import categeoryRoute from "./src/modules/category/categoryRoutes.js";
import { errorController } from "./src/error/errorController.js";
import reviewRoute from "./src/modules/reviews/reviewRoute.js";

import * as dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const app = Express();
app.use(cors())

app.use(Express.static("public"));
connection();
app.use(Express.json());

app.get('/test', (req, res)=> { res.send('jjjd')})
app.use("/users", authRoute);
app.use("/users", userRoute);
app.use("/books", bookRoute);
app.use("/category", categeoryRoute);
app.use("/review", reviewRoute);


app.all("*", (req, res) => {
  res.status(404).json({ message: "page not found ,, check your url" });
});
app.use(errorController);
const port = 5000;
app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});
