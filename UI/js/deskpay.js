let route = "https://senditparcel.herokuapp.com/api";

let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

//Function for searching
fetch("https://senditparcel.herokuapp.com/api/v2/admin/desk/data",{
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
            ${book[sendt]["quantiy"]}<br/>
            ${book[sendt]["date_when"]}<br/>
            ${book[sendt]["amount"]}  <br/>

          `;
        })
        document.getElementById("showsearch").innerHTML = output;

    })
    .catch(err => console.log(err));

})

//Function for searching
fetch("https://senditparcel.herokuapp.com/api/v2/admin/desk/data",{
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
            <button class="btn btn-dark-green "id="myBtn6" value="Edit" onclick="mpesa('${book[sendt]["desk_id"]}','${book[sendt]["bookingref"]}','${book[sendt]["car_number"]}',
           '${book[sendt]["from_location"]}','${book[sendt]["to_location"]}','${book[sendt]["price"]}','${book[sendt]["quantiy"]}','${book[sendt]["date_when"]}','${book[sendt]["amount"]}')">Pay Na Mpesa</button> </div>`;
        
        })
        document.getElementById("showsput").innerHTML = output;

    })
    .catch(err => console.log(err));

})

function mpesa(desk_id, bookingref, car_number, from_location, to_location, price, quantiy, date_when, amount) {

    modal4.style.display="block";
    document.getElementById("book").innerHTML = "";   
    document.getElementById("desk_id").innerText = "";
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
    document.getElementById("quantiy").innerText = "";
    document.getElementById("calender").innerHTML = "";
    document.getElementById("date_when").innerText = "";
    document.getElementById("many").innerHTML = "";
    document.getElementById("amount").innerText = "";
    document.getElementById("editor").innerHTML =`

    <form name="modify"><br><p id="id"></p><br>
    <textarea disabled="disabled" maxlength="20" rows ="2" cols = "38" name="desk_id">${desk_id}</textarea><br><br>
    <textarea disabled="disabled" maxlength="20" rows ="2" cols = "38" name="bookingref">${bookingref}</textarea><br><br>
    <textarea disabled="disabled" maxlength="20" rows ="2" cols = "38" name="car_number">${car_number}</textarea><br><br>
    <textarea disabled="disabled" maxlength="20" rows ="2" cols = "38" name="from_location">${from_location}</textarea><br><br>
    <textarea disabled="disabled" maxlength="20" rows ="2" cols = "38" name="to_location">${to_location}</textarea><br><br>
    <textarea disabled="disabled" maxlength="20" rows ="2" cols = "38" name="price">${price}</textarea><br><br>
    <textarea disabled="disabled" maxlength="20" rows ="2" cols = "38" name="quality">${quantiy}</textarea><br><br>
    <textarea disabled="disabled" maxlength="20" rows ="2" cols = "38" name="dates">${date_when}</textarea><br><br>
    <textarea disabled="disabled" maxlength="20" rows ="2" cols = "38" name="amount">${amount}</textarea><br><br>

    <input type="number" maxlength="20" rows ="2" cols = "33" name="phone" placeholder="245 678 67 7700"><br><br>
     <button class="view" name="save" id="search">Book</button></form>
    <br/>
  </div>
</div>
`;

document.getElementById("search").addEventListener("click",
    function modifyEntry(event){
        event.preventDefault();
        let url = "https://senditparcel.herokuapp.com/api/v2/desk/lipa";
        // console.log(modify)
            let desk_id = document.forms["modify"]["desk_id"].value;
            let bookingref = document.forms["modify"]["bookingref"].value;
            let car_number = document.forms["modify"]["car_number"].value;
            let from_location = document.forms["modify"]["from_location"].value;
            let to_location = document.forms["modify"]["to_location"].value;
            let price = document.forms["modify"]["price"].value;
            let quality = document.forms["modify"]["quality"].value;
            let dates = document.forms["modify"]["dates"].value;
            let amount = document.forms["modify"]["amount"].value;
            let phone = document.forms["modify"]["phone"].value;

            let data = {desk_id:desk_id, bookingref:bookingref,car_number:car_number, from_location:from_location, to_location:to_location, price:price, quality:quality,dates:dates,  amount:amount, phone:phone}
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