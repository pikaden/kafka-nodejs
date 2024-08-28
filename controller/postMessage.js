import { produce } from "../kafka-connection/kafka-connect.js";

// ES modules
export async function sendMessageToKafka(req, res) {
  try {
    const { message } = req.body;
    const messages = [{ key: "key1", value: message }];
    produce("my-topic", messages);

    res.status(200).json({
      status: "Ok!",
      message: "Message successfully send!",
    });
  } catch (error) {
    console.log(error);
  }
}
