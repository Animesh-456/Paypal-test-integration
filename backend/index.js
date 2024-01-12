import { RandomData } from './schema.js';
import Connection from './db.js';
import fs from 'fs';
import cors from 'cors';
import express from 'express';
import dotenv from "dotenv"

import paypal from "@paypal/checkout-server-sdk"
import bodyParser from 'body-parser';

const clientId = "AT_5r1CUj-A5aDvr-MjLuZNTfIdxJYdCuQlpF8GVq9HRvL-IjEjQMAm1ITlFZjdhBKOXt8eDdo2zTitG";
const clientSecret = "EDpe6zEf4tl7NYza6B8HuwB6cwRmUglcXxiHK8uFA1Y7QeeoAZRE0YRY_5vMlzy_0ppxinAVxbQGZC87";
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// paypal.configure({
//     mode: 'sandbox', // Change to 'live' for production
//     client_id: 'AT_5r1CUj-A5aDvr-MjLuZNTfIdxJYdCuQlpF8GVq9HRvL-IjEjQMAm1ITlFZjdhBKOXt8eDdo2zTitG',
//     client_secret: 'EDpe6zEf4tl7NYza6B8HuwB6cwRmUglcXxiHK8uFA1Y7QeeoAZRE0YRY_5vMlzy_0ppxinAVxbQGZC87',
// });
dotenv.config();

Connection();
const app = express();

app.use(cors());
app.use(express.json());

app.post('/getrandomdata', async (req, res) => {

    let request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: "CAPTURE",

        purchase_units: [{

            amount: {
                currency_code: "USD",
                value: 1.6, // 
                breakdown: {
                    item_total: {
                        currency_code: "USD",
                        value: 1.6,
                    }
                },
            }
        },],
    });

    const response = await client.execute(request);
    console.log(response.result.id)
    res.json({ id: response.result.id })

})


app.post("/api/paypal-transaction-complete", async (req, res) => {

    console.log(req.body.key1.orderID)
    const orderID = req.body.key1.orderID;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    try {
        const capture = await client.execute(request);
        console.log(`Response: ${JSON.stringify(capture)}`);
        console.log(`Capture: ${JSON.stringify(capture.result)}`);
        const result = capture.result;
        const resJson = {
            result
        };
        res.json(resJson);
        // return capture.result;
    } catch (err) {
        // Handle any errors from the call
        console.error(err);
        return res.send(500);
    }
});


app.post("/adddata", async (req, res) => {
    const jsonData = fs.readFileSync('jsondata.json', 'utf8');

    // Parse the JSON data
    const data = JSON.parse(jsonData);

    console.log("the data is :-", data)


    let response = await RandomData.insertMany(data)

    res.status(201).json(response)

})


app.listen(4000, () => console.log("Server started at port 4000"));



