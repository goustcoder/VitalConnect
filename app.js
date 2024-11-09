const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// MongoDB connection string and client setup
const uri = "mongodb+srv://jeet124:tmkLghrl9YRYiKll@cluster0.vhwo1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});


//strat server
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

//home page route
app.get('/',(req,res)=>{
    res.render('home.ejs');
})


// Route to render blood search page with unique states
app.get('/blood', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("Blood");
        const collection = db.collection("blood_banks");

        // Fetch unique state names
        const uniqueStates = await collection.distinct("_state");
        res.render('blood.ejs', { uniqueStates, results: [] });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data");
    } finally {
        await client.close();
    }
});

//Route to fetch unique districts for a specified state
app.get('/districts', async (req, res) => {
    const state = req.query.state;
    if (!state) return res.status(400).send("State not specified");

    try {
        await client.connect();
        const db = client.db("Blood");
        const collection = db.collection("blood_banks");

        // Get unique districts based on the state
        const uniqueDistricts = await collection.distinct("_district", { _state: state });
        res.json(uniqueDistricts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching districts");
    } finally {
        await client.close();
    }
});

// Route to fetch unique cities for a specified state and district
app.get('/cities', async (req, res) => {
    const { state, district } = req.query;
    if (!state || !district) return res.status(400).send("State or District not specified");

    try {
        await client.connect();
        const db = client.db("Blood");
        const collection = db.collection("blood_banks");

        // Get unique cities based on state and district
        const uniqueCities = await collection.distinct("_city", { _state: state, _district: district });
        res.json(uniqueCities);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching cities");
    } finally {
        await client.close();
    }
});

// Route to fetch unique blood groups for specified state, district, and city
app.get('/blood-groups', async (req, res) => {
    const { state, district, city } = req.query;
    if (!state || !district || !city) return res.status(400).send("State, District, or City not specified");

    try {
        await client.connect();
        const db = client.db("Blood");
        const collection = db.collection("blood_banks");

        // Get unique blood groups based on state, district, and city
        const uniqueBloodGroups = await collection.distinct("available_blood_group", { _state: state, _district: district, _city: city });
        res.json(uniqueBloodGroups);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching blood groups");
    } finally {
        await client.close();
    }
});

// Function to search blood groups based on user input
async function searchBloodGroups({ state, district, city, blood_group }) {
    try {
        await client.connect();
        const db = client.db("Blood");
        const collection = db.collection("blood_banks");

        // Build query based on search parameters
        let query = {};
        if (state) query._state = state;
        if (district) query._district = district;
        if (city) query._city = city;
        if (blood_group) query.available_blood_group = { $in: [blood_group] };

        // Retrieve search results
        const result = await collection.find(query).toArray();
        return result;
    } catch (err) {
        console.error("Error during search:", err);
        return [];
    }
}

// Route to handle blood search form submission and display results
app.post('/blood', async (req, res) => {
    const { state, district, city, blood_group } = req.body;
    const searchParams = { state, district, city, blood_group };

    try {
        await client.connect();
        const db = client.db("Blood");
        const collection = db.collection("blood_banks");
        const uniqueStates = await collection.distinct("_state");

        // Perform search and render results
        const results = await searchBloodGroups(searchParams);
        res.render('blood.ejs', { uniqueStates, results });
    } catch (error) {
        console.error("Error during blood search:", error);
        res.status(500).send("Error searching blood groups");
    } finally {
        await client.close();
    }
});

// Admin credentials
const adminCredentials = {
    regId: "admin123",
    password: "securePass"
};

// Middleware to authenticate admin based on regId and password
async function adminAuth(req, res, next) {
    const { regId, password } = req.body;

    if (!ObjectId.isValid(regId)) {
        return res.status(400).send("Invalid Registration ID format.");
    }

    try {
        await client.connect();
        const db = client.db("Blood");
        const collection = db.collection("blood_banks");

        // Validate regId in the database
        const adminData = await collection.findOne({ _id: new ObjectId(regId) });

        if (adminData) {
            req.adminData = adminData;
            return next();
        } else {
            res.status(401).send("Invalid Registration ID or Password");
        }
    } catch (error) {
        console.error("Error during admin authentication:", error);
        res.status(500).send("Server Error");
    } finally {
        await client.close();
    }
}

// Route to handle admin login and render admin page
app.post('/adminLogin', adminAuth, (req, res) => {
    res.render('admin.ejs', { adminData: req.adminData });
});

// Route to render admin page directly
app.get('/admin', (req, res) => {
    res.render('admin.ejs', { adminData: null });
});

// PUT request to update blood groups for admin actions (add/remove blood group)
app.put('/update-blood-group/:adminId/:bloodGroup/:action', async (req, res) => {
    const { adminId, bloodGroup, action } = req.params;

    // Convert adminId to ObjectId for querying MongoDB
    const bloodGroupIdObj = new ObjectId(adminId);

    try {
        await client.connect();
        const db = client.db("Blood");
        const collection = db.collection("blood_banks");

        // Find and update the blood bank document
        const bloodBank = await collection.findOne({ "_id": bloodGroupIdObj });

        if (bloodBank) {
            if (action === 'add') {
                await collection.updateOne(
                    { "_id": bloodGroupIdObj },
                    { $addToSet: { "available_blood_group": bloodGroup } }
                );
            } else if (action === 'remove') {
                await collection.updateOne(
                    { "_id": bloodGroupIdObj },
                    { $pull: { "available_blood_group": bloodGroup } }
                );
            }
            res.json({ success: true, message: `Blood group ${action}ed successfully!` });
        } else {
            res.status(404).json({ success: false, message: 'Blood bank not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    } finally {
        await client.close();
    }
});
