//Retrieving 'reservation' form from HTML
const reservation = document.getElementById("reservation");

//Listening for form submission 
reservation.addEventListener("submit", function (event) {
    event.preventDefault(); //Inputs will not reset after submitting form

    //Retrieving values from user input fields
    const service = document.getElementById("service").value;
    const specialist = document.getElementById("specialist").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const name = document.getElementById("name").value;

    //User input values shown in console
    console.log({ service, specialist, date, time, name });

    //Confirmation message to user after submitting reservation
    document.getElementById("confirmation").innerText = "Reservation confirmed!";
});

