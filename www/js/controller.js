////////////////////////////////////////////////////////toolbox//////////////////////////////////////////////////////////////////////////////////////////////
function create_element($tag, $id, $class, $onclick, $html){
    var item = document.createElement($tag);
    if($id != "" && $id != undefined)item.setAttribute("id", $id);
    if($class != "" && $class != undefined)item.setAttribute("class", $class);
    if($onclick != "" && $onclick != undefined)item.setAttribute( "onclick", $onclick);
    if($html != "" && $html != undefined)item.innerHTML =$html;
    return item;
}

function create_input($type, $id, $class, $name, $required, $value, $cheked){
    var item = document.createElement("input");
    item.type = $type;
    if($id != "" && $id != undefined)item.setAttribute("id", $id);
    if($class != "" && $class != undefined)item.setAttribute("class", $class);
    if($name != "" && $name != undefined)item.setAttribute("name", $name);
    if($required != "" && $required != undefined)item.setAttribute("required", 'required');
    if($value != "" && $value != undefined)item.setAttribute("value", $value);
    if($cheked =  true && $cheked != undefined)item.checked = true;
    return item;
}

function create_button($id, $class, $value, $onclick){
    var item = document.createElement("input");
    item.type = "button";
    if($id != "" && $id != undefined)item.setAttribute("id", $id);
    if($class != "" && $class != undefined)item.setAttribute("class", $class);
    if($onclick != "" && $onclick != undefined)item.setAttribute( "onclick", $onclick);
    if($value != "" && $value != undefined)item.value = $value;
    return item;
}

function  add_class_by_class(class1, class2) {
    $( "."+class1+"" ).addClass(class2);
}

function remove_class_by_id(id, class1) {
    $( "#"+id+"" ).removeClass(class1);
}

function hide_class($class) {
    $( "."+$class+"" ).hide();
}

function hide_id($id) {
    $( "#"+$id+"" ).hide();
}

function show_id($id) {
    $( "#"+$id+"" ).show();
}

function remove_class($class) {
    $( "."+$class+"" ).remove();
}

function remove_id($id) {
    $( "#"+$id+"" ).remove();
}


function count_class($class){
    return $( "."+$class+"" ).length;
}

function show_snack_bar(text) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = text;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function recuperation_formulaire(id) {
    var formElement = document.getElementById(id);
    var formData = new FormData(formElement);
    formData.append("utilisateur", sessionStorage.getItem('utilisateur'));
    return formData;
}



////////////////////////////////////////////////////////application//////////////////////////////////////////////////////////////////////////////////////////////


//gestion de la session (connexion déconnexion)
//connexion
function connexion(login, password) {
    identification(login, password, connexion_callback);
}

//connexion callback
function connexion_callback(response) {
    response = JSON.parse(response);
    if(response !== null && response[0] !== undefined){
        sessionStorage.setItem('utilisateur', JSON.stringify(response));
        document.location.href="home.html";
    }else{
        show_snack_bar("connexion refusé");
    }

}
//déconnexion
function deconnexion() {
    sessionStorage.clear();
    document.location.href="login.html";
}
//redirection en cas de non connexion
function verification_connexion() {
    if(sessionStorage.getItem('utilisateur') == null){
        document.location.href="login.html";
    }
}

//place la session dans un formulaire
function recuperation_session(){
    var formData = new FormData();
    formData.append("utilisateur", sessionStorage.getItem('utilisateur'));
    return formData;
}

    //gestion des kidzz
//affichage de la page de gestion des quizz
function gestion_kidzz() {
    envoie_formulaire(recuperation_session(), gestion_kidzz_callback, 'manage_kidzz');
}
function gestion_kidzz_callback(response) {
    response = JSON.parse(response);
    for (var i = 0; i < response.length; i++) {
        document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_'+response[i]['id'], 'kidzz_div_list'));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['nom']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['description']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['note']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_button('','','-', 'supprime_kidzz('+response[i]['id']+')'));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_button('','','e', 'preparation_edition_kidzz('+response[i]['id']+')'));
    }
}

//creation de kidzz
function creer_kidzz(id) {
    envoie_formulaire(recuperation_formulaire(id), creer_kidzz_callback, 'create_kidzz');
}

function creer_kidzz_callback(response) {
    document.location.href="manage_kidzz.html";
}
//suppression de kidzz (kidzz + questions + reponses)
function supprime_kidzz(id) {
    envoie_formulaire(recuperation_session(), supprime_kidzz_callback, 'delete_kidzz', '&id_kidzz='+id);
}
function supprime_kidzz_callback(response) {
    document.location.href="manage_kidzz.html";
}
//formulaire de modification de kidzz
function preparation_edition_kidzz(id) {
    sessionStorage.setItem('id_kidzz', id);
    document.location.href="edit_kidzz_form.html";
}
function edition_kidzz() {
    envoie_formulaire(recuperation_session(), edition_kidzz_callback, 'edit_kidzz_form', sessionStorage.getItem('id_kidzz'));
}
function edition_kidzz_callback(response) {
    document.location.href="manage_kidzz.html";
}

//modification de kidzz






//jeux
    //partie simple
    //choix du kidzz dans les kidzz en ligne
function recuperation_kidzz_en_ligne() {
    envoie_formulaire(recuperation_session(), recuperation_kidzz_en_ligne_callback, 'play_online_kidzz');
}
function recuperation_kidzz_en_ligne_callback(response) {
    response = JSON.parse(response);
    for (var i = 0; i < response.length; i++) {
        document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_'+response[i]['id'], 'kidzz_div_list'));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['nom']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['description']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['note']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_button('','','play', 'choix_kidzz('+response[i]['id']+')'));
    }
}

    //choix du kidzz dans les kidzz de l'utilisateur
function recuperation_mes_kidzz() {
    envoie_formulaire(recuperation_session(), recuperation_mes_kidzz_callback, 'play_my_kidzz');
}
function recuperation_mes_kidzz_callback(response) {
    response = JSON.parse(response);
    for (var i = 0; i < response.length; i++) {
        document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_'+response[i]['id'], 'kidzz_div_list'));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['nom']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['description']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['note']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_button('','','play', 'choix_kidzz('+response[i]['id']+')'));
    }
}

    //choix du kidzz dans les favoris de l'utilisateur
function recuperation_kidzz_favoris() {
    envoie_formulaire(recuperation_session(), recuperation_kidzz_en_ligne_callback, 'play_favorite_kidzz');
}
function recuperation_kidzz_favoris_callback(response) {
    response = JSON.parse(response);
    for (var i = 0; i < response.length; i++) {
        document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_'+response[i]['id'], 'kidzz_div_list'));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['nom']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['description']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['note']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_button('','','play', 'choix_kidzz('+response[i]['id']+')'));
    }
}

    //lancement de la partie
function choix_kidzz(id) {
    sessionStorage.setItem('id_kidzz', id);
    document.location.href="play_kidzz.html";
}

function preparation_jeux() {
    if(sessionStorage.getItem('id_kidzz')){
        envoie_formulaire(recuperation_session(), preparation_jeux_callback, 'play_kidzz', '&id_kidzz='+sessionStorage.getItem('id_kidzz'));
    }else{
        show_snack_bar("erreur");
    }
}

function preparation_jeux_callback(response) {
    items =  JSON.parse(response)['question'];
}


    //notation du kidzz


////////////////////////////////////////////////////////TEST//////////////////////////////////////////////////////////////////////////////////////////////







