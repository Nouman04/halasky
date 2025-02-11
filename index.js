const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./src/routes/UserRoutes");
const blogRouter = require("./src/routes/BlogRoutes");
const settingsRouter = require("./src/routes/settingRoutes");
const faqRouter = require("./src/routes/faqRoutes");
const activityRouter = require("./src/routes/communityActivityRoutes");
const customerQueryRouter = require("./src/routes/customerQueryRoutes");
const commonRouter = require("./src/routes/commonRoutes");
const cors = require("cors");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3005;

app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/faq", faqRouter);
app.use("/settings", settingsRouter);
app.use("/activity", activityRouter);
app.use("/query", customerQueryRouter);
app.use("/common", commonRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
