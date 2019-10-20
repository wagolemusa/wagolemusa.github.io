let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

// Fetch all data for Success payments

fetch("https://senditparcel.herokuapp.com/api/v2/admin/success/client",{
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
    <th>Car Number</th>
    <th>From</th>
    <th>To</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Amount</th>
    <th>Phone</th>
    <th>Booked On</th>
    <th>Paid On</th>
    <th>Status</th> 
    </tr>
    </thead>`;

        Object.keys(book).forEach(function(sendt){

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
            <td><button type="button" class="btn btn-success">${book[sendt]["status"]}</button></td>

           </tr> `;
        })
        document.getElementById("successpayements").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


// Fetch all data for Failed payments
fetch("https://senditparcel.herokuapp.com/api/v2/admin/faild/client",{
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
    <th>Car Number</th>
    <th>From</th>
    <th>To</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Amount</th>
    <th>Phone</th>
    <th>Booked On</th>
    <th>Paid On</th>
    <th>Status</th> 
    </tr>
    </thead>`;

        Object.keys(book).forEach(function(sendt){

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
            <td><button type="button" class="btn btn-danger">${book[sendt]["status"]}</button></td>

           </tr> `;
        })
        document.getElementById("failedpayments").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


// Fetch all successfull Desktop payments Done Via M-pesa
fetch("https://senditparcel.herokuapp.com/api/v2/admin/succes/desk",{
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
    <th>Car Number</th>
    <th>From</th>
    <th>To</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Amount</th>
    <th>Phone</th>
    <th>Booked On</th>
    <th>Paid On</th>
    <th>Status</th> 
    </tr>
    </thead>`;

    Object.keys(book).forEach(function(sendt){

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

       </tr> `;
        })
        document.getElementById("payed").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


// Fetch all Failed Desktop payments Done Via M-pesa
fetch("https://senditparcel.herokuapp.com/api/v2/admin/faild/desk",{
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
    <th>Car Number</th>
    <th>From</th>
    <th>To</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Amount</th>
    <th>Phone</th>
    <th>Booked On</th>
    <th>Paid On</th>
    <th>Status</th> 
    </tr>
    </thead>`;

    Object.keys(book).forEach(function(sendt){

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
        <td><button type="button" class="btn btn-danger">${book[sendt]["status"]}</button></td>

       </tr> `;
        })
        document.getElementById("nomaney").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})




//Function Queries all cash payments
fetch("https://senditparcel.herokuapp.com/api/v2/admin/cash/desktop",{
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
        <th>Status</th>
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
            <td>${book[sendt]["quantiy"]}</td>
            <td>${book[sendt]["amount"]}</td>
            <td><button type="button" class="btn btn-success">${book[sendt]["payments"]}</button></td>
            `;

        })
        document.getElementById("showsearch4").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


//Function data for client data payed Cash
fetch("https://senditparcel.herokuapp.com/api/v2/admin/cash/client",{
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
        <th>Paid On</th>
        <th>Status</th>
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
            <td>${book[sendt]["created_on"]}</td>
            <td><button type="button" class="btn btn-success">${book[sendt]["payments"]}</button></td>


            `;

        })
        document.getElementById("cash").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})
