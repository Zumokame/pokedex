import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Team extends Model {}

Team.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },

  description: {
    type: DataTypes.TEXT,
  }
}, {
  sequelize,
  tableName: "team"
});

/**
 * A Team
 * @typedef  {object} Team
 * @property {string} id.required - Team identifier
 * @property {string} name.required - Team name
 * @property {number} description - Team description
 */
