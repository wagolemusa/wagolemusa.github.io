let route = "https://senditparcel.herokuapp.com/api";

let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

// if (token === null) {
//     window.location.replace("login.html")
// }



function userget(){
    document.getElementById('current_user').innerHTML = current_user
}

//Function for searching
document.getElementById("submit").addEventListener("click",
function searchfetch(event){
    event.preventDefault()
    let url = route +"/v2/search"
    let from_location = document.forms["search"]["from_location"].value;
    let to_location = document.forms["search"]["to_location"].value;
    let dates = document.forms["search"]["dates"].value;
    let data = {from_location:from_location, to_location:to_location, dates:dates};
    fetch (url, {method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":access_token
    },
    body:JSON.stringify(data)
}   )
.then((res)=>res.json())
.then((data)=>{
    
    if (data["message"] == "There is no Route yet")
        document.getElementById("reg").innerText = data["message"];
    
    if (data.message == 'Internal Server Error'){
        window.location.replace("login.html")
    }

    else{
        data = data["data"];
        console.log(data)
        let output = `
        <div class="conts mb-5">

       <table id="tablePreview" class="table table-striped table-hover table-borderless">
        <thead>
        <tr>
        <th>Car Number</th>
        <th>from</th>
        <th>To</th>
        <th>Price</th>
        <th>Time</th>
        <th></th>
        </tr>
        </thead>
        `;
        Object.keys(data).forEach(function(searchme){

            output +=`
            <tr>
            <td>${data[searchme]["car_number"]}
            <td>${data[searchme]["from_location"]}</td>
            <td>${data[searchme]["to_location"]}</td>
            <td>${data[searchme]["price"]}</td>
            <td>${data[searchme]["day_time"]}</td>
            <td><button class="btn btn-default" "id="myBtn1" value="books"onclick="books('${data[searchme]["price_id"]}','${data[searchme]["car_number"]}','${data[searchme]["from_location"]}','${data[searchme]["to_location"]}','${data[searchme]["price"]}')">book</button></div></td>`
    
        })
        document.getElementById("showsearch").innerHTML = output + `</table>`;
            // if (data){
    //     document.getElementById("reg").innerText = data["message"];

    // }
    }

})
.catch(error => console.log('error:',error));
})


function books(book_id, car_number, from_location, to_location, price){
    
    modal4.style.display="block";
    document.getElementById("single").innerText = "";
    document.getElementById("car_number").innerText = "";
    document.getElementById("location").innerHTML = "";
    document.getElementById("from_location").innerText = "";
    document.getElementById("too").innerHTML = "";
    document.getElementById("to_location").innerText = "";
    document.getElementById("pessa").innerHTML = "";
    document.getElementById("price").innerText = "";
    document.getElementById("editor").innerHTML =`

    <form name="modify"><br><p id="id"></p><br>
    <h5>Car Number</h5>
    <textarea class="form-control rounded-0 id="exampleFormControlTextarea1" disabled="disabled" rows ="1" cols = "30" name="car_number">${car_number}</textarea><br>
    <h5>From</h5>
    <textarea class="form-control rounded-0 id="exampleFormControlTextarea1" disabled="disabled" rows ="1" cols = "30" name="from_location">${from_location}</textarea><br>
    <h5>To</h5>
    <textarea class="form-control rounded-0 id="exampleFormControlTextarea1" disabled="disabled"  rows ="1" cols = "30" name="to_location">${to_location}</textarea><br>
   <h5>Price</h5>
    <textarea class="form-control rounded-0 id="exampleFormControlTextarea1" disabled="disabled"  rows ="1" cols = "30" name="price">${price}</textarea><br>
    <h5>Seats</h5>
    <input class="form-control form-control-lg" input"type="number"  name="quality" placeholder="How many seats"><br>
    <h5>Travel Date</h5>
    <input class="form-control form-control-lg" type="date"  input" type="date"  name="dates" placeholder="Date"><br>
 
     <button class="btn btn-default"  name="save" id="search">Book</button></form>
    <br/>
  </div>
</div>
`;

document.getElementById("search").addEventListener("click",
    function modifyEntry(event){
        event.preventDefault();
        let url = "https://senditparcel.herokuapp.com/api/v2/book";
        // console.log(modify)

            let  car_number = document.forms["modify"]["car_number"].value;
            let from_location = document.forms["modify"]["from_location"].value;
            let to_location = document.forms["modify"]["to_location"].value;
            let price = document.forms["modify"]["price"].value;
            let quality = document.forms["modify"]["quality"].value;
            let dates = document.forms["modify"]["dates"].value;
            let total = price * quality;

            let data = {car_number:car_number, from_location:from_location, to_location:to_location, price:price, quality:quality,dates:dates, total:total}
            console.log(data)
            fetch(url, {
                method:"POST", headers: {"Contant-Type":"application/json","Authorization":access_token},
                body:JSON.stringify(data)
            })
            .then((response)=>response.json())
            .then((data)=>{
                document.getElementById("msge").innerText = data["message"]
                window.location.replace("lipa.html")

            })
            .catch((error)=>console.log(error))

    });
}


