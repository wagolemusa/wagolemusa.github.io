let route2 = "https://senditparcel.herokuapp.com/api";

let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

let url = route2+"/admin/v2/locations"

fetch("https://senditparcel.herokuapp.com/api/admin/v2/locations",{
    method: "GET",
    headers: {
        "Content-Type":"application/json",
        "Accept":"applicaton/json",
        "Authorization":access_token
    },

})
.then((response)=>{
    response.json().then((data)=>{ 
        console.log(data)

        if (data){
            document.getElementById("msgerror").innerText = data["message"]
            // window/location.replace("login.html")
    }
    else{

        data = data["data"];
        let output = `
        <table id="NewTable">
        <tr class="header">
          <th style="width:30%;">Car number</th>
          <th style="width:30%;">From</th>
          <th style="width:30%;">To</th>
          <th style="width:30%;">Price</th>
          <th style="width:30%;">Time</th>
          <th style="width:30%;"></th>
      
        </table>`;

        Object.keys(data).forEach(function(pric){
            let car_number = data["pric"]["car_number"];
            let from_location = data["pric"]["from_location"];
            let to_location = data["pric"]["to_location"];
            let price = data["pric"]["price"];
            let day_time = data["pric"]["day_time"];

            output +=`
            <table>
                <tr>
            
                <td>${data[pric]["car_number"]}</td>
                <td>${data[pric]["from_location"]}</td>
                <td>${data[pric]["to_location"]}</td>
                <td>${data[pric]["price"]}</td>
                <td>${data[pric]["day_time"]}</td>
                <td><button style="color: #ffffff; background-color:#00C851; font-size: 18px;  border: none;
                " id="myBtn">Update</button></td>`
        });
        document.getElementById("shows").innerHTML = output + `</table>`;
        
    }
    })
    .catch(err => console.log(err));
})