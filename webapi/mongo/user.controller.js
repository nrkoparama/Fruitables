const userModel = require("./user.model");
// const bcryptjs = require('bcryptjs');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'ZwmLFkJAajO51Ep/grbfqb8sF+eZusrjH4Phdc8HuvSqFH7XKhADqlecP0h8arknxWqbNK3kUr9Ppm3AvKYDElQ/bV2JQV18VRlejS2yJTUmZoyMhhERCk7m4yjtxvuVBGCnPi4b1WvsmQJDu+2dhKNx7YBlHfD+LQJVhJsZr6mHMdosA8YSC75grRy7bnnQ+IGcnuhMAm3k1CGl0zMjzOR/n2z7Fb9N2KoBqS4pk6aGYo8U7c37S2zGdhPJWURZlCg9YDTAtFwZiHCK0uysPzpai1h+sAzcFS/7++C+C5Wzx1xcWk90HeKWk1HbizyUx8Dg9/U2g/Ttf21fFG7dlw=='

module.exports = { getUsers, getUserById, addUser, editUser, deleteUser, loginUser };

async function getUsers() {
  try {
    const result = await userModel.find();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function getUserById(id) {
  try {
    const result = await userModel.findById(id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function addUser(body) {
  try {
    const { name, email, password, phoneNumber, role } = await body;

    let user = await userModel.findOne({ email: email });

    if (user) {
      throw new Error("Email đã được sử dụng");
    }

    // tạo hash password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    user = userModel({ name, email, password: hash, phoneNumber, role });

    const result = await user.save();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function editUser(id, body) {
  const user = await userModel.findById(id);

  if (!user) {
    throw new Error("Không tìm thấy user");
  }

  const { name, email, password, phoneNumber, role } = body;

  const result = await userModel.findByIdAndUpdate(
    id,
    { name, email, password, phoneNumber, role },
    { new: true }
  );

  return result;
}

async function deleteUser(id) {
  try {
    const userDel = await userModel.findByIdAndDelete(id);
  } catch {
    console.log(error);
    throw new Error();
  }
}

// hàm đăng nhập
async function loginUser(body,res) {
  try {
    const { name, password } = await body;

    let user = await userModel.findOne({ name: name });
    
    if (!user) {
      return {mess: "Không tìm thấy tài khoản"}
    }

    const matchPass = bcrypt.compareSync(password, user.password);
    if (matchPass) {
      const token = jwt.sign({
        id: user._id,
        role: user.role
      },
      SECRET_KEY,
      { expiresIn: '5m' });
      return res.json({
        token: token
      });
      
    } else {
      return res.status(403).json({mess: "Tài khoản hoặc mật khẩu sai"})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mess: "Lỗi server" });
  }
}
