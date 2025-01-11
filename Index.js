const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PROT || 5000;
const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      // "https://loginfrom-525ec.web.app",
      "https://simple-firbase-recap.web.app",
      "https://simple-firbase-recap.firebaseapp.com",
      // "https://loginfrom-525ec.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

const uri =
  "mongodb+srv://Assinment_Eleven:Assinment_Eleven@cluster0.frskr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const dataBase = client.db("carDb");
    const carCollection = dataBase.collection("car");
    const bookingCollection = dataBase.collection("booking");

       //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Add_Car
    app.post("/added_car", async (req, res) => {
      const cardData = req.body;
      const result = await carCollection.insertOne(cardData);
      res.send(result);
    });
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //My_Car_Page
    app.get("/my_car_page/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await carCollection.find(query).toArray();
      res.send(result);
    });
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //My_Car_Page
    app.get("/my_car_page_edit/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await carCollection.findOne(query);
      res.send(result);
    });

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // Car Deleted
    app.delete(`/my_car_page/:id`, async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await carCollection.deleteOne(query);
      res.send(result);
    });
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    app.get("/added_car/available_car", async (req, res) => {
      const data = req.body;
      const result = await carCollection.find(data).toArray();
      res.send(result);
    });
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Find all car
    app.get("/added_car/available_car/latest", async (req, res) => {
      const result = await carCollection
        .find({ availability: "Available" }) // Only find available cars
        .sort({ addedDate: -1 }) // Sort by addedDate in descending order
        .limit(6) // Get the latest car
        .toArray(); // Convert to array

      res.send(result);
    });

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Find all car
    app.get("/detailsPage/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await carCollection.findOne(query);
      res.send(result);
    });

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Car Update Data Or Edit
    app.put(`/my_car_page_update/:id`, async (req, res) => {
      const id = req.params.id;
      const updateCar = req.body;
      console.log(updateCar);
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDocs = {
        $set: {
          carmodel: updateCar.carmodel,
          price: updateCar.price,
          Registration_Number: updateCar.Registration_Number,
          Description: updateCar.Description,
          availability: updateCar.availability,
          location: updateCar.location,
        },
      };
      const result = await carCollection.updateOne(query, updateDocs, options);
      res.send(result);
    });

    // =====================================================================================

    // =====================================================================================
    // =====================================================================================

    // -------------------------------Booking Collection Work --------------------------------

    app.post("/booking", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //booking cancle
    // Car Deleted
    app.delete(`/booking_cancel/:id`, async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.get(`/booking/date/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });

    // ----------------------------------------------------------------------------------------------------------------------------------------------------------

    app.get(`/booking/:email`, async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Assinment Ten is Running");
});

app.listen(port, () => {
  console.log(`Server Is Running Is Prot ${port}`);
});
