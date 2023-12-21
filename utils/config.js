if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}
module.exports = {
    PORT: process.env.PORT,
    DB: process.env.DB_URI,
    SECRET: process.env.JWT_SECRET_KEY,
};