const express = require("express");
const app = express();
const path = require("path")
const sequelize = require("./data/dbConnection");
const cookieParser = require('cookie-parser');
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

require("dotenv").config();

//Veritabanı ve ilişkileri
// require("./data/dbConnection");
require("./data/dbRelations");

app.use(cors({origin: '*',credentials: true}));

// const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// app.use(adminRoutes);
app.use(authRoutes);

//Veritabanını modellere göre yeniler

// (async () => {
//   await sequelize.sync({ force: true });
//   await require("./data/dummyData")();
// })();

app.listen(process.env.PORT || 8000, () => {
    console.log(process.env.PORT  || 8000, "portuna bağlandı")
})