// Fetch  user's Details
let token = JSON.parse(localStorage.getItem("token"));

let route2 = "https://dairyapp.herokuapp.com/api";

function Allentries(){
	let url = route2 +"/v2/profile"
	fetch(url,{
		method: "GET", headers : {
            "Content-Type":"application/json", 
            "x-access-token":token}
	})
	.then((res)=>res.json())
	.then((data)=>{
        data = data["data"];
        //console.log(data)
        let entry = `
                `;
    Object.keys(data).forEach(function(AllE){
    let full_name = data[AllE]["full_name"]
    let username = data[AllE]["username"]
    let email = data[AllE]["email"]


    entry += `


    <div id="pro">
	<p>${data[AllE]["full_name"]}</p>
	<hr/>
	<p> ${data[AllE]["username"]}</p>
		<hr/>

	<p>${data[AllE]["email"]}</p>
		<hr/>

	<p>*************</p>
		<hr/><br/>
<b>Update Account</b>
<br/><br><br/>

</div>`;
    });
    document.getElementById("user").innerHTML = entry

})
.catch((error) => console.log(error))
}
