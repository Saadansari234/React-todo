import { Sequelize } from "sequelize";

const sequelize = new Sequelize("reminder-app", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.error("DB Connection Error:", err));

export default sequelize
