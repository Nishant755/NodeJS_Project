const mysql = require('mysql');
const config = require("./config/config.js")

//.....................................................................................................................


const connection = mysql.createConnection({
    host: config.localhost,
    user: config.user,
    password: config.password,
    database: config.database
})
//.....................................................[connection with Sql Database]................................................................
connection.connect((err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Connect sucessfully with  MYSQL Database")
    }
})
//.....................................................................................................................






module.exports = connection