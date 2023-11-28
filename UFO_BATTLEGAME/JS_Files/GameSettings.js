
window.onload = function() {

    // If there are saved preferences, load them
    if(localStorage.getItem("numberOfUFOs") != null){
        document.getElementById("numberOfUFOs").value = localStorage.getItem("numberOfUFOs");
    }

    if(localStorage.getItem("playTime") != null){
        document.getElementById("playTime").value = localStorage.getItem("playTime");
    }

    document.getElementById("savemypref").addEventListener("click", SavePreferences);

}

function SavePreferences() {

    // Get the values from the form and store them in local storage
    const numberOfUFOs = document.getElementById("numberOfUFOs").value;
    const playTime = document.getElementById("playTime").value;

    localStorage.setItem("numberOfUFOs", numberOfUFOs);
    localStorage.setItem("playTime", playTime);

    alert("Preferences saved!");
}