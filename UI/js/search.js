let route = "https://senditparcel.herokuapp.com/api";

let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

//Function for searching
document.getElementById("submit").addEventListener("click",
function searchfetch(event){
    event.preventDefault()
    let url = route +"/v2/search"
    let from_location = document.forms["search"]["from_location"].value;
    let to_location = document.forms["search"]["to_location"].value;
    let data = {from_location:from_location, to_location:to_location};
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

    // else{
        data = data["data"];
        console.log(data)
        let output = `
        <table id="NewTable">
        <tr class="header">
        <th style="width:20%;">Car Number</th>
        <th style="width:30%;">from</th>
        <th style="width:25%;">To</th>
        <th style="width:25%;">Price</th>
        <th style="width:30%;">Time</th>
        <th style="width:35%;"></th>
        `;
        Object.keys(data).forEach(function(searchme){
            let car_number = data[searchme]["car_number"]
            let from_location = data[searchme]["from_location"];
            let to_location = data[searchme]["to_location"];
            let price = data[searchme]["price"];
            let day_time = data[searchme]["day_time"];

            output +=`
            <tr>
            <td>${data[searchme]["car_number"]}
            <td>${data[searchme]["from_location"]}</td>
            <td>${data[searchme]["to_location"]}</td>
            <td>${data[searchme]["price"]}</td>
            <td>${data[searchme]["day_time"]}</td>
            <td><button style="color: #ffffff; background-color:#00C851; font-size: 18px;  border: none;
            "id="myBtn1" value="books"onclick="books('${data[searchme]["price_id"]}','${data[searchme]["car_number"]}','${data[searchme]["from_location"]}','${data[searchme]["to_location"]}','${data[searchme]["price"]}')">book</button></td>`
    
        })
        document.getElementById("showsearch").innerHTML = output + `</table>`;
            // if (data){
    //     document.getElementById("reg").innerText = data["message"];

    // }
    // }

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
    <textarea maxlength="20" rows ="2" cols = "33" name="car_number">${car_number}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="from_location">${from_location}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="to_location">${to_location}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="price">${price}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="quality" placeholder="How many sits"></textarea><br><br>
    <textarea type="date" maxlength="20" rows ="2" cols = "33" name="dates" placeholder="Date"></textarea><br><br>

     <button class="view" name="save" id="search">Book</button></form>
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
                // window.location.replace("create_price.html")

            })
            .catch((error)=>console.log(error))

    });
}
