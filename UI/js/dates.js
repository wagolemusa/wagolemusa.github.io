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
    let url = route +"/v2/search/date"
    let dates = document.forms["search"]["dates"].value;
    let data = {dates:dates};
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
        <table id="NewTable">
        <th style="width:20%;">Unique</th>
        <th style="width:25%;">car_number</th>
        <th style="width:25%;">From</th>
        <th style="width:25%;">To</th>
        <th style="width:25%;">price</th>
        <th style="width:25%;">quality</th>
        <th style="width:30%;">dates</th>
        <th style="width:30%;">total</th>
        <th style="width:30%;">Status</th>
        <th style="width:30%;">Booked No</th>
        <th style="width:30%;"></th>
        `;
        Object.keys(data).forEach(function(searchme){
            let bookingref = data[searchme]["bookingref"]
            let car_number = data[searchme]["car_number"];
            let from_location = data[searchme]["from_location"];
            let to_location = data[searchme]["to_location"];
            let price = data[searchme]["price"];
            let quality = data[searchme]["quality"];
            let dates = data[searchme]["dates"];
            let total = data[searchme]["total"];
            let status = data[searchme]["status"];
            let created_on = data[searchme]["created_on"];

            output +=`
            <tr>
            <td>${data[searchme]["bookingref"]}
            <td>${data[searchme]["car_number"]}</td>
            <td>${data[searchme]["from_location"]}</td>
            <td>${data[searchme]["to_location"]}</td>
            <td>${data[searchme]["price"]}</td>
            <td>${data[searchme]["quality"]}</td>
            <td>${data[searchme]["dates"]}</td>
            <td>${data[searchme]["total"]}</td>
            <td>${data[searchme]["status"]}</td>
            <td>${data[searchme]["created_on"]}</td>`;
        })
        document.getElementById("showsearch").innerHTML = output + `</table>`;
            // if (data){
    //     document.getElementById("reg").innerText = data["message"];

    // }
    // }

})
.catch(error => console.log('error:',error));
})


