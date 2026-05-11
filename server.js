const express = require("express");
const db = require("./database");
const app = express();
const port = 3000;

//Middleware to parse JSON requests
app.use(express.json());

//Access to static files from 'public' folder
app.use(express.static("public"));

//Sending reservation form inputs from frontend to backend 
app.post("/reserve", (request, response) => {

    //Retrieving reservation form inputs from request body
    const { service, specialist, date, time, name } = request.body;

    //SQL statement to insert the reservation form inputs into database
    const sql = `
        INSERT INTO reservations (service, specialist, date, time, name) 
        VALUES (?, ?, ?, ?, ?)
    `;

    //Executing SQL insert statement
    db.run(sql, [service, specialist, date, time, name], function (error) {

        //Database error handling
        if (error) {
            console.error(error.message);
            return response.json({ message: "Database error" }); //Sending error response back to frontend
        }

        response.json({ message: "Reservation confirmed!" }); //Sending confirmation response back to frontend
    });
});

//Starting a server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});