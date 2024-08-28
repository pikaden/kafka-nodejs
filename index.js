import express from "express";
import bodyParser from "body-parser";
import { consume } from "./kafka-connection/kafka-connect.js";
import { sendMessageToKafka } from "./controller/postMessage.js";

const app = express();
const jsonParser = bodyParser.json();

app.post("/api/send", jsonParser, sendMessageToKafka);

// consume from topic "my-topic"
consume("my-topic", (value) => {
  console.log("Receive message: ", value);
});

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});
