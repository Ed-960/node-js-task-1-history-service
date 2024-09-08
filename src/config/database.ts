import { Sequelize } from "sequelize";

const sequelize = new Sequelize("history_db", "postgres", "1111", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
