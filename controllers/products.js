
function products(app, Models){
    const { Product } = Models;
    app.post("/createProd", async function createProd(req,res){
        const { prodName, prodSize, quantity, availability, prodPrice } = req.body;
        try {
            const prod = await Product.create({
                prodName,
                prodSize,
                quantity,
                availability,
                prodPrice
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
}

module.exports = products;