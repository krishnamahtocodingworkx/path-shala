const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contact = require("./routes/Contact");


const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT  || 4000;

//database connect
database.dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());

//deployment me hmessa origin * hoga yaad rkhna hai ye
app.use(
    cors({
        origin:"*",
        credentials: true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach",contact)


//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your default route is running"
    })
})

//activate the server
app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`)
})
