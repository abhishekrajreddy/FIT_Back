const express = require("express");
const exphbs = require("express-handlebars");
const Bodyparser = require("body-parser");
const mongoose = require("mongoose");
const Handlebars = require("handlebars");
const mongoDBUri = require("./config/keys").mongoDBUri;
const Cors = require("cors");
const path = require("path");

const app = express();
app.use(Cors());

// app.listen(5000, () => {
//   console.log("App is running on 5000");
// });

app.get("/", (req, res) => {
  res.send("Home");
});

app.use(Bodyparser.urlencoded({ extended: false }));
app.use(Bodyparser.json());

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

app.engine(
  "handlebars",
  exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userRoute = require("./routes/userRoute");
// const planRoute = require('./routes/planRoute');
// const empRoute = require('./routes/empRoute');
// const customerRoute = require('./routes/customerRoute');
// const complaintRoute = require('./routes/complaintRoute');
// app.use('/',userRoute,planRoute,empRoute,customerRoute,complaintRoute)
app.use("/", userRoute);

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
