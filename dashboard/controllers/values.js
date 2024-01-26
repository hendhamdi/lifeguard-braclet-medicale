import dbRef from "../db/firebase.js";
import { child, get, getDatabase, ref, push, onValue } from "firebase/database";
const getHeartBeat = async(req, res) => {
    const starCountRef = ref(dbRef, "heartbeat");
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        res.status(200).json({ heartbeat: data });
    });
};

const getTemp = async(req, res) => {
    const starCountRef = ref(dbRef, "temp");
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        res.status(200).json({ temp: data });
    });
};

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const setHeartBeat = async(req, res) => {
    for (let index = 0; index < 20; index++) {
        setTimeout(() => {
            push(ref(dbRef, "temp"), {
                value: (Math.random() * (37.5 - 36.5) + 36.5).toFixed(2),
                timestamp: Date.now() + index * 60000,
            });
            push(ref(dbRef, "heartbeat"), {
                value: Math.floor(Math.random() * (100 - 60 + 1) + 60),
                timestamp: Date.now() + index * 60000,
            });
        }, 1000);
    }
    res.json({ message: "values added" });
};
const getBracelet = (req, res) => {
    res.status(200).render("bracelet");
};
const getDashboard = (req, res) => {
    res.status(200).render("index");
};
const getPatients = (req, res) => {
    res.status(200).render("patients");
};

export {
    getHeartBeat,
    getTemp,
    setHeartBeat,
    getDashboard,
    getBracelet,
    getPatients,
};