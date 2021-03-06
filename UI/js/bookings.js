let route = "https://senditparcel.herokuapp.com/api";

let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

// Set username on topnav
function userget(){
    document.getElementById('current-user').innerHTML = current_user;
  }



//Function for searching
fetch("https://senditparcel.herokuapp.com/api/admin/v2/bookings",{
    method: "GET",
    headers: {
        "Content-Type":"application/json",
        "Accept":"applicaton/json",
        "Authorization":access_token
    },
})
.then((response) =>{
    response.json().then((book)=>{
        console.log(book)
        if (book.message == 'Internal Server Error'){
            window.location.replace("login.html")
        }

        book = book["book"]
        let output = `
        <table id="NewTable">
        <tr class="header">
        <th style="width:20%;">bookingref</th>
        <th style="width:25%;">car_number</th>
        <th style="width:25%;">Name</th>
        <th style="width:25%;">From</th>
        <th style="width:25%;">To</th>
        <th style="width:25%;">price</th>
        <th style="width:25%;">quality</th>
        <th style="width:30%;">dates</th>
        <th style="width:30%;">total</th>
        <th style="width:30%;">Status</th>
        <th style="width:30%;">Booked No</th>
        <th style="width:30%;"></th>
        <th style="width:30%;"></th>
        `;

        Object.keys(book).forEach(function(sendt){
            let  bookingref = book[sendt]["bookingref"];
            let car_number = book[sendt]["car_number"];
            let username = book[sendt]["username"];
            let from_location = book[sendt]["from_location"];
            let to_location = book[sendt]["to_location"];
            let price = book[sendt]["price"];
            let quality = book[sendt]["quality"];
            let dates = book[sendt]["dates"];
            let total = book[sendt]["total"];
            let status = book[sendt]["status"];
            let created_on = book[sendt]["created_on"];

            output +=`

            <tr>
            <td>${book[sendt]["bookingref"]}</td>
            <td>${book[sendt]["car_number"]}</td>
            <td>${book[sendt]["username"]}</td>
            <td>${book[sendt]["from_location"]}</td>
            <td>${book[sendt]["to_location"]}</td>
            <td>${book[sendt]["price"]}</td>
            <td>${book[sendt]["quality"]}</td>
            <td>${book[sendt]["dates"]}</td>
            <td>${book[sendt]["total"]}</td>
            <td>${book[sendt]["status"]}</td>
            <td>${book[sendt]["created_on"]}</td>
            
            <td><button style="color: #ffffff; background-color:#00C851; font-size: 18px;  border: none;
           "id="myBtn6" value="Edit" onclick="viewSingle(${book[sendt]["book_id"]})">Show</button></td>`;
        })
        document.getElementById("showsbookings").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


function viewSingle(book_id){
    fetch("https://senditparcel.herokuapp.com/api/admin/v2/booking/"+book_id,{
    method: "GET",
    headers: {
        "Content-Type":"application/json",
        "Accept":"applicaton/json",
        "Authorization":access_token
    },
    })
    .then((res)=>res.json())
    .then((data)=>{

    data = data["data"];
    console.log(data)

    let show = `


    `;
    Object.keys(data).forEach(function(searchme){
        let bookingref = data[searchme]["bookingref"]
        let car_number = data[searchme]["car_number"];
        let username = data[searchme]["username"];
        let from_location = data[searchme]["from_location"];
        let to_location = data[searchme]["to_location"];
        let price = data[searchme]["price"];
        let quality = data[searchme]["quality"];
        let dates = data[searchme]["dates"];
        let total = data[searchme]["total"];
        let status = data[searchme]["status"];
        let created_on = data[searchme]["created_on"];

        show +=`
        
        <b>Serial</b> ${data[searchme]["bookingref"]}</br>
        <b>Car Number </b>${data[searchme]["car_number"]}</br>
        <b>Customer Name</b> ${data[searchme]["username"]}</br>
        <b>From</b> ${data[searchme]["from_location"]}</br>
        <b>To</b> ${data[searchme]["to_location"]}</br>
        <b>Price </b>${data[searchme]["price"]}</br>
        <b>Quantity </b>${data[searchme]["quality"]}</br>
        <b> Travel Date</b> ${data[searchme]["dates"]}</br>
        <b> Total</b> ${data[searchme]["total"]}</br>
        <b>Status</b> ${data[searchme]["status"]}</br>
        <b>Booked Date</b> ${data[searchme]["created_on"]}</br>

        `;
        
        })
        document.getElementById("showme").innerHTML = show 
        modal6.style.display = "block";


    })
    .catch(error => console.log('error:',error));
    }

