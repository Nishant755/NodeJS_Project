const { query } = require('express');
const express = require('express');//Express FrameWork
const connection = require('../connection');//Import 
const router = express.Router();


//.....................................................[Rest API].........................................................


//Post API
router.post('/create', (req, res, next) => {
    let employ = req.body;
    // console.log(employ)
    const query = 'INSERT INTO ?? (name, age, address, city, state, employ_id, gender, Salary) values(?,?,?,?,?,?,?,?)';
    connection.query(query, ['employ', employ.name, employ.age, employ.address, employ.city, employ.state, employ.employ_id, employ.gender, employ.Salary], (err, result) => {
        if (!err) {
            return res.status(201).json({ message: "employ Register sucessfully" })
        }
        else {
            res.status(500).json(err)
        }
    })
})


//.....................................................................................................................


//Get API
router.get('/Get', (req, res, next) => {
    const query = "SELECT * FROM entity.employ"
    connection.query(query, (error, result) => {
        if (!error) {
            if (result == 0) {
                return res.status(400).send({ status: false, message: "No data exsist" })
            } else {
                return res.status(200).json(result);
            }
        } else {
            res.status(500).json(err)
        }
    })
})


//.....................................................................................................................


//get by id
router.get('/Get/:id', (req, res, next) => {
    let id = req.params.id
    connection.query(`SELECT * FROM entity.employ WHERE id = ${id}`, (err, result) => {
        if (err) {
            //   console.log("error: ", err);
            return res.status(500).send(err.message);
        } else {
            // console.log("Rechinghere : ", result)
            if (result.length == 0) {
                return res.status(400).json({ message: "Requested fail" })
            }
            else {
                return res.status(200).send({ result })
            }
        }

    });
});



//.....................................................................................................................

//Update by id  API
router.patch('/update/:id', (req, res, next) => {
    const id = req.params.id;
    let employ = req.body;
    var query = "update employ set name=?,age=?,address=?,city=?,state=?,employ_id=?,gender=? where id=?";
    connection.query(query, [employ.name,
    employ.age,
    employ.address,
    employ.city,
    employ.state,
    employ.employ_id,
    employ.gender, id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "ID doesnot found" });

            } else { return res.status(200).json({ message: "employ details Updated Sucessfully" }) }
        } else {
            res.status(500).json(err)
        }
    })

})


//.....................................................................................................................


//delete by ID
router.delete('/Delete/:id', (req, res, next) => {
    const id = req.params.id;
    var query = "delete from employ where id=?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "ID doesnot found" })
            }
            else { return res.status(200).json({ message: "Employ details Deleted Sucessfully" }) }
        } else {
            res.status(500).json(err)
        }
    })
})

//.....................................................................................................................

//Delete All 
router.delete('/DeleteALL', (req, res, next) => {
    let query = 'delete from employ';
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "All employes Deleted Sucessfully" })
        } else {

        }
    })
})

//.....................................................................................................................


//Axious Call
const axios = require('axios');
const config = require('../config/config');
router.post('/convert', async function (req, res) {
    const { q, sl, tl } = req.body

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${q}`

    const response = await axios.get(url)
    const Inhindi = response.data[0][0][0]
    return res.json({
        q,
        Inhindi
    })
})

//.....................................................................................................................



module.exports = router