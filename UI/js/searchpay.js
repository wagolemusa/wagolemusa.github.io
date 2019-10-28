let route = "https://senditparcel.herokuapp.com/api";

let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

// Set username on topnav
function userget(){
    document.getElementById('current-user').innerHTML = current_user;
  }

//Function for searching
document.getElementById("submit").addEventListener("click",
function searchfetch(event){
    event.preventDefault()
    let url = route +"/v2/admin/search/pay"
    let bookingref = document.forms["search"]["bookingref"].value;

    if(isNaN(bookingref)){
        window.alert("Fill in only numbers");
 
    }
    let data = {bookingref:bookingref};
    fetch (url, {method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":access_token
    },
    body:JSON.stringify(data)
})
.then((res)=>res.json())
.then((data)=>{
    document.getElementById("reg").innerText = data["message"];
    
    if (data.message == 'Internal Server Error'){
        window.location.replace("login.html")
    }
    // else{
        data = data["data"];
        console.log(data)
        let output = `
        <table id="tablePreview" class="table table-striped table-hover table-borderless">
        <thead>
        <tr>
        <th>Receipt NO</th>
        <th>car_number</th>
        <th>Username</th>
        <th>From</th>
        <th>To</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Travel Date</th>
        <th>Total</th>
        <th>Status</th>
        <th>Booked No</th>
        <th></th>
        </tr>
        </thead>
        `;
        Object.keys(data).forEach(function(searchme){

            output +=`
            <tr>
            <td>${data[searchme]["bookingref"]}
            <td>${data[searchme]["car_number"]}</td>
            <td>${data[searchme]["username"]}</td>
            <td>${data[searchme]["from_location"]}</td>
            <td>${data[searchme]["to_location"]}</td>
            <td>${data[searchme]["price"]}</td>
            <td>${data[searchme]["quality"]}</td>
            <td>${data[searchme]["dates"]}</td>
            <td>${data[searchme]["amount"]}</td>
            <td>${data[searchme]["status"]}</td>
            <td>${data[searchme]["created_on"]}</td>
            
            <td><button type="button" class="btn btn-success"
           "id="myBtn6" value="Edit" onclick="viewSingle(${data[searchme]["payment_id"]})">Print Recient</button></td>`;
        })
        document.getElementById("searchpay").innerHTML = output + `</table>`;
            // if (data){
    //     document.getElementById("reg").innerText = data["message"];

    // }
    // }

})
.catch(error => console.log('error:',error));
});




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
                <b> Amount :</b> <span>${data[searchme]["amount"]} <strong>Ksh</strong></span></br>
                <b> Phone Number :</b> <span>${data[searchme]["phone"]}</span></br>
                <b> Travel Date :</b> <span>${data[searchme]["dates"]}</span></br>
            </div>
            <div class="col">
                <b>Status :</b> <span>${data[searchme]["status"]}</span></br>
                <b>Mpesa Status :</b> <span>${data[searchme]["mpesa_reciept"]}</span></br>
                <b>Message Recieved :</b> <span>${data[searchme]["resultdesc"]}</span></br>
                <b>Paid On :</b> <span>${data[searchme]["created_on"]}</span></br>
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

