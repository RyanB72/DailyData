const d = new Date();

window.onload = getDailyData();

function getDailyData() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(JSON.parse(this.responseText));

            var jsonReponse = JSON.parse(this.responseText);
            
            document.getElementById('push').innerHTML = "PUSH-UPS "+jsonReponse.pushUp;
            document.getElementById('pull').innerHTML = "PULL-UPS "+jsonReponse.pullUp;

            document.getElementById('d').innerHTML = d.getDate() + " / " + (d.getMonth()+1);
        }
    };
    xhttp.open("GET", "/todaysData", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function addPushUp(am) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("pushups updated");
        }
    };
    xhttp.open("POST", "/updatePushUpNumber", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({amount:am}));

    getDailyData()
}

function addPullUp(am) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("pullups updated");
        }
    };
    xhttp.open("POST", "/updatePullUpNumber", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({amount:am}));

    getDailyData()
}