const productModel = require("./product.model");
const categoryModel = require("./category.model");

module.exports = { getPros, getIdPro, getByKey, addPro, editPro, delatePro };

async function getPros() {
  try {
    const result = await productModel.find();

    // const result = await productModel.find().limit(5).sort({ _id: 1 });

    // select name, price where price > 2000
    // const result1 = await productModel.find(
    //   {
    //     price: { $gt: 2000 },
    //     // $lt, $lte:, $gte
    //   },
    //   { name: 1, price: 1 }
    // );
    // select name, price where price > 2000 and quatity < 50
    // const result2 = await productModel.find(
    //   {
    //     $and: [{ price: { $gt: 2000 } }, { quantity: { $lt: 50 } }],
    //   },
    //   { name: 1, price: 1 }
    // );
    // select * where like '%a%'
    // const result3 = await productModel.find({
    //     name:{
    //         $regex: 'o' + '.*',
    //         // i ko phan biet hoa thuong
    //         $option: "i"
    //     }
    // }

    // );

    return result;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function getIdPro(id) {
  try {
    const result = await productModel.findById(id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function getByKey(key, value) {
  try {
    const result = await productModel.findOne({ [key]: value });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function addPro(body) {
  try {
    const {
      name,
      price,
      priceSale,
      urlImage,
      description,
      hot,
      stock,
      category: categoryId,
    } = body;
    console.log(urlImage);

    const categoryFind = await categoryModel.findById(categoryId);
    if (!categoryFind) {
      throw new Error("Không tìm thấy danh mục");
    }

    const proNew = new productModel({
      name,
      price,
      priceSale,
      urlImage,
      description,
      hot,
      stock,
      category: {
        categoryId: categoryFind._id,
        categoryName: categoryFind.name,
      },
    });

    const result = await proNew.save();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function editPro(id, body) {
  try {
    const {
      name,
      price,
      priceSale,
      urlImage,
      description,
      hot,
      stock,
      category: categoryId,
    } = body;

    const pro = await productModel.findById(id);
    if (!pro) {
      throw new Error(`Không tìm thấy sản phẩm id = ${id}`);
    }

    const categoryFind = await categoryModel.findById(categoryId);
    if (!categoryFind) {
      throw new Error("Không tìm thấy danh mục");
    }

    const result = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        price,
        priceSale,
        urlImage,
        description,
        hot,
        stock,
        category:{
          categoryId: categoryFind._id,
          categoryName: categoryFind.name,
        } 
      },
      { new: true }
    );

    return result;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

async function delatePro(id) {
  try {
    const proDel = await productModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
