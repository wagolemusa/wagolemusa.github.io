// let token = localStorage.getItem('access_token')
// let current_user = localStorage.getItem('current_user')
// let access_token = "Bearer " + token

// Set username on topnav
function userget(){
    document.getElementById('current-user').innerHTML = current_user;
  }


// Fetch sent data
fetch("https://senditparcel.herokuapp.com/api/admin/v2/canceled",{
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
    // else{

        data = data["data"]
        let output = `
        <table id="tablePreview" class="table table-striped table-hover table-borderless">
        <thead>
        <tr>
        <th>Title</th>
        <th>Receiver Name</th>

        <th>Receiver ID</th>
        <th>Receiver Phone</th>
        <th>pickup</th>

        <th>destination</th>
        <th>Weight</th>
        <th>Status</th>
        <th>Date</th>

        </tr>
        </thead>
        `;

        Object.keys(data).forEach(function(sendt){

            output +=`

            <tr>

            <td>${data[sendt]["title"]}</td>
            <td>${data[sendt]["rec_name"]}</td>
            <td>${data[sendt]["rec_id"]}</td>
            <td>${data[sendt]["rec_phone"]}</td>
            <td>${data[sendt]["pickup"]}</td>

            <td>${data[sendt]["destination"]}</td>
            <td>${data[sendt]["weight"]}</td>
            <td>${data[sendt]["status"]}</td>
            <td>${data[sendt]["created_on"]}</td>
            <td><button type="button" class="btn btn-danger" value="delete" onclick="deletehistory(${data[sendt]["parcel_id"]})">Remove</button></td>`
        })
        document.getElementById("canceled").innerHTML = output + `</table>`;

    // }
    })
    .catch(err => console.log(err));

})

function deletehistory(parcel_id){
    let url = "https://senditparcel.herokuapp.com/api/admin/v2/parcels/"+parcel_id;
    if  (window.confirm("Are you sure, you want to delete?")){
        fetch(url, {
            method:"DELETE",
            headers:{"Content-Type":"application/json", "Authorization":access_token}
        })
        .then((res)=> res.json())
        .then((data)=> {
            window.location.replace("canlced.html")
        })
        
    }
}
