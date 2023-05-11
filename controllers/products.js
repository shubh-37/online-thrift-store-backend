
function products(app, Models){
    const { Product } = Models;
    app.post("/createProd", async function createProd(req,res){
        const { prodName, prodSize, quantity, availability, prodPrice, user } = req.body;
        try {
            const prod = await Product.create({
                prodName,
                prodSize,
                quantity,
                availability,
                prodPrice,
                user
            });
            if (prod) {
                return res.status(201).json({ _id: prod._id, name: prod.prodName, message: "Product created"});
            }else{
                return res.status(404).json({message: "Couldn't create product! Please try again"})
            }
        } catch (error) {
                return res.status(500).json({message: error.message})
        }
    });
    app.delete("/deleteProd/:userId", async function deleteProd(req, res){
        const { userId } = req.params;
        const { prodName } = req.body;
        try {
            const deletedProd = await Product.findOneAndDelete({ user: userId, prodName: prodName });
            if(deletedProd){
                return res.status(200).json({message: "product deleted successfully", name: deletedProd.prodName});
            }else{
                return res.status(404).json({message: "product not found"});
            }
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    });
    app.get("/allProd", async function getAllProd(req,res){
        try {
            const products = await Product.find({});
            if(products){
                return res.status(200).json({ products });
            }else{
                return res.status(404).json({message: "products not found"});
            }
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    });
    app.get("/prod/:userId", async function getProdByUser(req,res) {
        const { userId } = req.params;
        try {
            const products = await Product.find({user: userId});
            if(products){
                res.status(200).json({ products });
            }else{
                res.status(404).json({message: `Products by ${userId} not found!`});
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });
    app.put("/update/:prodId", async function updateProd(req, res){
        const { prodId } = req.params;
        const { prodName, prodSize, prodPrice, quantity, availability} = req.body;
        try {
            const product = await Product.findOneAndUpdate({_id : prodId}, { prodName, prodPrice, prodSize, quantity, availability}, {
                new: true
            });
            if(product) {
                res.status(200).json({message: "product updated successfully", product});
            }else{
                res.status(404).json({message: "product not found!"});
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });
}

module.exports = products;