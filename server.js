const express = require("express");
const app = express();
const port = 3000;

//Access to static files from 'public' folder
app.use(express.static("public"));

//Starting a server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
