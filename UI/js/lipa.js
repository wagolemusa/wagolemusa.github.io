let route = "https://senditparcel.herokuapp.com/api";

let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

//Function for searching
fetch("https://senditparcel.herokuapp.com/api/admin/v2/bookings",{
    method: "GET",
    headers: {
        "Content-Type":"application/json",
        "Accept":"applicaton/json",
        "Authorization":access_token
    },
})
.then((response) =>{
    response.json().then((book)=>{
        console.log(book)
        if (book.message == 'Internal Server Error'){
            window.location.replace("login.html")
        }

        book = book["book"]
        let output = `
        <table id="NewTable">
        <tr class="header">
        <th style="width:20%;">bookingref</th>
        <th style="width:25%;">car_number</th>
        <th style="width:25%;">Name</th>
        <th style="width:25%;">From</th>
        <th style="width:25%;">To</th>
        <th style="width:25%;">price</th>
        <th style="width:25%;">quality</th>
        <th style="width:30%;">dates</th>
        <th style="width:30%;">total</th>
        <th style="width:30%;"></th>
        <th style="width:30%;"></th>
        `;

        Object.keys(book).forEach(function(sendt){
            let  bookingref = book[sendt]["bookingref"];
            let car_number = book[sendt]["car_number"];
            let username = book[sendt]["username"];
            let from_location = book[sendt]["from_location"];
            let to_location = book[sendt]["to_location"];
            let price = book[sendt]["price"];
            let quality = book[sendt]["quality"];
            let dates = book[sendt]["dates"];
            let total = book[sendt]["total"];

            output +=`

            <tr>
            <td>${book[sendt]["bookingref"]}</td>
            <td>${book[sendt]["car_number"]}</td>
            <td>${book[sendt]["username"]}</td>
            <td>${book[sendt]["from_location"]}</td>
            <td>${book[sendt]["to_location"]}</td>
            <td>${book[sendt]["price"]}</td>
            <td>${book[sendt]["quality"]}</td>
            <td>${book[sendt]["dates"]}</td>
            <td>${book[sendt]["total"]}</td>            
            <td><button style="color: #ffffff; background-color:#00C851; font-size: 18px;  border: none;
           "id="myBtn6" value="Edit" onclick="mpesa('${book[sendt]["book_id"]}','${book[sendt]["bookingref"]}','${book[sendt]["car_number"]}',
           '${book[sendt]["from_location"]}','${book[sendt]["to_location"]}','${book[sendt]["price"]}','${book[sendt]["quality"]}','${book[sendt]["dates"]}','${book[sendt]["total"]}')">Show</button></td>`;
        })
        document.getElementById("showsearch").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


function mpesa(book_id, bookingref, car_number, from_location, to_location, price, quality, dates, total) {

    modal4.style.display="block";
    document.getElementById("book").innerHTML = "";   
    document.getElementById("book_id").innerText = "";
    document.getElementById("ref").innerHTML = "";   
    document.getElementById("bookingref").innerText = "";
    document.getElementById("single").innerText = "";
    document.getElementById("car_number").innerText = "";
    document.getElementById("location").innerHTML = "";
    document.getElementById("from_location").innerText = "";
    document.getElementById("too").innerHTML = "";
    document.getElementById("to_location").innerText = "";
    document.getElementById("pessa").innerHTML = "";
    document.getElementById("price").innerText = "";
    document.getElementById("qua").innerHTML = "";
    document.getElementById("quality").innerText = "";
    document.getElementById("calender").innerHTML = "";
    document.getElementById("dates").innerText = "";
    document.getElementById("many").innerHTML = "";
    document.getElementById("total").innerText = "";
    document.getElementById("editor").innerHTML =`

    <form name="modify"><br><p id="id"></p><br>
    <textarea maxlength="20" rows ="2" cols = "38" name="book_id">${book_id}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "38" name="bookingref">${bookingref}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "38" name="car_number">${car_number}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "38" name="from_location">${from_location}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "38" name="to_location">${to_location}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "38" name="price">${price}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "38" name="quality">${quality}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "38" name="dates">${dates}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "38" name="total">${total}</textarea><br><br>

    <input type="number" maxlength="20" rows ="2" cols = "33" name="phone" placeholder="245 678 67 7700"><br><br>
     <button class="view" name="save" id="search">Book</button></form>
    <br/>
  </div>
</div>
`;

document.getElementById("search").addEventListener("click",
    function modifyEntry(event){
        event.preventDefault();
        let url = "https://senditparcel.herokuapp.com/api/v2/lipa";
        // console.log(modify)
            let book_id = document.forms["modify"]["book_id"].value;
            let bookingref = document.forms["modify"]["bookingref"].value;
            let car_number = document.forms["modify"]["car_number"].value;
            let from_location = document.forms["modify"]["from_location"].value;
            let to_location = document.forms["modify"]["to_location"].value;
            let price = document.forms["modify"]["price"].value;
            let quality = document.forms["modify"]["quality"].value;
            let dates = document.forms["modify"]["dates"].value;
            let amount = total
            let phone = document.forms["modify"]["phone"].value;

            let data = {book_id:book_id,bookingref:bookingref,car_number:car_number, from_location:from_location, to_location:to_location, price:price, quality:quality,dates:dates, total:total, amount:amount, phone:phone}
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