const express = require("express");
const app = express();
const port = 3000;

//Middleware to parse JSON requests
app.use(express.json());

//Access to static files from 'public' folder
app.use(express.static("public"));

//Sending reservation form inputs from frontend to backend 
app.post("/reserve", (request, response) => {
    console.log(request.body); //Logging reservation form inputs in console
    response.json({ message: "Reservation confirmed!" }); //Sending confirmation response back to frontend
});

//Starting a server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
