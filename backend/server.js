import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reminder-app",
});

// db.connect((err) => {
//   // for creating tables code
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = `CREATE TABLE IF NOT EXISTS Reminder_list (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           reminder VARCHAR(255) NOT NULL,
//           isCompleted BOOLEAN NOT NULL DEFAULT FALSE,
//           isEdit BOOLEAN NOT NULL DEFAULT FALSE,
//           isRecording BOOLEAN NOT NULL DEFAULT FALSE,
//           isPlaying BOOLEAN NOT NULL DEFAULT FALSE
//       )`;
//   db.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

app.post("/add-reminder", (req, res) => {
  const sql = "INSERT INTO reminder_list (`reminder`) VALUES (?)";
  const values = req.body.reminder;
  console.log(values);
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ message: "error in node" });
    return res.json(result);
  });
});

app.get("/reminders", (req, res) => {
  const sql = "SELECT * FROM reminder_list";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching todos:", err);
      res.status(500).json({ error: "Failed to fetch todos" });
    } else {
      //   console.log(results);
      res.status(200).json(results);
    }
  });
});

app.delete(`/reminder/:id`, (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sql = "DELETE FROM reminder_list WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error deleting reminder:", err);
      res.status(500).json({ error: "Failed to delete reminder" });
    } else {
      res.status(200).json({ message: "Reminder deleted successfully" });
    }
  });
});


app.patch(`/reminder/:id`, (req, res) => {
  const { id } = req.params;
  const { updatedval } = req.body;  
  console.log(id, updatedval);  

  const sql = "UPDATE reminder_list SET reminder = ? WHERE id = ?";
  
  db.query(sql, [updatedval, id], (err, result) => {
      if (err) return res.status(500).json({ message: "Failed to delete todo" });
      return res.status(200).json({ message: "Todo deleted successfully", id });
    });
});

app.get("/", (req, res) => {
  res.json("hello world");
});

app.listen(8081, () => {
  console.log("listening");
});
