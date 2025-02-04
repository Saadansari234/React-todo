import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bodyParser from "body-parser";
import Reminder from "./models/Reminders.js";

const app = express();
app.use(cors());

app.use(express.json());

app.post("/add-reminder", async (req, res) => {
  try {
    const { reminder } = req.body;
    const newReminder = await Reminder.create({ reminder: reminder });
    console.log(newReminder);

    res.status(201).json(newReminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/reminders", async (req, res) => {
  try {
    const reminders = await Reminder.findAll(); // Fetch all reminders

    res.status(200).json(reminders);
  } catch (error) {
    console.error("❌ Error fetching reminders:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/reminder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReminder = await Reminder.destroy({ where: { id } });
    console.log(deletedReminder);
    if (!deletedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    // res.json({ message: "Reminder deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.json("hello world");
});

app.listen(8081, () => {
  console.log("listening");
});
