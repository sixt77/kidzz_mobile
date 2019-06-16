//toolbox
function show_snack_bar(text) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = text;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}





//application
function connexion(login, password) {
    identification(login, password, connexion_callback);
}

function connexion_callback(response) {
    response = JSON.parse(response);
    if(response[0] != undefined){
        show_snack_bar("connexion ok");
    }else{
        show_snack_bar("connexion refusé");
    }

}

function preparation_formulaire() {
    var formData = new FormData();
    var formElement = document.getElementById("form_test");
    var formData = new FormData(formElement);
    envoie_formuaire(formData, preparation_formulaire_callback);
}

function preparation_formulaire_callback(response) {
    console.log(response);
}