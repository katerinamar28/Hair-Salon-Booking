//Retrieving reservation form from HTML
const reservation = document.getElementById("reservation");

//Retrieving specialist, date and time selection from HTML reservation form
const selectedSpecialist = document.getElementById("specialist");
const selectedDate = document.getElementById("date");
const selectedTime = document.getElementById("time");

//Separating today's date from time, formatting in “YYYY-MM-DD” format
const today = new Date().toISOString().split("T")[0];

//Preventing calendar from allowing selection of past dates
selectedDate.setAttribute("min", today);

//Function to check reserved times
async function checkAvailability() {

    //Retrieving values from user input fields
    const specialist = document.getElementById("specialist").value;
    const date = document.getElementById("date").value;

    //Sending specialist and date selection to backend
    const response = await fetch(`/reservedTimes?specialist=${specialist}&date=${date}`);

    //Converting backend JSON response to JavaScript object
    const responseData = await response.json();

    //Looping through all time options
    for (let i = 0; i < selectedTime.options.length; i++) {

        //Current time option
        const option = selectedTime.options[i];

        //All time slots are allowed at the start of the loop
        option.disabled = false;

        //Looping through all reservations
        responseData.forEach(reservation => {

            //Disabling a time option if it equals time in an existing reservation
            if (option.value == reservation.time) {
                option.disabled = true;
            }
        });
    }
}

//Checking reserved times when specialist or date input changes
selectedSpecialist.addEventListener("change", checkAvailability);
selectedDate.addEventListener("change", checkAvailability);

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