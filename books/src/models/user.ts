import db from "models/db";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password?: string | null;
  validatePassword(password: string) {
    return bcrypt.compareSync(password, this.password!);
  }
  generateToken() {
    const token = jwt.sign(
      {
        _id: this.id,
        username: this.username,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );
    return token;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      set(value: string) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },
    },
  },
  {
    name: {
      singular: "User",
    },
    sequelize: db,
  }
);
export default User;
