const dotenv = require("dotenv");
const {connection} = require("./config");
const express = require("express");
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

dotenv.config();

const getMenuItems = (request, response) => {
    connection.query("SELECT * FROM Menu", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    })
}

const postMenuItems = (request, response) => {
    const {foodname, price, description, availability} = request.body;
    connection.query("INSERT INTO Menu(foodname, price, description, availability) VALUES (?,?,?,?) ", 
    [foodname, price, description, availability],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Menu Item Added":results.affectedRows});
    })
}

const deleteMenuItems = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from Menu where id = ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Menu Item Deleted":results.affectedRows});
    })
}


app.route("/menuItems")
.get(getMenuItems)
.post(postMenuItems)

app.route("/menuItems/:id")
.delete(deleteMenuItems)



app.listen(process.env.PORT||11000,() =>{
    console.log("Server is running")
})

module.exports = app;