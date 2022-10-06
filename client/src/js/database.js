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
export async function getDb() {
  // Create a connection to the IndexedDB database and the version we want to use.
  const contactDb = await openDB("contact_db", 1);
  // Create a new transaction and specify the store and data privileges.
  const tx = contactDb.transaction("contacts", "readonly");
  // Open up the desired object store.
  const store = tx.objectStore("contacts");

  const request = store.getAll();

  const result = await request;
  console.log("result.value", result);
  return result;
}

export async function postDb(name, email, phone, profile) {
  const contactDb = await openDB("contact_db", 1);
  const tx = contactDb.transaction("contacts", "readwrite");

  const store = tx.objectStore("contacts");

  const request = store.add({
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });
  const result = await request;
  console.log("data saved to db", result);
}
export async function deleteDb(id) {
  const contactDb = await openDB("contact_db", 1);

  const tx = contactDb.transaction("contacts", "readwrite");

  const store = tx.objectStore("contacts");
  const request = store.delete(id);
  const result = await request;
  console.log("result.value", result);
  return result?.value;
}
export const editDb = async (id, name, email, phone, profile) => {
  console.log("PUT to the database");

  const contactDb = await openDB("contact_db", 1);

  const tx = contactDb.transaction("contacts", "readwrite");

  const store = tx.objectStore("contacts");

  const request = store.put({
    id: id,
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};
window.editCard = (e) => {
  // Grabs the id from the button element attached to the contact card and sets a global variable that will be used in the form element.
  let profileId = parseInt(e.dataset.id);

  // Grabs information to pre-populate edit form
  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;

  document.getElementById("name").value = editName;
  document.getElementById("email").value = editEmail;
  document.getElementById("phone").value = editPhone;

  form.style.display = "block";

  // Toggles the Submit button so that it now Updates an existing contact instead of posting a new one
  submitBtnToUpdate = true;
};
