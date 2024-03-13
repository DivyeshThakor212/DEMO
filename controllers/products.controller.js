const productsModel = require("../models/products/products.model");

//Create
exports.createProduct = async(req,res) => {
 try{
    const product = await productsModel.create(req.body)
    return res.status(201).send({
        success: true,
        product
    })
 }
 catch(error){
    console.log(error,"error")
    return res.status(500).send({status: false , message:"internal server error"})

 }
}

//Read

exports.getProducts = async(req, res) => {
    try {
        const products = await productsModel.find()
        if(!products.length){
            return res.status(200).json({status: false, message:"No data found"})
        }
        return res.status(200).json({status: true, products})
    } catch (error) {
        console.log(error, 'error')
        return res.status(500).send({ status: false, message: "Internal Server Error" })
    }
}

exports.getProduct = async(req, res) => {
    try {
        const product = await productsModel.findById(req.params.id)
        console.log(product, 'product')
        if(!product){
            return res.status(200).json({status: false, message:"Please provide correct id"})
        }
        return res.status(200).json({status: true, product})
    } catch (error) {
        console.log(error, 'error')
        return res.status(500).send({ status: false, message: "Internal Server Error" })
    }
}


// Update

exports.updateProduct = async (req, res) => {
    let product = await productsModel.findById(req.params.id);
  
    if(!product){
        return res.status(200).json({status: false, message:"Please provide correct id"})
    }
  
    product = await productsModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
  
    res.status(200).json({
      success: true,
      product
    });
  };

  // Delete

exports.deleteProduct = async (req, res) => {   
    let product = await productsModel.findById(req.params.id);
  
    if(!product){
        return res.status(200).json({status: false, message:"Please provide correct id"})
    }
  
    product = await productsModel.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      message: "Deleted Successfully"
    });
  };


  