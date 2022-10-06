import { openDB } from "idb";
import "regenerator-runtime/runtime";

export async function initDb() {
  const db = await openDB("contact_db", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("contacts")) {
        console.log(" contact store already exists");
        return;
      }
      db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
      console.log("contact store created");
    },
  });
}
