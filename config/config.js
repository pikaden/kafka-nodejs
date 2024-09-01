export const SOURCE_DATABASE =
  process.env.SOURCE_DATABASE ?? "mongodb://localhost:27017/KafkaSource";
export const SINK_DATABASE =
  process.env.SINK_DATABASE ?? "mongodb://localhost:27017/KafkaSink";