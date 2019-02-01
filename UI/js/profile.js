let route = "https://senditparcel.herokuapp.com/api";

let token = JSON.parse(localStorage.getItem("access_token"));
let access_token = "Bearer " + token


fetch("https://senditparcel.herokuapp.com/api/v2/profile",{
    method:"GET",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":access_token
    },
})
.then((response)=>{
    response.json().then((data)=>{
        console.log(data)

        data = data["data"]
        let output =`
   
        `;
        Object.keys(data).forEach(function(user){
            let first_name = data[user]["first_name"]
            let last_name = data[user]["last_name"]
            let username = data[user]["username"]
            let phone = data[user]["phone"]
            let email = data[user]["email"]

            output +=`

            <h3>First Name: ${data[user]["first_name"]}</h3>
            <h3>last name: ${data[user]["last_name"]}</h3>
            <h3>Username: ${data[user]["username"]}</h3>
            <h3>Phone Number: ${data[user]["phone"]}</h3>
            <h3>Email: ${data[user]["email"]}</h3>

            <p><button style="color: #ffffff; background-color:#00C851; font-size: 18px;  border: none;
            "id="myBtn6" value="edit" onclick="edit('${data[user]["user_id"]}','${data[user]["first_name"]}','${data[user]["last_name"]}', '${data[user]["username"]}', '${data[user]["phone"]}', '${data[user]["email"]}')">Change Profile</button></p>
            `;
        });
        document.getElementById("user").innerHTML = output
    
    })
    .catch((error) => console.log(error))
       
})


// Fuction Updates users
function edit(user_id, first_name, last_name, username, phone, email){
    modal6.style.display="block";
    document.getElementById("single").innerText = "";
    document.getElementById("first_name").innerText = "";
    document.getElementById("sate").innerText = "";
    document.getElementById("last_name").innerText = "";
    document.getElementById("usern").innerText = "";
    document.getElementById("username").innerText = "";
    document.getElementById("phx").innerText = "";
    document.getElementById("phone").innerText = "";
    document.getElementById("ema").innerText = "";
    document.getElementById("email").innerText = "";
    document.getElementById("editor").innerHTML =`


    <form name="modify" id="id">
    <textarea maxlength="20" rows ="2" cols = "33" name="first_name">${first_name}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="last_name">${last_name}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="username">${username}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="phone">${phone}</textarea><br><br>
    <textarea maxlength="20" rows ="2" cols = "33" name="email">${email}</textarea><br><br>

      <button type='submit' id="submit">change Profile</button>
    </form>
    <br/>

    `;

    document.getElementById("submit").addEventListener("click",
    function modifyEntry(event){
        event.preventDefault();
        let url = "https://senditparcel.herokuapp.com/api/v2/profile/"+user_id

            let first_name = document.forms["modify"]["first_name"].value;
            let last_name = document.forms["modify"]["last_name"].value;
            let username = document.forms["modify"]["username"].value;
            let phone = document.forms["modify"]["phone"].value;
            let email = document.forms["modify"]["email"].value;
            let data = {first_name:first_name, last_name:last_name, username:username, phone:phone, email:email}

            fetch(`${url}`, {
                method:"PUT", headers: {"Contant-Type":"application/json","Authorization":access_token},
                body:JSON.stringify(data)
            })
            .then((response)=>response.json())
            .then((data)=>{
                document.getElementById("change").innerText = data["message"]
                // window.location.replace("create_price.html")

            })
            .catch((error)=>console.log(error))

    });
}
