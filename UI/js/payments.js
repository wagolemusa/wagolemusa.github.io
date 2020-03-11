let route = "https://senditparcel.herokuapp.com/api";

let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

function userget(){
    document.getElementById('current_user').innerHTML = current_user
}

//Function for searching
fetch("https://senditparcel.herokuapp.com/api/v2/admin/paid_with_mpasa",{
    method: "GET",
    headers: {
        "Content-Type":"application/json",
        "Accept":"applicaton/json",
        "Authorization":access_token
    },
})
.then((response) =>{
    response.json().then((bookpesa)=>{
        console.log(bookpesa)
        if (bookpesa.message == 'Internal Server Error'){
            window.location.replace("login.html")
        }
        bookpesa = bookpesa["bookpesa"]
        let output = `
        <h4 class="font-weight-bold" style="color: #1C2331; font-weight: 600; font-family: Georgia, 'Times New Roman', Times, serif;">History Mpesa Payments</h4>
        <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
        <thead>
        <tr>
    <th class="th-sm">Reciept Number</th>
    <th class="th-sm">Car Number</th>
    <th class="th-sm">From</th>
    <th class="th-sm">To</th>
    <th class="th-sm">Price</th>
    <th class="th-sm">Quantity</th>
    <th class="th-sm">Amount</th>
    <th class="th-sm">Booked On</th>
    <th class="th-sm">Paid On</th>
    <th class="th-sm">Status</th> `;

        Object.keys(bookpesa).forEach(function(sendt){

            output +=`

            <tr>
            <td>${bookpesa[sendt]["bookingref"]}</td>
            <td>${bookpesa[sendt]["car_number"]}</td>
            <td>${bookpesa[sendt]["from_location"]}</td>
            <td>${bookpesa[sendt]["to_location"]}</td>
            <td>${bookpesa[sendt]["price"]}</td>
            <td>${bookpesa[sendt]["quality"]}</td>
            <td>${bookpesa[sendt]["amount"]}</td>
            <td>${bookpesa[sendt]["dates"]}</td>
            <td>${bookpesa[sendt]["created_on"]}</td>
            <td><button type="button" class="btn btn-success">${bookpesa[sendt]["status"]}</td>

           </tr> `;
        })
        document.getElementById("showsearch").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


// function query payments by ID
function viewSingle(payment_id){
    fetch("https://senditparcel.herokuapp.com/api/v2/payments/"+payment_id,{
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


// Fetching from bookings where payed by cash
fetch("https://senditparcel.herokuapp.com/api/v2/book",{
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

       <table id="tablePreview" class="table table-striped table-hover table-borderless">
        <thead>
        <tr>
        <th>bookingref</th>
        <th>car_number</th>
        <th>From</th>
        <th>To</th>
        <th>price</th>
        <th>quality</th>
        <th>dates</th>
        <th>total</th>
        <th>Booked No</th>
        <th>Payemnts Status</th>

        </tr>
        </thead>
        `;

        Object.keys(book).forEach(function(sendt){

            output +=`

            <tr>
            <td>${book[sendt]["bookingref"]}</td>
            <td>${book[sendt]["car_number"]}</td>
            <td>${book[sendt]["from_location"]}</td>
            <td>${book[sendt]["to_location"]}</td>
            <td>${book[sendt]["price"]}</td>
            <td>${book[sendt]["quality"]}</td>
            <td>${book[sendt]["dates"]}</td>
            <td>${book[sendt]["total"]}</td>
            <td>${book[sendt]["created_on"]}</td>
            <td><button type="button" class="btn btn-success">${book[sendt]["payments"]}</td>

           </tr>`;
        })
        document.getElementById("sendthis").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})
