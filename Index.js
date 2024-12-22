const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PROT || 5000;
const app = express();
// !                password:Assinment_Eleven
// !                password:Assinment_Eleven

app.use(cors());
app.use(express.json());

// ! Mongodb File

const uri = "mongodb+srv://Assinment_Eleven:Assinment_Eleven@cluster0.frskr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
const dataBase = client.db("carDb")
const carCollection = dataBase.collection("car")
const bookingCollection = dataBase.collection("booking")

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Add_Car
app.post("/added_car", async(req, res ) =>{
const cardData = req.body
const result = await carCollection.insertOne(cardData)
res.send(result)
})
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//My_Car_Page
app.get('/my_car_page/:email',async(req, res)=>{
  const email = req.params.email
  const query = {email}
  const result = await carCollection.find(query).toArray()
  res.send(result)
})
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//My_Car_Page
app.get('/my_car_page_edit/:id',async(req, res)=>{
  const id = req.params.id
  console.log(id);
  const query = {_id: new ObjectId (id)}
  const result = await carCollection.findOne(query)
  res.send(result)
})


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Car Deleted 
app.delete(`/my_car_page/:id`, async(req, res)=>{
  const id = req.params.id
  console.log(id);
  const query = {_id: new ObjectId (id)}
  const result = await carCollection.deleteOne(query)
  res.send(result)
})
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Find all car
app.get('/added_car/available_car',async(req, res)=>{
      const car = req.body
      const result = await carCollection.find(car).toArray()
      res.send(result)
})
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Find all car 
app.get('/detailsPage/:id',async(req, res)=>{
  const id = req.params.id
  const query = {_id : new ObjectId (id)}
  const result = await carCollection.findOne(query)
  res.send(result)
})

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Car Update Data Or Edit 
app.put(`/my_car_page_update/:id`, async(req, res ) =>{
  const id = req.params.id
  const updateCar = req.body
  console.log(updateCar);
  const query = {_id : new ObjectId (id) }
  const options = { upsert: true };
  const updateDocs = {
    $set:{
      carmodel: updateCar.carmodel,
      price: updateCar.price,
      Registration_Number: updateCar.Registration_Number,
      Description: updateCar.Description,
      availability: updateCar.availability,
      location: updateCar.location,
    }
  }
  const result = await carCollection.updateOne(query , updateDocs,  options)
  res.send(result)
}) 


// =====================================================================================
// =====================================================================================
// =====================================================================================

// -------------------------------Booking Collection Work --------------------------------

app.post("/booking/:id",async (req, res) =>{
  const booking = req.body
  const result = await bookingCollection.insertOne(booking)
  req.send(result)
  
})



















    // // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Assinment Ten is Running");
});

app.listen(port, () => {
  console.log(`Server Is Running Is Prot ${port}`);
});
