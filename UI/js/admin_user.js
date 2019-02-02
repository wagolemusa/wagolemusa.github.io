let token = JSON.parse(localStorage.getItem("access_token"));
let access_token = "Bearer " + token

if (token === null){
    redirect: window.location.replace("./pages/login")
}


fetch("https://senditparcel.herokuapp.com/api/admin/v2/users",{
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
