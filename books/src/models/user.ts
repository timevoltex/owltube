import db from "models";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  CreateOptions,
} from "sequelize";
import bcrypt from "bcrypt";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare username: string;
  declare password: string | null;
  validatePassword(password: string) {
    return bcrypt.compareSync(password, this.password!);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
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

(async () => {
  await User.sync();
})();

export default User;
