const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/userSchema");

// Register user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        res.status(422).json("Please fill all the fields");
        return;
    }

    try {
        // Check if user already exists
        const preuser = await User.findOne({ email: email });
        if (preuser) {
            res.status(422).json("This user is already present");
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const addUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save user to the database
        await addUser.save();
        // res.status(201).json(addUser);
        res.status(201).json('Registered successful');//Front end ilek ulla response
    } catch (error) {
        res.status(422).json(error);
    }
});




// Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        res.status(422).json("Please fill all the fields");
        return;
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(422).json("Invalid email or password");
            return;
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(422).json("Invalid email or password");
            return;
        }

        // Successful login
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json(error);
    }
});


//get userdata to the table

router.get("/getdata", async (req, res) => { //api defining
    try {
        const userdata = await User.find(); // user details find cheythu
        res.status(201).json(userdata)
        console.log(userdata);

    } catch (error) {
        res.status(422).json(error);
    }
})


//get individual data

router.get("/getuser/:id", async (req, res) => { //:id is a route parameter. api defining
    try {
        console.log(req.params); // req.params is an object that holds all the route parameters

        const { id } = req.params;// (or) inganeyum ezhutham---> const id = req.params.id; // { id } is a way to extract the id property from that object and assign it to a variable named id
        //req.params ne id yil assign cheythu

        const userindividual = await User.findById({ _id: id }); // valid "id" aanenkil ith work aakm
        console.log(userindividual);
        res.status(201).json(userindividual) // ith success aayal "details.jsx" il pokm // Send the user data as JSON

    } catch (error) {
        res.status(422).json(error)
    }
})





// Update user data (Editing)
router.post("/updateuser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true // Return the updated document
      });
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(422).json(error);
    }
  });
  

  
//delete user

router.delete("/deleteuser/:id", async (req, res) => { //api defining
    try {
        const { id } = req.params;

        const deletuser = await User.findByIdAndDelete({_id:id})

        console.log(deletuser);
        res.status(201).json(deletuser)

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;
