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
        <div class="row">
        <div class="col">
        <div class="dat">
        Reciept Number<br/>
        Car Number<br/>
        Name<br/>
        From<br/>
        To<br/>
        Price<br/>
        Quanty<br/>
        Dates<br/>
        Total<br/>
      
        </div>
        </div>
        `;

        Object.keys(book).forEach(function(sendt){

            output +=`

        <div class="col">
        <div class="dat2">

           ${book[sendt]["bookingref"]}<br/>
            ${book[sendt]["car_number"]}<br/>
            ${book[sendt]["username"]}<br/>
            ${book[sendt]["from_location"]}<br/>
            ${book[sendt]["to_location"]}<br/>
            ${book[sendt]["price"]}<br/>
            ${book[sendt]["quality"]}<br/>
            ${book[sendt]["dates"]}<br/>
            ${book[sendt]["total"]}  <br/>

          `;
        })
        document.getElementById("showsearch").innerHTML = output;

    })
    .catch(err => console.log(err));

})

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
      let  output = `
      
      `;

        Object.keys(book).forEach(function(sendt){

            output +=`

            <div class="padd">
            <b>Click Button if you will pay via Mpesa</b>
            <button class="btn btn-dark-green "id="myBtn6" value="Edit" onclick="mpesa('${book[sendt]["book_id"]}','${book[sendt]["bookingref"]}','${book[sendt]["car_number"]}',
           '${book[sendt]["from_location"]}','${book[sendt]["to_location"]}','${book[sendt]["price"]}','${book[sendt]["quality"]}','${book[sendt]["dates"]}','${book[sendt]["total"]}')">Pay Na Mpesa</button> </div>`;
        
        })
        document.getElementById("showsput").innerHTML = output;

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
    <h6>Enter Phone Number</h6>
    <input type="number" maxlength="20" rows ="2" cols = "33" name="phone" placeholder="254 678 67 7700"><br><br>

    <textarea disabled="disabled" class="form-control rounded-0 id="exampleFormControlTextarea1" name="book_id">${book_id}</textarea><br><br>
    <textarea disabled="disabled" class="form-control rounded-0 id="exampleFormControlTextarea1" name="bookingref">${bookingref}</textarea><br><br>
    <textarea disabled="disabled" class="form-control rounded-0 id="exampleFormControlTextarea1" name="car_number">${car_number}</textarea><br><br>
    <textarea disabled="disabled" class="form-control rounded-0 id="exampleFormControlTextarea1" name="from_location">${from_location}</textarea><br><br>
    <textarea disabled="disabled" class="form-control rounded-0 id="exampleFormControlTextarea1" name="to_location">${to_location}</textarea><br><br>
    <textarea disabled="disabled" class="form-control rounded-0 id="exampleFormControlTextarea1" name="price">${price}</textarea><br><br>
    <textarea disabled="disabled" class="form-control rounded-0 id="exampleFormControlTextarea1" name="quality">${quality}</textarea><br><br>
    <textarea disabled="disabled" class="form-control rounded-0 id="exampleFormControlTextarea1" name="dates">${dates}</textarea><br><br>
    <textarea disabled="disabled" class="form-control rounded-0 id="exampleFormControlTextarea1" name="total">${total}</textarea><br><br>

     <button class="btn btn-default" name="save" id="search">Book</button></form>
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
                window.location.replace("printdata.html")

            })
            .catch((error)=>console.log(error))

    });
}