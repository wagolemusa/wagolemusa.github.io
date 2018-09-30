
// declare the main route
let route = "https://dairyapp.herokuapp.com/api";
let token = JSON.parse(localStorage.getItem("token"));
// fetch the home message
function fetchIndex(){
fetch(route+"/", {method:"GET", 
headers:{"Content-Type":"application/json"}})
.then((response) => response.json())
.then((data)=>{
    document.getElementById("output").innerHTML = data["message"]
})
.catch((err) => console.log(err))
}






// Fetch all Entries
document.getElementById("submit").addEventListener("click",
function fetchAddEntry(event){
	event.preventDefault()
	let url = route+"/v2/entries";

	let title =document.forms["create"]["title"].value;
	let dates = document.forms["create"]["dates"].value;
	let entries = document.forms["create"]["entries"].value;

	let data = {title:title, dates:dates, entries:entries}
	fetch(url, {method:"POST",
	headers: {"Content-Type":"application/json", 'x-access-token':token},
    body:JSON.stringify(data)
})
.then((response) => response.text())
.then((output) => {
	document.getElementById("regstatus").innerText = "Succesfully posted "
	window.location.replace("update_entry.html")
})
.catch(error => console.log('error:',error));
})



