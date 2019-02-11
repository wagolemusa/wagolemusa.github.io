let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

if(!token){
    window.location.replace("login.html");
}

function logout(){
    localStorage.removeItem('token');
    window.location.replace("login.html")
}