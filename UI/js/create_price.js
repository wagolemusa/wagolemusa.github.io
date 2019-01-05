
// let token = localStorage.getItem("access_token");
let route = "https://senditparcel.herokuapp.com/api";

let token = JSON.parse(localStorage.getItem("access_token"));
let access_token = "Bearer " + token

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