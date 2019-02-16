
// post send parcels

let route = "https://senditparcel.herokuapp.com/api";

let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

// check if token exist during load
if (token === null) {
    window.location.replace("login.html")
}

if (data.message == 'Internal Server Error'){
    window.location.replace("login.html")
}
function userget(){
    document.getElementById('current_user').innerHTML = current_user
}

document.getElementById("send").addEventListener("click",
function fetchsend(event){
    event.preventDefault()
    let url = route +"/v2/parcels"
    let title = document.forms["sendit"]["title"].value;
    let pickup = document.forms["sendit"]["pickup"].value;
    let rec_id = document.forms["sendit"]["rec_id"].value;
    let rec_phone = document.forms["sendit"]["rec_phone"].value;
    let rec_name = document.forms["sendit"]["rec_name"].value;
    let destination = document.forms["sendit"]["destination"].value;
    let weight = document.forms["sendit"]["weight"].value;
    let data = {title:title, pickup:pickup, rec_id:rec_id, rec_phone:rec_phone, rec_name:rec_name, destination:destination, weight:weight}

    fetch(url, {method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":access_token
    },
    body:JSON.stringify(data)
})
.then((response) => response.json())
.then((data)=>{
    
    document.getElementById("errors").innerText = data["message"]
    // window.location.replace("send.html")
})
.catch(error => console.log('error:', error));

})

