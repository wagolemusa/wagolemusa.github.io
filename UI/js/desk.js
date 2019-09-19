let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

let route = "https://senditparcel.herokuapp.com/api";

function userget(){
    document.getElementById('current_user').innerHTML = current_user;
}


document.getElementById("submit").addEventListener("click",
function fetchdesk(event){
    event.preventDefault()
    let url = route+ "/admin/v2/create/passenger"
    let customer_name = document.forms["create"]["customer_name"].value;
    let customer_number = document.forms["create"]["customer_number"].value;
    let from_location  =  document.forms["create"]["from_location"].value;
    let to_location = document.forms["create"]["to_location"].value;
    let quantiy = document.forms["create"]["quantiy"].value;
    let price = document.forms["create"]["price"].value;
    let phone = document.forms["create"]["phone"].value;
    let date_when = document.forms["create"]["date_when"].value;
    let time_at  = document.forms["create"]["time_at"].value;

    let data = {customer_name:customer_name, customer_number:customer_number, from_location:from_location,
                to_location:to_location, quantiy:quantiy, price:price, phone:phone, date_when:date_when, time_at:time_at};
    
    fetch(url, {method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":access_token
    },
    body:JSON.stringify(data) 
    })
    .then ((response)=> response.json())
    .then((data) => {
        if (data){
            document.getElementById("sms").innerText = data["message"]
            window.location.replace("lipa.html")
        }
        else{
            window.location.replace("desk.html")
        }
    })
    .catch(error => console.log('error:', error));

})