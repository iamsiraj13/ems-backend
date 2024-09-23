const userModel = require("./models/user.model");

const userRegister = async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin", 10);
    const user = await userModel.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });
  } catch (error) {
    console.log(error);
  }
};

userRegister();
