import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import Blog from "./blog";

@Table({ name: { singular: "Users" } })
class User extends Model {
  @Column({ type: DataType.STRING, unique: true })
  username!: string;

  @Column({
    type: DataType.STRING,
    set(value: string) {
      this.setDataValue("password", bcrypt.hashSync(value, 10));
    },
  })
  password?: string;

  generateToken() {
    const token = sign(
      {
        _id: this.id,
        username: this.dataValues.username,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );
    return token;
  }

  validatePassword(password: string) {
    return bcrypt.compareSync(password, this.dataValues.password!);
  }
}

export default User;
