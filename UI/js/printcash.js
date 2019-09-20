let route = "https://senditparcel.herokuapp.com/api";

let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

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
        <table id="tablePreview" class="table table-striped table-hover table-borderless">
        <thead>
        <tr>
        <th>Reciept Number</th>
        <th>Car number</th>
        <th>From</th>
        <th>To</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Amount</th>
        <th>Print</th>
        </tr>
        </thead>
        `;

        Object.keys(book).forEach(function(sendt){
 
            output +=`
            <tbody>
            <tr>
            <td>${book[sendt]["bookingref"]}</td>
            <td>${book[sendt]["car_number"]}</td>
            <td>${book[sendt]["from_location"]}</td>
            <td>${book[sendt]["to_location"]}</td>
            <td>${book[sendt]["price"]}</td>
            <td>${book[sendt]["quality"]}</td>
            <td>${book[sendt]["total"]}</td>

            <td><button class="btn btn-default" id="myBtn6" value="Edit" onclick="viewSingle(${book[sendt]["book_id"]})">Print Receipt</button></td> <tbody>`;
        })
        document.getElementById("showsearch").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


// function query payments by ID
function viewSingle(book_id){
    fetch("https://senditparcel.herokuapp.com/api/v2/print/cash/"+book_id,{
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
        <div class="reciept">

        <div class="row">
            <div class="col">
                 <b>Reciept Number :</b> <span>${data[searchme]["bookingref"]}</span  ><br/>
                <b>Car Number :</b> <span>${data[searchme]["car_number"]}</span></br>
                <b>Customer Name :</b> <span>${data[searchme]["username"]}</span></br>
                <b>From :</b> <span>${data[searchme]["from_location"]}</span></br>
                <b>To :</b> <span>${data[searchme]["to_location"]}</span></br>

            </div>
            <div class="col">
                <b>Price : </b> <span>${data[searchme]["price"]} <strong>Ksh</strong></span></br>
                <b>Quantity : </b> <span>${data[searchme]["quality"]}</span></br>
                <b> Amount :</b> <span>${data[searchme]["total"]} <strong>Ksh</strong></span></br>
                <b> Travel Date :</b> <span>${data[searchme]["dates"]}</span></br>
            </div>
            <div class="col">
                <b>Payment Status :</b> <span>${data[searchme]["payments"]}</span></br>
                <b>Booked On :</b> <span>${data[searchme]["created_on"]}</span></br>
            </div>
        </div>
        </div>
        `;
        
        })
        document.getElementById("showme").innerHTML = show 
        modal6.style.display = "block";


    })
    .catch(error => console.log('error:',error));
    }

