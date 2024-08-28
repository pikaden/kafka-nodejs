import { Kafka } from "kafkajs";

const CLIENT_ID = "nodejs-kafka"
const BROKERS = ["localhost:9092", "localhost:9093"];

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
});

export async function produce(topic, messages) {
  const producer = kafka.producer();

  try {
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: messages,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await producer.disconnect();
  }
}

export async function consume(topic, callback) {
  const consumer = kafka.consumer({ groupId: "test-group" });

  try {
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        callback(value);
      },
    });
  } catch (error) {
    console.error(error);
  }
}
