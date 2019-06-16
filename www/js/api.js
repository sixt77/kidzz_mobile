var host = "http://os-vps418.infomaniak.ch/etu_info/amsb1/TEST/index.php/";
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

function envoie_formuaire(formdata, success) {
    var request = new XMLHttpRequest();
    request.open("POST",host+'api?access=api&action=send_form', true);
    request.send(formdata);
    request.onreadystatechange = function () {
        if(request.readyState === 4){
            success(request.responseText);
        }
    }
}