//Retrieving table body from HTML
const tableBody = document.getElementById("tableBody");

//Function to show all reservations
async function showReservations() {
    const response = await fetch("/allReservations"); //Getting reservations from backend

    //Converting backend JSON response to JavaScript object
    const responseData = await response.json();

    //Removing existing rows before displaying updated rows
    tableBody.innerHTML = "";

    //Loop to go through each reservation
    responseData.forEach(reservation => {
        const row = document.createElement("tr"); //Creating a new row

        //Specifying column contents
        row.innerHTML = `
            <td>${reservation.service}</td>
            <td>${reservation.specialist}</td>
            <td>${reservation.date}</td>
            <td>${reservation.time}</td>
            <td>${reservation.name}</td>
            <td>
                <button onclick="deleteReservation(${reservation.id})">Delete</button>
            </td>
        `;
        //Adding a deletion button to the table

        //Adding row to tableBody
        tableBody.appendChild(row);
    });
}

//Function to delete reservation by id
async function deleteReservation(id) {

    //Sending delete request to backend
    const response = await fetch(`/deleteReservation/${id}`, {
        method: "DELETE"
    });

    //Converting backend JSON response to JavaScript object
    const responseData = await response.json();

    //Displaying deletion confirmation message 
    document.getElementById("deletionConfirmation").innerText = responseData.message;

    //Refreshing rows to stop displaying deleted rows
    showReservations();
}

//Executing the defined function
showReservations(); 
