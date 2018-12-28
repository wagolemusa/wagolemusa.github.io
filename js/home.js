let route = "https://senditparcel.herokuapp.com/api";

// function fetch welcome mesage

function fetchIndex(){
    fetch(route+"/", {  method: "GET",
headers:{"Content-Type":"application/json"}})
.then((response) => response.json())
.then((data) => {
    document.getElementById("output").innerHTML = data["message"]
})
.catch((er) => console.log(err))
}