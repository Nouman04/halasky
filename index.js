require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const limiter = require("./src/middleware/limiter");
const passport = require("passport");
const initializePassport = require("./src/config/passportConfig");
const cronJobs = require("./src/jobs/index");
initializePassport(passport);
//routest starts here
const userRoutes = require("./src/routes/userRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const faqRoutes = require("./src/routes/faqRoutes");
const activityRoutes = require("./src/routes/communityActivityRoutes");
const customerQueryRoutes = require("./src/routes/customerQueryRoutes");
const commonRoutes = require("./src/routes/commonRoutes");
const settingsRoutes = require("./src/routes/settingRoutes");
const authRoutes = require("./src/routes/authRoutes");
const suspiciousActivityRoutes = require("./src/routes/suspiciousActivityRoutes");
const flightRoutes = require("./src/routes/flightRoutes");
const hotelRoutes = require("./src/routes/hotelRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const testRoutes = require("./src/routes/testRoutes");
const nonLimitorRoutes = require("./src/public/files/nonLimitorRoutes");

const cors = require("cors");
const app = express();
const PORT = process.env.NODE_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(limiter);
app.use( (req , res , next ) => {
    if(nonLimitorRoutes.includes(req.path))
    {
        return next();
    }
    limiter(req , res , next);
})
app.use(passport.initialize());
// app.use(passport.session());

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/faq", faqRoutes);
app.use("/activity", activityRoutes);
app.use("/query", customerQueryRoutes);
app.use("/common", commonRoutes);
app.use("/settings", settingsRoutes);
app.use("/activity", suspiciousActivityRoutes);
app.use("/flight", flightRoutes);
app.use("/hotel", hotelRoutes);
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/test", testRoutes);

//socket code starts here
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection' ,(socket)=>{
    console.log(`socket connection connected, connection id:${socket.id}`)
})

app.listen( PORT , () => {
    cronJobs();
    console.log(`App is listening at port: ${PORT}`)
})

