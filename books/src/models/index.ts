import db from "models/db";
import Blog from "models/blog";
import User from "models/user";

Blog.belongsTo(User, { foreignKey: "username" });

db.sync({ force: false }).then(function () {
  console.log("Database Synced");
});

export default { Blog, User };
