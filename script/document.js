var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var showsyes = document.getElementById('shows');
var span = document.getElementsByClassName("close")[0];

/*btn.onclick = function() {
    modal.style.display = "block";
}*/

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onclick = function(){
    if (event.target == showsyes){
    window.location.replace("show.html");
    }
}

// var modal2 = document.getElementById('myModal2');
// var btn = document.getElementById("myBtn1");

// var span = document.getElementsByClassName("close1")[0];

// /*btn.onclick = function() {
//     modal.style.display = "block";
// }*/

// // span.onclick = function() {
// //     modal2.style.display = "none";
// // }

// // window.onclick = function(event) {
// //     if (event.target == modal2) {
// //         modal2.style.display = "none";
// //     }
// // }

// span.onclick = function() {
//     modal.style.display = "none";
// }

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }