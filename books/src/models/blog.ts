import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user";
@Table({ name: { singular: "Blog" } })
class Blog extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  body?: string;

  // @BelongsTo(() => User, {
  //   foreignKey: { name: "userName" },
  //   targetKey: "username",
  //   onDelete: "CASCADE",
  // })
  // @Column({
  //   type: DataType.STRING,
  //   references: {
  //     model: "Users",
  //     key: "username",
  //   },
  //   allowNull: false,
  // })
  // userName!: string;
}

export default Blog;
