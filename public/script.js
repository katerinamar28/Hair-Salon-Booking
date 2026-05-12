//Retrieving reservation form from HTML
const reservation = document.getElementById("reservation");

//Retrieving date selection from HTML reservation form
const selectedDate = document.getElementById("date");

//Separating today's date from time, formatting in “YYYY-MM-DD” format
const today = new Date().toISOString().split("T")[0];

//Preventing calendar from allowing selection of past dates
selectedDate.setAttribute("min", today);

//Listening for form submission 
reservation.addEventListener("submit", async function (event) {
    event.preventDefault(); //Inputs will not reset after submitting form

    //Retrieving values from user input fields
    const service = document.getElementById("service").value;
    const specialist = document.getElementById("specialist").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const name = document.getElementById("name").value;

    //Sending reservation form inputs to backend with POST request 
    const response = await fetch("/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //Specifying JSON format
        body: JSON.stringify({ service, specialist, date, time, name }) //Converting JavaScript object to JSON string 
    });

    //Converting backend JSON response to JavaScript object
    const responseData = await response.json();

    //Displaying reservation confirmation message to user from backend
    document.getElementById("confirmation").innerText = responseData.message;
});

