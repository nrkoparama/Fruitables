const categoryModel = require("./category.model");

module.exports = { getCates , getIdCate , addCate , editCates, deleteCate };

async function getCates(){
    try {
        const result = await categoryModel.find().populate();
        return result;
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}

async function getIdCate(id){
    try {
        const result = await categoryModel.findById(id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error;

    }
}

async function addCate(body){
    try {
        const { name} = body;
        const cateNew = new categoryModel({
            name
        })
        const result = await cateNew.save();
        return result;
    } catch (error) {
        console.log(error)
        throw new Error;
    }
}

async function editCates(id,body){
    try {
        const cate = await categoryModel.findById(id);
        
        const {name} = body;
        const result = await categoryModel.findByIdAndUpdate(id,
            {name},{new:true});
        return result;
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}

async function deleteCate(id){
    try {
        const cateDel = await categoryModel.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}




