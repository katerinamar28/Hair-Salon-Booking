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

            //Special error message when double booking is prevented 
            if (error.message.includes("UNIQUE constraint failed")) {
                return response.json({ message: "This reservation time is already booked" });
            }
            return response.json({ message: "Database error" }); //Error message for other errors
        }

        response.json({ message: "Reservation confirmed!" }); //Reservation confirmation message
    });
});

//Retrieving all reservations
app.get("/allReservations", (request, response) => {

    //SQL statement to select all rows and columns in reservations table
    const sql = `
        SELECT * FROM reservations
    `;

    //Executing SQL SELECT statement
    db.all(sql, [], function (error, rows) {

        //Database error handling
        if (error) {
            console.error(error.message);
            return response.json({ message: "Database error" }); //Sending error response back to frontend
        }

        response.json(rows); //Sending reservation data back to frontend
    });
});

//Deleting reservation by id
app.delete("/deleteReservation/:id", (request, response) => {

    //Retrieving reservation id from delete request
    const reservationId = request.params.id;

    //SQL statement to delete reservation by its id
    const sql = `
       DELETE FROM reservations
       WHERE id = ?
   `;

    //Executing SQL DELETE statement
    db.run(sql, [reservationId], function (error) {

        //Database error handling
        if (error) {
            console.error(error.message);
            return response.json({ message: "Database error" }); //Error response back to frontend
        }

        response.json({ message: "Reservation deleted!" }); //Deletion confirmation message
    });
});

//Starting a server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});