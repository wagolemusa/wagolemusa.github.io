let route = "https://senditparcel.herokuapp.com/api";

let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

//Function for searching
fetch("https://senditparcel.herokuapp.com/api/admin/v2/payments/query",{
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
        <th style="width:25%;">From</th>
        <th style="width:25%;">To</th>
        <th style="width:25%;">Price</th>
        <th style="width:25%;">Quantity</th>
        <th style="width:30%;">Amount</th>
        <th style="width:30%;">Phone</th>
        <th style="width:30%;">Booked On</th>
        <th style="width:30%;">Paid On</th>
        <th style="width:30%;">Status</th>

        <th style="width:30%;">Print</th>
        `;

        Object.keys(book).forEach(function(sendt){
            let  bookingref = book[sendt]["bookingref"];
            let car_number = book[sendt]["car_number"];
            let from_location = book[sendt]["from_location"];
            let to_location = book[sendt]["to_location"];
            let price = book[sendt]["price"];
            let quality = book[sendt]["quality"];
            let amount = book[sendt]["amount"];
            let phone = book[sendt]["phone"];
            let dates = book[sendt]["dates"];
            let created_on = book[sendt]["created_on"];
            let status = book[sendt]["status"];
            output +=`

            <tr>
            <td>${book[sendt]["bookingref"]}</td>
            <td>${book[sendt]["car_number"]}</td>
            <td>${book[sendt]["from_location"]}</td>
            <td>${book[sendt]["to_location"]}</td>
            <td>${book[sendt]["price"]}</td>
            <td>${book[sendt]["quality"]}</td>
            <td>${book[sendt]["amount"]}</td>
            <td>${book[sendt]["phone"]}</td>
            <td>${book[sendt]["dates"]}</td>
            <td>${book[sendt]["created_on"]}</td>
            <td>${book[sendt]["status"]}</td>

            <td><button style="color: #ffffff; background-color:#00C851; font-size: 18px;  border: none;
           "id="myBtn6" value="Edit" onclick="viewSingle(${book[sendt]["payment_id"]})">Show</button></td>`;
        })
        document.getElementById("showsearch").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


// function query payments by ID
function viewSingle(payment_id){
    fetch("https://senditparcel.herokuapp.com/api/admin/v2/query/"+payment_id,{
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
        let amount = data[searchme]["amount"];
        let phone = data[searchme]["phone"];
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
        <b> Amount</b> ${data[searchme]["amount"]}</br>
        <b> Phone Number</b> ${data[searchme]["phone"]}</br>
        <b>Status</b> ${data[searchme]["status"]}</br>
        <b>Paid On</b> ${data[searchme]["created_on"]}</br>

        `;
        
        })
        document.getElementById("showme").innerHTML = show 
        modal6.style.display = "block";


    })
    .catch(error => console.log('error:',error));
    }

