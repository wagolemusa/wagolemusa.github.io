let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token


// Set username on topnav
function userget(){
    document.getElementById('current-user').innerHTML = current_user;
  }

// Fetch sent data
fetch("https://senditparcel.herokuapp.com/api/admin/v2/parcels",{
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

            <td><button type="button" class="btn btn-info" "id="myBtn2" value="edit" onclick="edit('${data[sendt]["parcel_id"]}','${data[sendt]["status"]}')">ChangeStatus</button></td>`})
        document.getElementById("histories").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


function edit(parcel_id, status){
    modal2.style.display="block";
    document.getElementById("single").innerText = "";
    document.getElementById("status").innerText = "";
    document.getElementById("editor").innerHTML =`

    <form name="modify" id="id">
    <h2>${status}</h2>
    <input list="town" type="text" name="status">

    <datalist id="town">
          <option value="delivered" />
          <option value="cancled"/>
    </datalist>
  
    <button type='submit' id="submit">change status</button>
    </form>
    <br/>

    `;
    document.getElementById("submit").addEventListener("click",

    function modifyEntry(event){
        event.preventDefault();
        let url = "https://senditparcel.herokuapp.com/api/admin/v2/parcels/"+parcel_id

            let  status = document.forms["modify"]["status"].value;
            let data = {status:status}

            fetch(`${url}/status`, {
                method:"PUT", headers: {"Contant-Type":"application/json","Authorization":access_token},
                body:JSON.stringify(data)
            })
            .then((response)=>response.json())
            .then((data)=>{
                document.getElementById("change").innerText = data["message"]
                // window.location.replace("create_price.html")
            })
            .catch((error)=>console.log(error))

    });
}
