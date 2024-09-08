import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const History = sequelize.define("History", {
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shopId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  plu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default History;
