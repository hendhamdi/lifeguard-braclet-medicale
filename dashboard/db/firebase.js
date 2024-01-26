import { initializeApp } from "firebase/app";

import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  databaseURL: "/path",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dbRef = getDatabase(app);

export default dbRef;
