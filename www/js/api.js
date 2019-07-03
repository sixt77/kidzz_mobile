var host = "https://os-vps418.infomaniak.ch/etu_info/amsb1/TEST/index.php/";
////////////////////////////////////////////////////////toolbox//////////////////////////////////////////////////////////////////////////////////////////////
//fonction générique d'envoie de formulaire
function envoie_formulaire(formdata, success, action, parameters) {
    var request = new XMLHttpRequest();
    if(parameters != undefined){
        request.open("POST",host+'api?access=api&action='+action+parameters, true);
    }else{
        request.open("POST",host+'api?access=api&action='+action, true);
    }
    request.send(formdata);
    request.onreadystatechange = function () {
        if(request.readyState === 4){
            success(request.responseText);
        }
    }
}
////////////////////////////////////////////////////////application//////////////////////////////////////////////////////////////////////////////////////////////

//gestion des utilisateurs
//fonction d'identification
function identification(identifiant, password, success){
    var request = new XMLHttpRequest();
    request.open('GET', host+'api?access=api&action=login&login='+identifiant+'&password='+password, true);  // `false` makes the request synchronous
    request.send(null);
    request.onreadystatechange = function () {
        if(request.readyState === 4){
            success(request.responseText);
        }
    }
}

//gestion des utilisateurs
//fonction d'identification automatique
function identification_automatique(identifiant, password, success){
    var request = new XMLHttpRequest();
    request.open('GET', host+'api?access=api&action=automatic_login&login='+identifiant+'&password='+password, true);  // `false` makes the request synchronous
    request.send(null);
    request.onreadystatechange = function () {
        if(request.readyState === 4){
            success(request.responseText);
        }
    }
}





////////////////////////////////////////////////////////TEST//////////////////////////////////////////////////////////////////////////////////////////////



function recuperation_kidzz(id_kidzz, success) {
    var request = new XMLHttpRequest();
    request.open('GET', host+'api?access=api&action=play_kidzz&id_kidzz='+id_kidzz, true);  // `false` makes the request synchronous
    request.send(null);
    request.onreadystatechange = function () {
        if(request.readyState === 4){
            success(request.responseText);
        }
    }
}