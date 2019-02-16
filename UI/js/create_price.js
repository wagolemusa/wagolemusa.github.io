let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

// let token = localStorage.getItem("access_token");
let route = "https://senditparcel.herokuapp.com/api";

// Set username on topnav
function setUserName(){
    document.getElementById('current-user').innerHTML = current_user;
  }


document.getElementById("prices").addEventListener("click",
function fetchprice(event){
    event.preventDefault()
    let url = route+"/admin/v2/locations"
    let car_number = document.forms["create"]["car_number"].value;
    let from_location = document.forms["create"]["from_location"].value;
    let to_location = document.forms["create"]["to_location"].value;
    let price = document.forms["create"]["price"].value;
    let day_time = document.forms["create"]["day_time"].value;
    let data = {car_number:car_number, from_location:from_location, to_location:to_location, price:price, day_time:day_time};
    fetch(url, {method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":access_token
    },
    body:JSON.stringify(data)
})
.then ((response)=>response.json())
.then((data)=>{
    if (data){
        document.getElementById("msg").innerText = data["message"]
        // window.location.replace("create_price.html")
    }
    else{
        window.location.replace("create_price.html")
    }
})
.catch(error => console.log('error:', error));

})



fetch("https://senditparcel.herokuapp.com/api/admin/v2/locations",{
    method: "GET",
    headers: {
        "Content-Type":"application/json",
        "Accept":"applicaton/json",
        "Authorization":access_token
    },

})
.then((response)=>{
    response.json().then((collection)=>{ 

        console.log(collection)

            collection = collection["collection"];
            let output = `
            <table id="NewTable">
            <tr class="header">
            <th style="width:15%;">Car number</th>
            <th style="width:25%;">From</th>
            <th style="width:25%;">To</th>
            <th style="width:20%;">Price</th>
            <th style="width:30%;">Time</th>
            <th style="width:20%;"></th>
        
            `;

            Object.keys(collection).forEach(function(pric){
                
                let car_number = collection[pric]["car_number"];
                let from_location = collection[pric]["from_location"];
                let to_location = collection[pric]["to_location"];
                let price = collection[pric]["price"];
                let day_time = collection[pric]["day_time"];

                output +=`
               
                    <tr>
                
                    <td>${collection[pric]["car_number"]}</td>
                    <td>${collection[pric]["from_location"]}</td>
                    <td>${collection[pric]["to_location"]}</td>
                    <td>${collection[pric]["price"]}</td>
                    <td>${collection[pric]["day_time"]}</td>
                    <td><button style="color: #ffffff; background-color:#00C851; font-size: 18px;  border: none;
                    "id="myBtn1" value="Edit"onclick="edit('${collection[pric]["price_id"]}','${collection[pric]["car_number"]}','${collection[pric]["from_location"]}','${collection[pric]["to_location"]}','${collection[pric]["price"]}','${collection[pric]["day_time"]}')">Update</button></td>`
            
            });
            // if (collection){
            //     document.getElementById("msgerror").innerText = collection["message"]
            //     // window/location.replace("login.html")
            // }
            // else{
            document.getElementById("shows").innerHTML = output + `</table>`;
            // }
        
    })
    .catch(err => console.log(err));
})


function edit(price_id, car_number, from_location, to_location, price, day_time){

    modal1.style.display="block";
    document.getElementById("single").innerText = "";
    document.getElementById("car_number").innerText = "";
    document.getElementById("location").innerHTML = "";
    document.getElementById("from_location").innerText = "";
    document.getElementById("too").innerHTML = "";
    document.getElementById("to_location").innerText = "";
    document.getElementById("pessa").innerHTML = "";
    document.getElementById("price").innerText = "";
    document.getElementById("timee").innerHTML = "";
    document.getElementById("day_time").innerText = "";
    document.getElementById("editor").innerHTML =`

    <form name="modify"><br><p id="id"></p><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="car_number">${car_number}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="from_location">${from_location}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="to_location">${to_location}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="price">${price}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="day_time">${day_time}</textarea><br><br>
     <button type='submit'  id="submit">Update price</button></form>
    <br/>
  </div>
</div>
`;
    document.getElementById("submit").addEventListener("click",
    function modifyEntry(event){
        event.preventDefault();
        let url = "https://senditparcel.herokuapp.com/api/admin/v2/locations/"+price_id;

            let  car_number = document.forms["modify"]["car_number"].value;
            let from_location = document.forms["modify"]["from_location"].value;
            let to_location = document.forms["modify"]["to_location"].values;
            let price = document.forms["modify"]["price"].values;
            let day_time = document.forms["modify"]["day_time"].values;

            let data = {car_number:car_number, from_location:from_location, to_location:to_location, price:price, day_time:day_time}

            fetch(`${url}`, {
                method:'PUT', headers: {"Contant-Type":"application/json","Authorization":access_token},
                body:JSON.stringify(data)
            })
            .then((response)=>response.json())
            .then((data)=>{
                document.getElementById("msge").innerText = data["message"]
                // window.location.replace("create_price.html")

            })
            .catch((error)=>console.log(error))

    });
}