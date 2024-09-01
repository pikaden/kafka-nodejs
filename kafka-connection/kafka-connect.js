import { Kafka } from "kafkajs";
import { ItemSink } from "../models/Items.js";

const CLIENT_ID = "nodejs-kafka";
const BROKERS = ["localhost:9092", "localhost:9093"];

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
});

export async function produce(topic, items) {
  const producer = kafka.producer();

  try {
    await producer.connect();
    const responses = await producer.send({
      topic: topic,
      messages: [
        {
          key: items.id,
          value: JSON.stringify(items),
        },
      ],
    });

    console.log("Published message", { responses });
  } catch (error) {
    console.error(error);
  } finally {
    await producer.disconnect();
  }
}

export async function consume(topic, groupId, callback) {
  const consumer = kafka.consumer({ groupId: groupId });

  try {
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = JSON.parse(message.value)

        const items = new ItemSink({
          name: value.name,
          quantity: value.quantity,
        });

        await items.save();
        callback(value);
      },
    });
  } catch (error) {
    console.error(error);
  }
}
