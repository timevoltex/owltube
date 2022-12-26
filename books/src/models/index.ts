"use strict";

import { basename as _basename } from "path";
import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.json")[env];

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const db = sequelize;

export default db;
