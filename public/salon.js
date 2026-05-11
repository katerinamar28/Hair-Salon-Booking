//Retrieving table body from HTML
const tableBody = document.getElementById("tableBody");

//Function to show all reservations
async function showReservations() {
    const response = await fetch("/allReservations"); //Getting reservations from backend

    //Converting backend JSON response to JavaScript object
    const responseData = await response.json();

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
        `;
        
        //Adding row to tableBody
        tableBody.appendChild(row);
    });
}

//Executing the defined function
showReservations(); 
