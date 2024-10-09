var express = require("express");
var router = express.Router();

const categoryController = require("../mongo/category.controller");

router.get("/", async (req, res, next) => {
  try {
    const result = await categoryController.getCates();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, mess: "Lỗi fetch dữ liệu category"});
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryController.getIdCate(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, mess: "Không tìm thấy danh mục cần tìm" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const cateNew = await categoryController.addCate(body);

    return res
      .status(200)
      .json({ status: true, mess: "Thêm danh mục thành công", cateNew });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, mess: "Thêm danh mục mới thất bại" });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const cateUpdate = await categoryController.editCates(id, body);
    return res
      .status(200)
      .json({ status: true, mess: "Sửa danh mục thành công", cateUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, mess: "Sửa danh mục thất bại" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryController.deleteCate(id);
    return res
    .status(200)
    .json({ status: true, mess: "Xóa thành công" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, mess: "Không tìm thấy danh mục cần xóa" });
  }
});

module.exports = router;
