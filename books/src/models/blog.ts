import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import db from "./index";

interface BlogModel
  extends Model<
    InferAttributes<BlogModel>,
    InferCreationAttributes<BlogModel>
  > {
  id?: number;
  title: string;
  body?: string;
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
  },
});

(async () => {
  await Blog.sync({ alter: true });
})();

export default Blog;
