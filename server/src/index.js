const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

const statusRouter = require("./routes/status");
const mjRouter = require("./routes/mj");
const accountRouter = require("./routes/account");
const commentRouter = require("./routes/comment");

app.use(express.json());
console.log("???")
const whitelist = ["http://ssal.sparcs.org:15188"];
const corsOptions = {
  origin: (origin, callback) => {
    console.log("[REQUEST-CORS] Request from origin: ", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error("Not Allowed by CORS"));
  },
  //   origin: whitelist,
  credentials: true,
};
/* DO NOT REMOVE */
/* Configure Environment Variables */
if (process.env.ENVIRONMENT === "DEVELOPMENT") {
  dotenv.config({ path: ".env.development" });
} else {
  dotenv.config({ path: ".env.production" });
}

const port = process.env.EXPRESS_PORT;

app.use(cors());

app.use((req, res, next) => {
  console.log("[REQUEST] ", req.method, req.url, req.origin);
  next();
});

app.use("/status", statusRouter);
app.use("/mj", mjRouter);
app.use("/account", accountRouter);
app.use("/comment", commentRouter);

app.use("/static", express.static(path.join(__dirname, "public")));

// Connect to MongoDB

console.log(process.env.MONGO_URI)
const OMongooseOption = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGO_URI, OMongooseOption).then(
  () => {
    console.log("[Mongoose] Connection Complete!");
  },
  (err) => {
    console.log(`[Mongoose] Connection Error: ${err}`);
  }
);

app.listen(port, () => {
  console.log(`Express Listening @ http://ssal.sparcs.org:15186/`);
});
