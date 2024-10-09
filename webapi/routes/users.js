var express = require("express");
var router = express.Router();
const userController = require("../mongo/user.controller");

router.get("/", async (req, res) => {
  try {
    const result = await userController.getUsers();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, mess: "Lỗi fetch dữ liệu user" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const result = await userController.getUserById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({status:false, mess:"Không tìm thấy user"});
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const result = await userController.addUser(body);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, mess: "Thêm user thất bại" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const userEdit = await userController.editUser(id,body);
    return res.status(200).json({status:true, mess:"Sửa thông tin user thành công",userEdit});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, mess: "Sửa thông tin user thất bại" });
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const result = await userController.deleteUser(id);
    return res.status(200).json({status:true, mess:"Xóa thành công user"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({status:false, mess:"Xóa không thành công user"})
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    return await userController.loginUser(body,res);
    // return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, mess: "Đăng nhập thất bại" });
  }
})


module.exports = router;
