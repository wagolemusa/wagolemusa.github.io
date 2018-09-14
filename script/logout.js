document.getElementById("logout").addEventListener("click",
function logout(event){
    event.preventDefault()
    let url = "https://dairyapp.herokuapp.com/api/v2/users/logout";
    fetch(url, {
        method:"GET",
        headers: {"Content-Type":"application/json", "x-access-token":token}
    })
    .then((response)=>response.json())
    .then((data)=>{
        localStorage.clear();
        window.location.replace("login.html");
    })
   .catch((error)=>console.error(error))
});