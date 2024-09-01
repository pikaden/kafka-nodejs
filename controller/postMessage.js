import { produce } from "../kafka-connection/kafka-connect.js";
import { ItemSource } from "../models/Items.js";

export async function addItem(req, res) {
  try {
    const items = new ItemSource({
      name: req.body.name,
      quantity: req.body.quantity,
    });

    await items.save();
    produce("my-items", items)

    res.status(200).json({
      status: "OK!",
      message: "Item added succesfully!"
    })
  } catch (error) {
    console.log(error);
  }
}
