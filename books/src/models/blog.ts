import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import db from "./db";
import User from "./user";

interface BlogModel
  extends Model<
    InferAttributes<BlogModel>,
    InferCreationAttributes<BlogModel>
  > {
  id?: number;
  title: string;
  body?: string;
  userName?: ForeignKey<User["username"]>;
}

const Blog = db.define<BlogModel>("Blog", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
});

(async () => {
  await Blog.sync({ alter: true });
})();

export default Blog;
