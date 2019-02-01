let token = JSON.parse(localStorage.getItem("access_token"));
let access_token = "Bearer " + token
// Fetch sent data
fetch("https://senditparcel.herokuapp.com/api/v2/book",{
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

        book = book["book"]
        let output = `
        <table id="NewTable">
        <tr class="header">
        <th style="width:20%;">bookingref</th>
        <th style="width:25%;">car_number</th>
        <th style="width:25%;">From</th>
        <th style="width:25%;">To</th>
        <th style="width:25%;">price</th>
        <th style="width:25%;">quality</th>
        <th style="width:30%;">dates</th>
        <th style="width:30%;">total</th>
        <th style="width:30%;">Status</th>
        <th style="width:30%;">Booked No</th>
        <th style="width:30%;"></th>
        <th style="width:30%;"></th>
        `;

        Object.keys(book).forEach(function(sendt){
            let  bookingref = book[sendt]["bookingref"];
            let car_number = book[sendt]["car_number"];
            let from_location = book[sendt]["from_location"];
            let to_location = book[sendt]["to_location"];
            let price = book[sendt]["price"];
            let quality = book[sendt]["quality"];
            let dates = book[sendt]["dates"];
            let total = book[sendt]["total"];
            let status = book[sendt]["status"];
            let created_on = book[sendt]["created_on"];

            output +=`

            <tr>

            <td>${book[sendt]["bookingref"]}</td>
            <td>${book[sendt]["car_number"]}</td>
            <td>${book[sendt]["from_location"]}</td>
            <td>${book[sendt]["to_location"]}</td>
            <td>${book[sendt]["price"]}</td>
            <td>${book[sendt]["quality"]}</td>
            <td>${book[sendt]["dates"]}</td>
            <td>${book[sendt]["total"]}</td>
            <td>${book[sendt]["status"]}</td>
            <td>${book[sendt]["created_on"]}</td>
            <td><button style="color: #ffffff; background-color:#00C851; font-size: 18px;  border: none;
            "id="myBtn5" value="edit" onclick="edit('${book[sendt]["book_id"]}','${book[sendt]["dates"]}','${book[sendt]["status"]}')">Postpond</button></td>
             <td><button style="color: #ffffff; background-color:#00C851; font-size: 18px;  border: none;">Print</button></td>`
        })
        document.getElementById("sendthis").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})


function edit(book_id, dates, status){
    modal5.style.display="block";
    document.getElementById("single").innerText = "";
    document.getElementById("dates").innerText = "";
    document.getElementById("sate").innerText = "";
    document.getElementById("status").innerText = "";
    document.getElementById("editor").innerHTML =`


    <form name="modify" id="id">
    <textarea maxlength="20" rows ="2" cols = "33" name="dates">${dates}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="status">${status}</textarea><br><br>
      <button type='submit' id="submit">Postpond</button>
    </form>
    <br/>

    `;

    document.getElementById("submit").addEventListener("click",
    function modifyEntry(event){
        event.preventDefault();
        let url = "https://senditparcel.herokuapp.com/api/v2/book/"+book_id

            let  dates = document.forms["modify"]["dates"].value;
            let status = document.forms["modify"]["status"].value;
            let data = {dates:dates, status:status}

            fetch(`${url}/postpond`, {
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

