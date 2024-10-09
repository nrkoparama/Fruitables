var express = require("express");
var router = express.Router();
const productController = require("../mongo/product.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  // chỉ định thư mục lưu trữ
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// check file ng dung tai len (anh)
const checkFile = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|png|jpeg|webp)$/)) {
    return cb(new Error("Bạn chỉ được upload file ảnh"));
  }
  return cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: checkFile });

router.get("/", async (req, res, next) => {
  try {
    const result = await productController.getPros();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, mess: "Lỗi fetch dữ liệu product" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productController.getIdPro(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, mess: " không tìm thấy sản phảm cần tìm" });
  }
});

router.get("/:key/:value", async (req, res) => {
  try {
    const { key, value } = req.params;
    const result = await productController.getByKey(key, value);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, mess: " không tìm thấy sản phảm cần tìm" });
  }
});

router.post("/", upload.single("urlImage"), async (req, res, next) => {
  try {
    const body = req.body;

    if (req.file) {
      body.urlImage = req.file.originalname;
    } else {
      // body.urlImage = "cam.webp";   hoặc giá trị mặc định
      console.log("No file uploaded");
    }

    const proNew = await productController.addPro(body);
    return res
      .status(200)
      .json({ status: true, mess: "Thêm thành công", proNew });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, mess: "Thêm thất bại" });
  }
});

router.put("/:id", upload.single("urlImage"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // check nếu ng dùng ko tải file ảnh , file image =""
    if (req.file) {
      body.urlImage = req.file.originalname;
    } else {
      // this.delete.body.image;
      // body.image = "logo.png";     hoặc giá trị mặc định
    }

    const proUpdate = await productController.editPro(id, body);
    return res
      .status(200)
      .json({ status: true, mess: "Sửa thành công", proUpdate });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, mess: "Sửa thất bại" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productController.delatePro(id);
    return res.status(200).json({ status: true, mess: "Xóa thành công" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, mess: "Không tìm thấy sản phẩm cần xóa" });
  }
});

module.exports = router;
