let route = "https://senditparcel.herokuapp.com/api";

document.getElementById("loginform").addEventListener("submit",
function fetchlogin(event){
    event.preventDefault()
    let username = document.forms["login"]["username"].value;
    let password = document.forms["login"]["password"].value;

    let url = route+"/v2/auth/signin"

    let data = {username:username, password:password};
    fetch(url, {method: "POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
})
.then((response)=> response.json())
.then((data)=>{
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('current_user', username)
    if (data.access_token){
        if(data.access_token){
            if(username == "admin"){
                window.location.replace("admin_dashboard.html")
            }else{
                window.location.replace("search.html")
            }
        }
    }
    else {
        document.getElementById("loginMsg").innerText = data["message"];
        console.log(data["message"]);
    }
})
.catch(error => console.log('error:', error));


});


