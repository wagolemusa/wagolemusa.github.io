// Fuction to fetch numbers for users
let route = "https://senditparcel.herokuapp.com/api/"
function fetchnumbers(){
    fetch(route+"admin/v2/number", {  method: "GET",
headers:{"Content-Type":"application/json", "Accept":"applicaton/json"}})
.then((response) =>{
    response.json().then((number)=>{
        console.log(number)

    document.getElementById("output").innerText= number["number"]
})

.catch((err) => console.log(err))
})

// Fuction to fetch numbers for bookings orders
fetch(route+"v2/booking/numbers", {  method: "GET",
headers:{"Content-Type":"application/json", "Accept":"applicaton/json"}})
.then((response) =>{
    response.json().then((y)=>{
        console.log(y)

    document.getElementById("orders").innerText= y["nums"]
})

.catch((err) => console.log(err))
})

// Fuction to fetch numbers for parcel orders
fetch(route+"v2/parcel/numbers", {  method: "GET",
headers:{"Content-Type":"application/json", "Accept":"applicaton/json"}})
.then((response) =>{
    response.json().then((x)=>{
        console.log(x)

    document.getElementById("parcel").innerText= x["num"]
})

.catch((err) => console.log(err))
})

}