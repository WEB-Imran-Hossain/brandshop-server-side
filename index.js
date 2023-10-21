const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yshawkz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const productCollection = client.db('productDB').collection('product');
        const cartDataCollection = client.db('cartDB').collection('cart')

        app.get('/product', async (req, res) => {
            const cursor = productCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // geting loreal product
        // app.get('/product/loreal', async (req, res) => {

        //     try {
        //         const products = await productCollection.find({ brand: "Loreal" }).toArray();

        //         res.json(products);
        //     } catch (error) {
        //         console.error('Error finding products:', error);
        //         res.status(500).json({ error: 'Internal server error' });
        //     }
        // });

        // geting loreal product
        app.get('/product/loreal', async (req, res) => {

            try {
                const products = await productCollection.find({ brand: "Loreal" }).toArray();

                res.json(products);
            } catch (error) {
                console.error('Error finding products:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        // geting Estee Lauder product
        app.get('/product/estee_lauder', async (req, res) => {

            try {
                const products = await productCollection.find({ brand: "Estee Lauder" }).toArray();

                res.json(products);
            } catch (error) {
                console.error('Error finding products:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        // geting Chanel Lauder product
        app.get('/product/chanel', async (req, res) => {

            try {
                const products = await productCollection.find({ brand: "Chanel" }).toArray();

                res.json(products);
            } catch (error) {
                console.error('Error finding products:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        // geting Revlon Lauder product
        app.get('/product/revlon', async (req, res) => {

            try {
                const products = await productCollection.find({ brand: "Revlon" }).toArray();

                res.json(products);
            } catch (error) {
                console.error('Error finding products:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        // geting Avon Lauder product
        app.get('/product/avon', async (req, res) => {

            try {
                const products = await productCollection.find({ brand: "Avon" }).toArray();

                res.json(products);
            } catch (error) {
                console.error('Error finding products:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        // geting Dior Lauder product
        app.get('/product/dior', async (req, res) => {

            try {
                const products = await productCollection.find({ brand: "Dior" }).toArray();

                res.json(products);
            } catch (error) {
                console.error('Error finding products:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        // geting indvisual product
        app.get("/product/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.findOne(query);
            console.log(query);
            res.send(result);
        });

        // post methode
        app.post("/cart", async (req, res) => {
            const myCart = req.body;
            console.log(myCart);
            const result = await cartDataCollection.insertOne(myCart);
            res.send(result);
        });

        // cart get method
        app.get("/cart", async (req, res) => {
            const cursor = cartDataCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // card delete method
        app.delete("/cart/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartDataCollection.deleteOne(query);
            res.send(result);
        });

        // update data
        app.put('/product/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const newProductData = req.body;
            const product = {
                $set: {
                    name: newProductData.name,
                    image: newProductData.image,
                    price: newProductData.price,
                    rating: newProductData.rating,
                    description: newProductData.description,
                    brand: newProductData.brand,
                    category: newProductData.category,
                }
            }
            const result = await productCollection.updateOne(filter, product, options)
            res.send(result)
        })

        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            console.log(newProduct);
            const result = await productCollection.insertOne(newProduct)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// root
app.get('/', (req, res) => {
    res.send('Beauty Shop server is running')
})


app.listen(port, () => {
    console.log(`Beauty Shop server is running on port: ${port}`)
})