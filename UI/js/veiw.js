let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token


// check if token exist during load
if (token === "") {
    window.location.replace("login.html")
}

// Set username on topnav
function setUserName(){
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
