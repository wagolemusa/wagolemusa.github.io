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
<input type="submit" id="myBtn2" value="Update Account" onclick="edit('${data[AllE]["user_id"]}','${data[AllE]["full_name"]}','${data[AllE]["username"]}','${data[AllE]["email"]}')">
<br/><br><br/>

</div>`;
    });
    document.getElementById("user").innerHTML = entry

})
.catch((error) => console.log(error))
}



function edit(user_id, full_name, username, email){
    modal.style.display="block";
    document.getElementById("single").innerHTML = "";
    document.getElementById("full_name").innerText = "";
    document.getElementById("manydate").innerHTML = "";
    document.getElementById("username").innerText = "";
    document.getElementById("singleTitle").innerHTML = "";
    document.getElementById("email").innerText = "";

    document.getElementById("editor").innerHTML =`
    
    <form name="modify"><br><p id="id"></p><br>
	<textarea maxlength="20" rows ="2" cols = "33" name ="full_name">${full_name}</textarea><br><br>
	<textarea maxlength="20" rows ="2" cols = "33" name ="username">${username}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name ="email">${email}</textarea><br><br>
    <button class="view" name="save" id = "submit">Edit </button><br></form>
    `;
    document.getElementById("submit").addEventListener("click",
    function modifyUser(event){
        event.preventDefault();
        let url = "https://dairyapp.herokuapp.com/api/v2/profile/update/"+user_id;
        let full_name = document.forms["modify"]["full_name"].values;
        let username = document.forms["modify"]["username"].values;
        let email = document.forms["modify"]["email"].values;
        let data = {full_name:full_name, username:username, email:email}
        fetch(url, {
            method:"PUT", headers: {"Content-Type":"application/json", "x-access-token":token},
            body:JSON.stringify(data)
        })
        .then((response)=>response.json())
        .then((output)=>{
			document.getElementById("id").innerText = "User Succesfully updated "
			window.location.replace("profile.html")
        })
        .catch((error)=>console.log(error))
    });
}
