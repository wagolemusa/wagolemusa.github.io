
let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

if(!token){
    window.location.replace("login.html");
}
// Set username on topnav
function setUserName(){
    document.getElementById('current-user').innerHTML = current_user;
  }


// Get All users
fetch("https://senditparcel.herokuapp.com/api/admin/v2/users",{
    method:"GET",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":access_token
    },
})
.then((response)=>{
    response.json().then((all_users)=>{
        console.log(all_users)
        if (data.message == 'Internal Server Error'){
            window.location.replace("login.html")
        }
    

        all_users = all_users["all_users"]
        let output =`
        <table id="NewTable">
        <tr class="header">
        <th style="width:20%;">Firstname</th>
        <th style="width:25%;">LastName</th>
        <th style="width:25%;">Username</th>
        <th style="width:25%;">Phone Number</th>
        <th style="width:25%;">Email</th>
       `;
        Object.keys(all_users).forEach(function(user){
            let first_name = all_users[user]["first_name"]
            let last_name = all_users[user]["last_name"]
            let username = all_users[user]["username"]
            let phone = all_users[user]["phone"]
            let email = all_users[user]["email"]

            output +=`
            </tr>
            <td>${all_users[user]["first_name"]}</td>
            <td>${all_users[user]["last_name"]}</td>
            <td>${all_users[user]["username"]}</td>
            <td>${all_users[user]["phone"]}</td>
            <td>${all_users[user]["email"]}</td> `;
        });
        document.getElementById("shows_user").innerHTML = output + `</table>`;
    
    })
    .catch((error) => console.log(error))
       
})