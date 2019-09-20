
// let token = localStorage.getItem("access_token");

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
            <button class="btn btn-dark-green "id="myBtn6" value="Edit" onclick="cash('${book[sendt]["book_id"]}')">Pay Cash</button> </div>`;
        
        })
        document.getElementById("showsme1").innerHTML = output;

    })
    .catch(err => console.log(err));

})


function cash(book_id){
    let url = "https://senditparcel.herokuapp.com/api/v2/cash/payment/"+book_id;
    let data = {book_id:book_id}
    fetch(`${url}`, {
    method:'PUT', headers: {"Contant-Type":"application/json","Authorization":access_token},

        body:JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((data)=>{
    document.getElementById("msge").innerText = data["message"]
    
       setTimeout(window.location.replace("printcash.html"), 10000);

    })
   .catch((error)=>console.log(error))
}



// function cash(book_id) {
//     document.getElementById("showsme").innerHTML =`
//     <form>
//     </b> <button type="submit" id="submit" class="btn btn-cyan">CASH</button>

//     </form>`;

// document.getElementById("submit").addEventListener("click",
// function modifyEntry(event){
//     event.preventDefault();
//     let url = "https://senditparcel.herokuapp.com/api/v2/cash/payment/"+book_id;
//         fetch(`${url}`, {
//             method:'PUT', headers: {"Contant-Type":"application/json","Authorization":access_token},
//             // body:JSON.stringify(data)
//         })
//         .then((response)=>response.json())
//         .then((data)=>{
//             document.getElementById("msge").innerText = data["message"]
//             // window.location.replace("create_price.html")

//         })
//         .catch((error)=>console.log(error))

// });

// }