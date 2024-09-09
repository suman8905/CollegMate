const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const database = require("./config/database");
const cloudinary = require("./config/cloudinary");
const path = require('path');
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use(cors(
	{
		origin: ["*","https://colleg-mate.vercel.app",
            "http://localhost:3000"
        ],
		credentials: true,
	}
))

database.connect();
cloudinary.cloudinaryConnect();

const userRoutes = require("./routes/user");
const fileRoutes = require("./routes/File");
const profileRoutes = require("./routes/Profile");
const contactRoutes = require("./routes/Contact");

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/upload", fileRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/contact", contactRoutes);

// Testing the server
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});

// Listening to the server
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});
