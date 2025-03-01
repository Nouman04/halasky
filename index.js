require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const limiter = require('./src/middleware/limiter');
const passport = require('passport');
const initializePassport = require('./src/config/passportConfig');
const cronJobs = require('./src/jobs/index');
initializePassport(passport);
//routest starts here
const userRoutes = require('./src/routes/userRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const faqRoutes = require('./src/routes/faqRoutes');
const activityRoutes = require('./src/routes/communityActivityRoutes');
const customerQueryRoutes = require('./src/routes/customerQueryRoutes');
const commonRoutes = require('./src/routes/commonRoutes');
const settingsRoutes = require('./src/routes/settingRoutes');
const authRoutes = require('./src/routes/authRoutes');
const suspiciousActivityRoutes = require('./src/routes/suspiciousActivityRoutes');
const flighRoutes = require('./src/routes/flightRoutes');
const testRoutes = require('./src/routes/testRoutes');

const cors = require('cors');
const app = express();
const PORT = process.env.NOD_PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use(passport.initialize());
// app.use(passport.session());

app.use('/user' , userRoutes);
app.use('/blog' , blogRoutes);
app.use('/faq' , faqRoutes);
app.use('/activity' , activityRoutes);
app.use('/query' , customerQueryRoutes);
app.use('/common' , commonRoutes);
app.use('/settings' , settingsRoutes);
app.use('/activity' , suspiciousActivityRoutes);
app.use('/flight' , flighRoutes );
app.use('/auth' , authRoutes);
app.use('/test' , testRoutes);

app.listen( PORT , () => {
    cronJobs();
    console.log(`App is listening at port: ${PORT}`)
})