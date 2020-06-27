let token = localStorage.getItem('access_token')
let current_user = localStorage.getItem('current_user')
let access_token = "Bearer " + token

// let token = localStorage.getItem("access_token");
let route = "https://senditparcel.herokuapp.com/api";


document.getElementById("empy").addEventListener("click",
function fetchprice(event){
    event.preventDefault()
    let url = route+"/v2/employee"
    let first_name = document.forms["employee"]["first_name"].value;
    let last_name = document.forms["employee"]["last_name"].value;
    let username = document.forms["employee"]["username"].value;
    let email = document.forms["employee"]["email"].value;
    let permit_number = document.forms["employee"]["permit_number"].value
    let city = document.forms["employee"]["city"].value;
    let age = document.forms["employee"]["age"].value;
    let salary = document.forms["employee"]["salary"].value;
    let nation_id = document.forms["employee"]["nation_id"].value;
    let sex = document.forms["employee"]["sex"].value;
    let phone_number = document.forms["employee"]["phone_number"].value;
    let image = document.forms["employee"]["image"].value;
    let data = {first_name:first_name, last_name:last_name, username:username, email:email, permit_number:permit_number, city:city, age:age, salary:salary, nation_id:nation_id, sex:sex, phone_number:phone_number, image:image};
    fetch(url, {method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":access_token
    },
    body:JSON.stringify(data)
})
.then ((response)=>response.json())
.then((data)=> {
    if (data){
        document.getElementById("msg").innerText = data["message"]
        // window.location.replace("emplyeeshow.html")
    }
    else{
        window.location.replace("emplyeeshow.html")
    }
})
.catch(error => console.log('error:', error));

})