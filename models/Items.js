import { Schema } from "mongoose";
import {
  sinkConnect,
  sourceConnect,
} from "../kafka-connection/database-connect.js";

const itemSchema = new Schema(
  {
    name: String,
    quantity: Number,
  },
  { timestamps: true }
);

export const ItemSource = sourceConnect.model("Item", itemSchema);
export const ItemSink = sinkConnect.model("Item", itemSchema);
