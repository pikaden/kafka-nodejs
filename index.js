import express from "express";
import bodyParser from "body-parser";
import { consume } from "./kafka-connection/kafka-connect.js";
import { addItem } from "./controller/postMessage.js";
import { config } from "dotenv";

const app = express();
const jsonParser = bodyParser.json();
config();

app.post("/api/addItem", jsonParser, addItem);

consume("my-items", "item-group", (item) => {
  console.log("Receive item: ", item);
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});
