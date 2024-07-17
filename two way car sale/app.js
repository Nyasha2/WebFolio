"use strict";

const express = require("express");
const fs = require("fs");
const cors = require('cors');
const multer = require("multer");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(multer().none());
app.use(express.urlencoded({ extended: true}));

const SERVER_ERROR = "There was a problem with the server";
const SERVER_ERROR_CODE = 500;
const CLIENT_ERROR = 'car not found';
const CLIENT_ERROR_CODE = 400;
const PORT_NUMBER = 8000;
const SUCCESS_CODE = 200;
const SUCESS = "SUCCESS!";

app.get("/cars", async function (req, res) {
    try {
        const cars = await getData("cars/cars.json");
        res.json(cars);
    } catch (err) {
        res.status(SERVER_ERROR_CODE).send(SERVER_ERROR);
    }
});

app.get('/cars/:manufacturer/:model', async (req, res) => {
    try {
        const cars = await getData("cars/cars.json");
        let car;
        cars.forEach(one => {
            if (one.Manufacturer.toLowerCase() === 
            req.params.manufacturer.toLowerCase() &&
            one.Model.toLowerCase() === req.params.model.toLowerCase()) {
                car = one;
            }
        });
        res.json(car);
    } catch (err) {
        res.status(CLIENT_ERROR_CODE).send(CLIENT_ERROR);
    }
});

app.get('/cars/:manufacturer', async (req, res) => {
    try {
        const cars = await getData("cars/cars.json");
        let models = [];
        cars.forEach(one => {
            if (one.Manufacturer.toLowerCase() === 
            req.params.manufacturer.toLowerCase()) {
                models.push(one);
            }
        });
        res.json(models);
    } catch (err) {
        res.status(CLIENT_ERROR_CODE).send(CLIENT_ERROR);
    }
});

app.get("/car-names", async function (req, res) {
    try {
        const cars = await getData("cars/cars.json");
        let names = [];
        cars.forEach((car) => {
            if (!names.includes(car.Manufacturer)){
                names.push(car.Manufacturer);
            } 
        });
        res.json(names);
    } catch (err) {
        res.status(SERVER_ERROR_CODE).send(SERVER_ERROR);
    }
});

const getData = async (file_path) => {
    try {
        let data = await fs.promises.readFile(file_path, 'utf8');
        data = JSON.parse(data);
        return data;
    } catch(err) {
        res.status(SERVER_ERROR_CODE).send(SERVER_ERROR);
    }  
};

//fetching the FAQs
app.get("/faqs", async function(req, res) {
    try {
        const faqs = await getData("questions/faqs.json");
        res.json(faqs);

    } catch {
        res.status(SERVER_ERROR_CODE).send(SERVER_ERROR);
    }
});

//posting questions
app.post("/message", async function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;
    
    let jsonMessage = {
        name : name,
        email: email,
        message: message,
    };

    try {
        let data = [];
        let file = await fs.promises.readFile("questions/questions.json", 'utf8');
        if (file) {
            data = JSON.parse(file);
        }
        data.push(jsonMessage);
        await fs.promises.writeFile("questions/questions.json", JSON.stringify(data, null, 2), 'utf8');
        res.status(SUCCESS_CODE).send(SUCESS);
    } catch(err) {
        res.status(SERVER_ERROR_CODE).send(err);
    }
});

//adding an order
app.post("/order", async function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let address = req.body.address;
    let creditCard = req.body.credit;
    let zipCode = req.body.zip;
    let order = req.body.order;
    
    let jsonMessage = {
        name : name,
        email: email,
        address : address,
        credit_card_number : creditCard,
        zip_code : zipCode,
        order : order
    };

    try {
        let data = [];
        let file = await fs.promises.readFile("orders/orders.json", 'utf8');
        if (file) {
            data = JSON.parse(file);
        }
        data.push(jsonMessage);
        await fs.promises.writeFile("orders/orders.json", JSON.stringify(data, null, 2), 'utf8');
        res.status(SUCCESS_CODE).send(SUCESS);
    } catch(err) {
        res.status(SERVER_ERROR_CODE).send(err);
    }
});

const PORT = process.env.PORT || PORT_NUMBER;
app.listen(PORT);

