import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Reminder = sequelize.define("Reminder", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reminder: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default to false
  },
  isEdit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  customField: {
    // ✅ Add Custom Field
    type: DataTypes.STRING,
    allowNull: true, 
  },
});

sequelize
  .sync()
  .then(() => console.log("✅ Reminder table created (if not exists)"))
  .catch((err) => console.error("❌ Error syncing database:", err));

export default Reminder;
