const dotenv = require("dotenv");
const manogoose = require("mongoose");
dotenv.config({ path: __dirname + "/config.env" });

const app = require("./app");
const { default: mongoose } = require("mongoose");

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB connection successfull");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
