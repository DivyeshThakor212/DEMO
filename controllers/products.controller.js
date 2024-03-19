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

//search
exports.searchProduct = async(req,res) => {
    try {
        console.log(req.query.search);
        const products = await productsModel.find()

        

        const searchTerm = req.query.search.toLowerCase(); // Convert search query to lowercase
        console.log("searchTerm---",searchTerm)
        // console.log(products);
        const result = products.filter((data,index,arr) => {
            const productName = data.name.toLowerCase(); // Convert product name to lowercase
            console.log(productName.includes(searchTerm),"-----")
            if(productName.includes(searchTerm)) {
                return true;
            } else {
                return false;
            }
        })

        res.status(201).send({
            success: true,
            result
        })
    } catch (error) {
        console.log(error);
    }
}

/*exports.searchProduct = async(req,res) => {
    try {
        console.log(req.query.search);
        const products = await productsModel.find()

        // console.log(products);
        const result = products.filter((data,index,arr) => {
            console.log(data.name.includes(req.query.search),"-----")
            if(data.name.includes(req.query.search)) {
                return true;
            } else {
                return false;
            }
        })

        res.status(201).send({
            success: true,
            result
        })
    } catch (error) {
        console.log(error);
    }
} */



//Read (with pagination ,filter , sorting)

exports.getProducts = async(req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page-1) * limit
    const status = req.query.status;
    const sortBy = req.query.sortBy
    const sortOrder = req.query.sortOrder
    const search = req.query.searchTerm
    try {

        const filter = {};
        //const sort = {};
        const sort = {[sortBy]: sortOrder}
        /*if (sortBy && sortOrder) {
            sort[sortBy] = sortOrder;
        }*/

        if(status){
            filter.status = status;
        }
        if(search){
            filter.search = {$regex: new RegExp(search, "i")}
        }
        const products = await productsModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        const totaProduct = await productsModel.countDocuments()
        if(!products.length){
            return res.status(200).json({status: false, message:"No data found"})
        }
        return res.status(200).json({status: true, products,totaProduct})
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


  