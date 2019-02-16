let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

// Set username on topnav
function userget(){
    document.getElementById('current-user').innerHTML = current_user;
  }

// Fetch sent data
fetch("https://senditparcel.herokuapp.com/api/v2/parcels",{
    method: "GET",
    headers: {
        "Content-Type":"application/json",
        "Accept":"applicaton/json",
        "Authorization":access_token
    },
})
.then((response) =>{
    response.json().then((data)=>{
        console.log(data)
        if (data.message == 'Internal Server Error'){
            window.location.replace("login.html")
        }

        data = data["data"]
        let output = `
        <table id="NewTable">
        <tr class="header">
        <th style="width:20%;">Date</th>
        <th style="width:25%;">title</th>
        <th style="width:25%;">pickup</th>
        <th style="width:25%;">Receiver ID</th>
        <th style="width:25%;">Receiver Phone</th>
        <th style="width:25%;">Receiver Name</th>
        <th style="width:30%;">destination</th>
        <th style="width:30%;">Weight</th>
        <th style="width:30%;">Status</th>
        <th style="width:30%;"></th>
        `;

        Object.keys(data).forEach(function(sendt){
            let  created_on = data[sendt]["created_on"];
            let title = data[sendt]["title"];
            let pickup = data[sendt]["pickup"];
            let rec_id = data[sendt]["rec_id"];
            let rec_phone = data[sendt]["rec_phone"];
            let rec_name = data[sendt]["rec_name"];
            let destination = data[sendt]["destination"];
            let weight = data[sendt]["weight"];
            let status = data[sendt]["status"];

            output +=`

            <tr>

            <td>${data[sendt]["created_on"]}</td>
            <td>${data[sendt]["title"]}</td>
            <td>${data[sendt]["pickup"]}</td>
            <td>${data[sendt]["rec_id"]}</td>
            <td>${data[sendt]["rec_phone"]}</td>
            <td>${data[sendt]["rec_name"]}</td>
            <td>${data[sendt]["destination"]}</td>
            <td>${data[sendt]["weight"]}</td>
            <td>${data[sendt]["status"]}</td>

            <td><button style="color: #ffffff; background-color:#ff4444; font-size: 18px;  border: none; value="delete" onclick="deletehistory(${data[sendt]["parcel_id"]})">Remove</button></td>`
        })
        document.getElementById("history").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})

function deletehistory(parcel_id){
    let url = "https://senditparcel.herokuapp.com/api/v2/parcels/"+parcel_id;
    if  (window.confirm("Are you sure, you want to delete?")){
        fetch(url, {
            method:"DELETE",
            headers:{"Content-Type":"application/json", "Authorization":access_token}
        })
        .then((res)=> res.json())
        .then((data)=> {
            window.location.replace("history-delivery.html")
        })
        
    }
}
