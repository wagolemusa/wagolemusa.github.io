
// let token = localStorage.getItem("access_token");

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
            <button class="btn btn-dark-green "id="myBtn6" value="Edit" onclick="cash('${book[sendt]["desk_id"]}')">Pay Cash</button> </div>`;
        
        })
        document.getElementById("showsme1").innerHTML = output;

    })
    .catch(err => console.log(err));

})


function cash(desk_id){
    let url = "https://senditparcel.herokuapp.com/api/v2/admin/desk/cash/"+desk_id;
    let data = {desk_id:desk_id}
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

