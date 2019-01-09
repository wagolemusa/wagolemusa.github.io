let route = "https://senditparcel.herokuapp.com/api";

// function fetch welcome message
function fetchIndex(){
    fetch(route+"/", {  method: "GET",
headers:{"Content-Type":"application/json"}})
.then((response) => response.json())
.then((data) => {
    document.getElementById("output").innerHTML = data["message"]
})
.catch((err) => console.log(err))
}

// Function User Registration
document.getElementById("submit").addEventListener("click",
function fetchuser(event){
    event.preventDefault()
    let url = route+"/v2/auth/signup"
    let first_name = document.forms["register"]["first_name"].value;
    let last_name = document.forms["register"]["last_name"].value;
    let username = document.forms["register"]["username"].value;
    let phone = document.forms["register"]["phone"].value;
    let email = document.forms["register"]["email"].value;
    let password = document.forms["register"]["password"].value;
    let confirm_password = document.forms["register"]["confirm_password"].value;
    let data = {first_name:first_name, last_name:last_name, username:username, phone:phone, email:email, password:password, confirm_password:confirm_password};
    fetch(url, {method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
    })
    .then((res)=>res.json())
    .then((data) =>{
      
        if (data){
            document.getElementById("reg").innerText = data["message"];

            window.location.replace("login.html")        
        }
        else {
            document.getElementById("reg").innerText = data["message"];

        }
})
.catch(error => console.log('error:',error));

});