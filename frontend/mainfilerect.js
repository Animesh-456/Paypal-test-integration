import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
const Dashboard = () => {
    const [orderId, setOrderId] = useState(null)

    const handlePaymentSuccess = async (details, data, amount) => {
        try {
            // Send payment details to your backend for processing and saving
            const response = await axios.post('http://localhost:4000/getrandomdata', { body: data });

            console.log('Payment processed on the backend:', response.data);
            // Add any frontend actions after successful payment processing
        } catch (error) {
            console.error('Error processing payment on the backend:', error);
            // Handle error on the frontend as needed
        }
    };


    const createOrder = async () => {
        // return fetch(`http://localhost:4000/getrandomdata`, {
        //     method: "POST",
        //     //body: JSON.stringify(cartData),
        //     headers: {
        //         "content - type": 'application / json',
        //     },
        // })
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .catch(() => {
        //         alert("Error encountered");
        //     })
        //     .then((data) => {
        //         return data.orderID; // make sure to use the same key name for order ID on the client and server
        //     });



        const response = await axios.post('http://localhost:4000/getrandomdata');
        return response.data.id
        // alert(response.data.id)
    };
    const onApprove = async (data) => {
        // return fetch(`http://localhost:4000/api/paypal-transaction-complete`, {
        //     headers: {
        //         "content-type": "application/json",
        //     },
        //     method: "POST",
        //     body: JSON.stringify({
        //         orderID: data.orderID,
        //     }),
        // })
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .catch((details) => {
        //         alert(details)
        //     })
        //     .then((details) => {
        //         const { result } = details;
        //         const { id, payer, purchase_units } = result;
        //         const transactionId = purchase_units[0].payments.captures[0].id;
        //         const transactionDate =
        //             purchase_units[0].payments.captures[0].create_time;
        //         const name = payer.name.given_name + payer.name.surname;
        //         const email = payer.email_address;
        //         const address = payer.address.country_code;
        //         const transactionAmount =
        //             purchase_units[0].payments.captures[0].amount.value;
        //         console.log("Successful payment");
        //         alert("Successfull Payment !")
        //         // return history.push({
        //         //     pathname: `/success/${purchase_units[0].payments.captures[0].id}`,
        //         //     state: {
        //         //         transactionDate: transactionDate,
        //         //         transactionId: transactionId,
        //         //         name: name,
        //         //         email: email,
        //         //         address: address,
        //         //         transactionAmount: transactionAmount,
        //         //     },
        //         // });
        //     });

        console.log("approve is:-", data)

        const dataToSend = {
            key1: data
        };

        const response = await axios.post('http://localhost:4000/api/paypal-transaction-complete', dataToSend);

        console.log(response.data)
        alert("OK")
    };


    return (
        <div>
            <head>
                <script src="https://www.paypal.com/sdk/js?client-id=AT_5r1CUj-A5aDvr-MjLuZNTfIdxJYdCuQlpF8GVq9HRvL-IjEjQMAm1ITlFZjdhBKOXt8eDdo2zTitG"></script>
            </head>
            <PayPalButton
                createOrder={createOrder}
                onApprove={onApprove}
            ></PayPalButton>
        </div>


    )
};

export default Dashboard;
