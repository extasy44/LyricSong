const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");

const app = express();

// Replace with your mongoDB URI
const MONGO_URI =
  "mongodb+srv://dbuser:dbuser@cluster0-bw5ck.mongodb.net/test?retryWrites=true&w=majority";
if (!MONGO_URI) {
  throw new Error("You must provide a mongoDB URI");
}
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Database connected!"))
  .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
