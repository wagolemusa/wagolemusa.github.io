let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token


if (token === null) {
    window.location.replace("login.html")
}



function userget(){
    document.getElementById('current_user').innerHTML = current_user
}

// Fetch sent data
fetch("https://senditparcel.herokuapp.com/api/parcel/v2/intransit",{
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

            <td><button style="color: #ffffff; background-color:#00C851; font-size: 18px;  border: none;
            "id="myBtn2" value="edit" onclick="edit('${data[sendt]["parcel_id"]}','${data[sendt]["destination"]}')">Change-Destination</button></td>`
        })
        document.getElementById("sendthis").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


function edit(parcel_id, destination){
    modal2.style.display="block";
    document.getElementById("single").innerText = "";
    document.getElementById("destination").innerText = "";
    document.getElementById("editor").innerHTML =`


    <form name="modify" id="id">
    <textarea maxlength="20" rows ="2" cols = "33" name="destination">${destination}</textarea><br><br>
      <button type='submit' id="submit">change destination</button>
    </form>
    <br/>

    `;

    document.getElementById("submit").addEventListener("click",
    function modifyEntry(event){
        event.preventDefault();
        let url = "https://senditparcel.herokuapp.com/api/v2/parcels/"+parcel_id

            let  destination = document.forms["modify"]["destination"].value;
            let data = {destination:destination}

            fetch(`${url}/destination`, {
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
