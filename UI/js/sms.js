let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

let route = "https://senditparcel.herokuapp.com/api";



document.getElementById("sms").addEventListener("click",
function fetchprice(event){
    event.preventDefault()
    let url = route+"/admin/v2/sendmessage"
    let message = document.forms["create"]["message"].value;
    let data = {message:message};
    fetch(url, {method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":access_token
    },
    body:JSON.stringify(data)
})
.then ((response)=>response.json())
.then((data)=>{
    if (data){
        document.getElementById("msg").innerText = data["message"]
        // window.location.replace("create_price.html")
    }
    else{
        window.location.replace("sms.html")
    }
})
.catch(error => console.log('error:', error));

})


// Fatch All users data
fetch("https://senditparcel.herokuapp.com/api/admin/v2/users",{
    method: "GET",
    headers: {
        "Content-Type":"application/json",
        "Accept":"applicaton/json",
        "Authorization":access_token
    },
})
.then((response) =>{
    response.json().then((all_users)=>{
        console.log(all_users)
        if (all_users.message == 'Internal Server Error'){
            window.location.replace("login.html")
        }

        all_users = all_users["all_users"]
        let output = `

        <table class="table table-bordered table-striped mb-0">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Username</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>

            </tr>
          </thead>
          <tbody>`;

        Object.keys(all_users).forEach(function(sendt){

            output +=`

            <tr>
            <td>${all_users[sendt]["first_name"]}</td>
            <td>${all_users[sendt]["last_name"]}</td>
            <td>${all_users[sendt]["username"]}</td>
            <td>${all_users[sendt]["phone"]}</td>
            <td>${all_users[sendt]["email"]}</td>

           </tr>`;
        })
        document.getElementById("showsearch").innerHTML = output + `</table>`;

    })
    .catch(err => console.log(err));

})
