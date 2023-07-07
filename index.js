import express from "express";
import { routes } from "./src/routes/route.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import 'dotenv/config'
import jsonwebtoken from "jsonwebtoken";

mongoose.set('strictQuery', true);
const app = express();
const PORT = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database connected");
}).catch((err) => {
  console.log("Error connecting to database", err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.use(express.static("public"));

routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
