import { SINK_DATABASE, SOURCE_DATABASE } from "../config/config.js";

import mongoose from "mongoose";

function makeNewConnection(uri) {
  const db = mongoose.createConnection(uri);

  db.on("error", function (error) {
    console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
    db.close().catch(() =>
      console.log(`MongoDB :: failed to close connection ${this.name}`)
    );
  });

  db.on("connected", function () {
    mongoose.set("debug", function (col, method, query, doc) {
      console.log(
        `MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(
          query
        )},${JSON.stringify(doc)})`
      );
    });
    console.log(`MongoDB :: connected ${this.name}`);
  });

  db.on("disconnected", function () {
    console.log(`MongoDB :: disconnected ${this.name}`);
  });

  return db;
}

// Use
export const sourceConnect = makeNewConnection(SOURCE_DATABASE);
export const sinkConnect = makeNewConnection(SINK_DATABASE);
