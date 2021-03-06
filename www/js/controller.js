////////////////////////////////////////////////////////toolbox//////////////////////////////////////////////////////////////////////////////////////////////
function create_element($tag, $id, $class, $onclick, $html, $name, $required, $maxlenght, $oninput){
    var item = document.createElement($tag);
    if($id != "" && $id != undefined)item.setAttribute("id", $id);
    if($class != "" && $class != undefined)item.setAttribute("class", $class);
    if($onclick != "" && $onclick != undefined)item.setAttribute( "onclick", $onclick);
    if($html != "" && $html != undefined)item.innerHTML =$html;
    if($name != "" && $name != undefined)item.setAttribute("name", $name);
    if($required != "" && $required != undefined)item.setAttribute("required", 'required');
    if($maxlenght != "" && $maxlenght != undefined)item.maxLength = $maxlenght;
    if($oninput != "" && $oninput != undefined)item.setAttribute("oninput", $oninput);
    return item;
}

function create_label($for, $id, $class, $onclick, $html){
    var item = document.createElement('label');
    if($for != "" && $for != undefined)item.htmlFor = $for;
    if($id != "" && $id != undefined)item.setAttribute("id", $id);
    if($class != "" && $class != undefined)item.setAttribute("class", $class);
    if($onclick != "" && $onclick != undefined)item.setAttribute( "onclick", $onclick);
    if($html != "" && $html != undefined)item.innerHTML =$html;
    return item;
}

function create_input($type, $id, $class, $name, $required, $value, $cheked, $maxlenght, $oninput){
    var item = document.createElement("input");
    item.type = $type;
    if($id != "" && $id != undefined)item.setAttribute("id", $id);
    if($class != "" && $class != undefined)item.setAttribute("class", $class);
    if($name != "" && $name != undefined)item.setAttribute("name", $name);
    if($required != "" && $required != undefined)item.setAttribute("required", 'required');
    if($value != "" && $value != undefined)item.setAttribute("value", $value);
    if($cheked == true && $cheked != undefined)item.checked = true;
    if($maxlenght != "" && $maxlenght != undefined)item.maxLength = $maxlenght;
    if($oninput != "" && $oninput != undefined)item.setAttribute("oninput", $oninput);
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

function  add_class_by_id(id, classe) {
    $( "#"+id+"" ).addClass(classe);
}

function  add_class_by_class(class1, class2) {
    $( "."+class1+"" ).addClass(class2);
}

function remove_class_by_class(class1, class2) {
    $( "."+class1+"" ).removeClass(class2);
}

function  enable_by_class(class1) {
    $( "."+class1+"" ).prop( "disabled", false );
}

function disable_by_class(class1) {
    $( "."+class1+"" ).prop( "disabled", true );
    element = document.getElementsByClassName('disable_offline');
    for(var i = 0; i < element.length; i++){
        element[i].style.pointerEvents = 'none';
    }
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

function show_loading_snack_bar(text) {
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    if(!x.classList.contains("show")){
        x.classList.add("show");
    }
}

function show_snack_bar(text) {
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    if(!x.classList.contains("show")){
        x.classList.add("show");
    }
    setTimeout(function(){ x.classList.remove("show"); }, 4000);
}

function recuperation_formulaire(id) {
    var formElement = document.getElementById(id);
    var formData = new FormData(formElement);
    formData.append("utilisateur", sessionStorage.getItem('utilisateur'));
    return formData;
}

function ScrollToBottom($id) {
    document.getElementById($id).scrollTo(0,document.getElementById($id).scrollHeight);
}

function ScrollTotop($id) {
    document.getElementById($id).scrollTo(0,0);
}

////////////////////////////////////////////////////////application//////////////////////////////////////////////////////////////////////////////////////////////


//gestion de la session (connexion déconnexion)
//affichage formulaire login
function affichage_login() {
    if(localStorage.getItem("utilisateur") == null){
        document.getElementById('login').style.display = 'block';
    }

}

//connexion
function connexion(login, password) {
    input_log = document.getElementsByClassName('input-log');
    count = 0;
    for(var i = 0; i < input_log.length; i++){
        if(input_log[i].value != ''){
            count++;
        }
    }
    if(count == 2){
        show_loading_snack_bar("connexion...");
        identification(login, password, connexion_callback);
    }else{
        show_snack_bar("formulaire incomplet");
    }

}

//connexion automatique
function connexion_automatique() {
    if(localStorage.getItem("utilisateur") != null) {
        sessionStorage.setItem('utilisateur', localStorage.getItem("utilisateur"));
        document.location.href="home.html";
        //var utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
        //identification_automatique(utilisateur[1], utilisateur[2], connexion_callback);
    }
}

//connexion callback
function connexion_callback(response) {
    response = JSON.parse(response);
    console.log(response);
    if(response[0] == true){
        if(response[1] != false && response[1] != null){
            response = response[1];
            sessionStorage.setItem('utilisateur', JSON.stringify(response));
            localStorage.setItem('utilisateur', JSON.stringify(response));
            document.location.href="home.html";
        }else{
            show_snack_bar("identifiants incorrects");
            sessionStorage.removeItem('utilisateur');
            localStorage.removeItem('utilisateur');
        }
    }else{
        show_snack_bar(response[1]);
        sessionStorage.removeItem('utilisateur');
        localStorage.removeItem('utilisateur');
    }
}

//incription
function inscription(id) {
    input_log = document.getElementsByClassName('input-log');
    count = 0;
    for(var i = 0; i < input_log.length; i++){
        if(input_log[i].value != ''){
            count++;
        }
    }
    if(count == 4){
        show_loading_snack_bar("inscription...");
        envoie_formulaire(recuperation_formulaire(id), connexion_callback, 'subscribe');
    }else{
        show_snack_bar("formulaire incomplet");
    }

}


//déconnexion
function deconnexion() {
    sessionStorage.clear();
    localStorage.clear();
    document.location.href="index.html";
}
//redirection en cas de non connexion
function verification_connexion() {
    if(sessionStorage.getItem('utilisateur') == null){
        if(localStorage.getItem("utilisateur") != null){
            connexion_automatique();
        }else{
            document.location.href="index.html";
        }
    }
}



//place la session dans un formulaire
function recuperation_session() {
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
    kidzz = response;
    for (var i = 0; i < response.length; i++) {
        document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_'+response[i]['id'], 'kidzz_div_list'));
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_name_'+i,'kidzz_div_list_item kidzz_div_list_item_name','', response[i]['nom']));
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('i', 'button-edit_'+i,'fas fa-pen button-edit','preparation_edition_kidzz('+response[i]['id']+')', ""));
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_description_'+i,'kidzz_div_list_item kidzz_div_list_item_description','', response[i]['description']));
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_note_'+i,'kidzz_div_list_item kidzz_div_list_item_note','', response[i]['note']));
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('i', 'id_button_del_'+i,'fas fa-trash button-del','supprime_kidzz('+response[i]['id']+')', ""));
    }
}

//creation de kidzz
function verify_kidzz() {
    kidzz_input_log = document.getElementsByClassName('input-log');
    kidzz_input_question = document.getElementsByClassName('input-question');
    kidzz_input_answer = document.getElementsByClassName('input-answer');
    kidzz_input_explication = document.getElementsByClassName('question-explication-input');
    verif = true;
    for (var i in kidzz_input_log) {
        if(kidzz_input_log[i].value == ''){
            kidzz_input_log[i].classList.add('empty_input');
            verif = false;
        }
    }
    for (var j in kidzz_input_question) {
        if(kidzz_input_question[j].value == ''){
            kidzz_input_question[j].classList.add('empty_input');
            verif = false;
        }
    }
    for (var k in kidzz_input_answer) {
        if(kidzz_input_answer[k].value == ''){
            kidzz_input_answer[k].classList.add('empty_input');
            verif = false;
        }
    }
    for (var l in kidzz_input_explication) {
        if(kidzz_input_explication[l].value == ''){
            kidzz_input_explication[l].classList.add('empty_input');
            verif = false;
        }
    }
    return verif;
}

function verify_question() {
    question = document.getElementById('question_area').childNodes;
    verif = true;
    var i = 0;
    $loop = 1;
    while(i < question.length){
        if(question[i].nodeName == 'DIV'){
            count = 0;
            for (var j = 1; j < 5; j++) {
                if(document.getElementById('answer_'+j+'_'+($loop)+'_validity').checked == true){
                    count++;
                }
            }
            if(count == 0){
                verif = false;
            }
            $loop++;
        }
        i++;
    }
    return verif;
}


function verify_input_kidzz(item) {
    if(item.value != '' && item.classList.contains('empty_input')){
        item.classList.remove('empty_input');
    }
}

function creer_kidzz(id) {
    if(verify_kidzz()){
        if(verify_question()){
            show_loading_snack_bar("creation...");
            envoie_formulaire(recuperation_formulaire(id), creer_kidzz_callback, 'create_kidzz');
        }else{
            show_snack_bar('il faut au moins une réponse valide à toutes les questions');
        }
    }else{
        show_snack_bar('formulaire incomplet');
    }

}

function creer_kidzz_callback(response) {
    if(JSON.parse(response)[0] == true){
        sessionStorage.setItem('message', JSON.parse(response)[1]);
        document.location.href="manage_kidzz.html";
    }else{
        show_snack_bar(JSON.parse(response)[1]);
    }
}
//suppression de kidzz (kidzz + questions + reponses)
function supprime_kidzz(id) {
    show_loading_snack_bar("suppression...");
    envoie_formulaire(recuperation_session(), supprime_kidzz_callback, 'delete_kidzz', '&id_kidzz='+id);
}
function supprime_kidzz_callback(response) {
    if(JSON.parse(response)[0] == true){
        sessionStorage.setItem('message', JSON.parse(response)[1]);
        document.location.href="manage_kidzz.html";
    }else{
        show_snack_bar(JSON.parse(response)[1]);
    }
}
//formulaire de modification de kidzz
function preparation_edition_kidzz(id) {
    sessionStorage.setItem('id_kidzz', id);
    document.location.href="edit_kidzz_form.html";
}
function edition_kidzz() {
    envoie_formulaire(recuperation_session(), edition_kidzz_callback, 'edit_kidzz_form', '&id_kidzz='+sessionStorage.getItem('id_kidzz'));
}
function edition_kidzz_callback(response) {
    response = JSON.parse(response);
    if(response[0] == true){
        response = response[1];
        var kidzz = response['info'];
        fill_kidzz(kidzz);
        items = response['question'];
        fill_question("question_area");
    }else{
        show_snack_bar(response[1]);
    }

}

//modification de kidzz
function modifie_kidzz(id) {
    if(verify_kidzz()){
        if(verify_question()){
            show_loading_snack_bar("modification...");
            envoie_formulaire(recuperation_formulaire(id), modifie_kidzz_callback, 'edit_kidzz', '&id_kidzz='+sessionStorage.getItem('id_kidzz'));
        }else{
            show_snack_bar('il faut au moins une réponse valide à toutes les questions');
        }
    }else{
        show_snack_bar('formulaire incomplet');
    }
}

function modifie_kidzz_callback(response) {
    if(JSON.parse(response)[0] == true){
        sessionStorage.setItem('message', JSON.parse(response)[1]);
        document.location.href="manage_kidzz.html";
    }else{
        show_snack_bar(JSON.parse(response)[1]);
    }
}

//affichage des réponses
function verification_message() {
    if(sessionStorage.getItem('message')) {
        show_snack_bar(sessionStorage.getItem('message'));
        sessionStorage.removeItem('message');
    }
}




//jeux
//partie simple
//choix du kidzz dans les kidzz en ligne
function recuperation_kidzz_en_ligne() {
    envoie_formulaire(recuperation_session(), recuperation_kidzz_en_ligne_callback, 'play_online_kidzz');
}
function recuperation_kidzz_en_ligne_callback(response) {
    response = JSON.parse(response);
    if(response[0] == true){
        response = response[1];
        kidzz = response;
        for (var i = 0; i < response.length; i++) {
            document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_'+response[i]['id'], 'kidzz_div_list'));
            if(response[i]['favoris'] == true){
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_up_div_'+response[i]['id'],'disable_offline',"retirer_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_up_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_up_'+response[i]['id'],'fas fa-star button-star button-star-up disable_offline',"", ""));
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_down_div_'+response[i]['id'],'disable_offline disabled',"ajouter_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_down_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_down_'+response[i]['id'],'far fa-star button-star button-star-down  disable_offline disabled',"", ""));
            }else{
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_up_div_'+response[i]['id'],'disable_offline disabled',"retirer_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_up_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_up_'+response[i]['id'],'fas fa-star button-star button-star-up disable_offline disabled',"", ""));
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_down_div_'+response[i]['id'],'disable_offline',"ajouter_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_down_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_down_'+response[i]['id'],'far fa-star button-star button-star-down  disable_offline',"", ""));
            }
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_name_'+i,'kidzz_div_list_item kidzz_div_list_item_name','', response[i]['nom']));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('i', 'id_button_play_'+i,'fas fa-play button-play','choix_kidzz('+response[i]['id']+')', ""));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_description_'+i,'kidzz_div_list_item kidzz_div_list_item_description','', response[i]['description']));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_note_'+i,'kidzz_div_list_item kidzz_div_list_item_note','', response[i]['note']));
        }
    }else{
        show_snack_bar(response[1]);
    }

}

//choix du kidzz dans les kidzz de l'utilisateur
function recuperation_mes_kidzz() {
    if(network == true){
        recuperation_en_ligne_mes_kidzz();
    }else{
        recuperation_hors_ligne_mes_kidzz();
    }
}

function recuperation_en_ligne_mes_kidzz() {
    envoie_formulaire(recuperation_session(), recuperation_en_ligne_mes_kidzz_callback, 'play_my_kidzz');
}
function recuperation_en_ligne_mes_kidzz_callback(response) {
    response = JSON.parse(response);
    if(response[0] == true){
        response = response[1];
        kidzz = response;
        for (var i = 0; i < response.length; i++) {
            document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_' + response[i]['id'], 'kidzz_div_list'));
            if(response[i]['favoris'] == true){
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_up_div_'+response[i]['id'],'disable_offline',"retirer_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_up_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_up_'+response[i]['id'],'fas fa-star button-star button-star-up disable_offline',"", ""));
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_down_div_'+response[i]['id'],'disable_offline disabled',"ajouter_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_down_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_down_'+response[i]['id'],'far fa-star button-star button-star-down  disable_offline disabled',"", ""));
            }else{
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_up_div_'+response[i]['id'],'disable_offline disabled',"retirer_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_up_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_up_'+response[i]['id'],'fas fa-star button-star button-star-up disable_offline disabled',"", ""));
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_down_div_'+response[i]['id'],'disable_offline',"ajouter_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_down_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_down_'+response[i]['id'],'far fa-star button-star button-star-down  disable_offline',"", ""));
            }
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_name_' + i, 'kidzz_div_list_item kidzz_div_list_item_name', '', response[i]['nom']));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('i', 'id_button_play_'+i,'fas fa-play button-play','choix_kidzz('+response[i]['id']+')', ""));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_description_' + i, 'kidzz_div_list_item kidzz_div_list_item_description', '', response[i]['description']));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_note_' + i, 'kidzz_div_list_item kidzz_div_list_item_note', '', response[i]['note']));
        }
    }else{
        show_snack_bar(response[1]);
    }
}

//mode hors ligne
//recuperation des mes kidzz
function recuperation_hors_ligne_mes_kidzz() {
    kidzz_list =JSON.parse(localStorage.getItem('kidzz_list'))['user_kidzz_list'];
    local_kidzz = JSON.parse(localStorage.getItem('kidzz'));
    response = [];
    loop = 0;
    for (var i = 0; i < local_kidzz.length; i++) {
        if(kidzz_list.includes(local_kidzz[i]['info']['id'])){
            response[loop] = local_kidzz[i]['info'];
            loop++;
        }
    }
    kidzz = response;
    for (var i = 0; i < response.length; i++) {
        document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_'+response[i]['id'], 'kidzz_div_list'));
        if(response[i]['favoris'] == true){
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_up_div_'+response[i]['id'],'disable_offline',"retirer_favoris(" + response[i]['id']+")", ""));
            document.getElementById('id_button_star_up_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_up_'+response[i]['id'],'fas fa-star button-star button-star-up disable_offline',"", ""));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_down_div_'+response[i]['id'],'disable_offline disabled',"ajouter_favoris(" + response[i]['id']+")", ""));
            document.getElementById('id_button_star_down_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_down_'+response[i]['id'],'far fa-star button-star button-star-down  disable_offline disabled',"", ""));
        }else{
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_up_div_'+response[i]['id'],'disable_offline disabled',"retirer_favoris(" + response[i]['id']+")", ""));
            document.getElementById('id_button_star_up_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_up_'+response[i]['id'],'fas fa-star button-star button-star-up disable_offline disabled',"", ""));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_down_div_'+response[i]['id'],'disable_offline',"ajouter_favoris(" + response[i]['id']+")", ""));
            document.getElementById('id_button_star_down_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_down_'+response[i]['id'],'far fa-star button-star button-star-down  disable_offline',"", ""));
        }
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_name_'+i,'kidzz_div_list_item kidzz_div_list_item_name','', response[i]['nom']));
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('i', 'id_button_play_'+i,'fas fa-play button-play','choix_kidzz('+response[i]['id']+')', ""));
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_description_'+i,'kidzz_div_list_item kidzz_div_list_item_description','', response[i]['description']));
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_note_'+i,'kidzz_div_list_item kidzz_div_list_item_note','', response[i]['note']));
    }
    mode_hors_ligne();
}

//choix du kidzz dans les favoris de l'utilisateur
function recuperation_kidzz_favoris() {
    if(network == true){
        recuperation_en_ligne_kidzz_favoris();
    }else{
        recuperation_hors_ligne_kidzz_favoris();
    }
}

function recuperation_en_ligne_kidzz_favoris() {
    envoie_formulaire(recuperation_session(), recuperation_en_ligne_kidzz_favoris_callback, 'play_favorite_kidzz');
}
function recuperation_en_ligne_kidzz_favoris_callback(response) {
    response = JSON.parse(response);
    if(response[0] == true){
        response = response[1];
        kidzz = response;
        for (var i = 0; i < response.length; i++) {
            document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_' + response[i]['id'], 'kidzz_div_list'));
            if(response[i]['favoris'] == true){
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_up_div_'+response[i]['id'],'disable_offline',"retirer_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_up_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_up_'+response[i]['id'],'fas fa-star button-star button-star-up disable_offline',"", ""));
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_down_div_'+response[i]['id'],'disable_offline disabled',"ajouter_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_down_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_down_'+response[i]['id'],'far fa-star button-star button-star-down  disable_offline disabled',"", ""));
            }else{
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_up_div_'+response[i]['id'],'disable_offline disabled',"retirer_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_up_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_up_'+response[i]['id'],'fas fa-star button-star button-star-up disable_offline disabled',"", ""));
                document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_down_div_'+response[i]['id'],'disable_offline',"ajouter_favoris(" + response[i]['id']+")", ""));
                document.getElementById('id_button_star_down_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_down_'+response[i]['id'],'far fa-star button-star button-star-down  disable_offline',"", ""));
            }
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_name_' + i, 'kidzz_div_list_item kidzz_div_list_item_name', '', response[i]['nom']));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('i', 'id_button_play_'+i,'fas fa-play button-play','choix_kidzz('+response[i]['id']+')', ""));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_description_' + i, 'kidzz_div_list_item kidzz_div_list_item_description', '', response[i]['description']));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_note_' + i, 'kidzz_div_list_item kidzz_div_list_item_note', '', response[i]['note']));
        }
    }else{
        show_snack_bar(response[1]);
    }
}

//mode hors ligne
//recuperation de mes favoris
function recuperation_hors_ligne_kidzz_favoris() {
    kidzz_list =JSON.parse(localStorage.getItem('kidzz_list'))['user_favorite_list'];
    local_kidzz = JSON.parse(localStorage.getItem('kidzz'));
    response = [];
    loop = 0;
    for (var i = 0; i < local_kidzz.length; i++) {
        if(kidzz_list.includes(local_kidzz[i]['info']['id'])){
            response[loop] = local_kidzz[i]['info'];
            loop++;
        }
    }
    kidzz = response;
    for (var i = 0; i < response.length; i++) {
        document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_' + response[i]['id'], 'kidzz_div_list'));
        if(response[i]['favoris'] == true){
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_up_div_'+response[i]['id'],'disable_offline',"retirer_favoris(" + response[i]['id']+")", ""));
            document.getElementById('id_button_star_up_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_up_'+response[i]['id'],'fas fa-star button-star button-star-up disable_offline',"", ""));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_down_div_'+response[i]['id'],'disable_offline disabled',"ajouter_favoris(" + response[i]['id']+")", ""));
            document.getElementById('id_button_star_down_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_down_'+response[i]['id'],'far fa-star button-star button-star-down  disable_offline disabled',"", ""));
        }else{
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_up_div_'+response[i]['id'],'disable_offline disabled',"retirer_favoris(" + response[i]['id']+")", ""));
            document.getElementById('id_button_star_up_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_up_'+response[i]['id'],'fas fa-star button-star button-star-up disable_offline disabled',"", ""));
            document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('div', 'id_button_star_down_div_'+response[i]['id'],'disable_offline',"ajouter_favoris(" + response[i]['id']+")", ""));
            document.getElementById('id_button_star_down_div_'+response[i]['id']).appendChild(create_element('i', 'id_button_star_down_'+response[i]['id'],'far fa-star button-star button-star-down  disable_offline',"", ""));
        }
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_name_' + i, 'kidzz_div_list_item kidzz_div_list_item_name', '', response[i]['nom']));
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('i', 'id_button_play_'+i,'fas fa-play button-play','choix_kidzz('+response[i]['id']+')', ""));
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_description_' + i, 'kidzz_div_list_item kidzz_div_list_item_description', '', response[i]['description']));
        document.getElementById('kidzz_' + response[i]['id']).appendChild(create_element('p', 'id_kdzz_note_' + i, 'kidzz_div_list_item kidzz_div_list_item_note', '', response[i]['note']));
    }
    mode_hors_ligne();
}

//lancement de la partie
function choix_kidzz(id) {
    sessionStorage.setItem('id_kidzz', id);
    document.location.href="play_kidzz.html";
}

function preparation_jeux() {
    if(network){
        preparation_en_ligne_jeux();
    }else{
        preparation_hors_ligne_jeux();
    }

}

function preparation_en_ligne_jeux() {
    if(sessionStorage.getItem('id_kidzz')){
        envoie_formulaire(recuperation_session(), preparation_en_ligne_jeux_callback, 'play_kidzz', '&id_kidzz='+sessionStorage.getItem('id_kidzz'));
    }else{
        show_snack_bar("erreur");
    }
}

function preparation_en_ligne_jeux_callback(response) {
    response = JSON.parse(response);
    if(response[0] == true){
        response = response[1];
        items =  response['question'];
        kidzz = response['info'];
        kidzz['note'] = response['note'];
        kidzz['note_utilisateur'] = response['note_utilisateur'];
        kidzz['favoris'] = response['favoris'];
    }else{
        show_snack_bar(response[1]);
    }

}

//mode hors ligne
//jouer a un jeux hors ligne
function preparation_hors_ligne_jeux() {
    if(sessionStorage.getItem('id_kidzz')){
        kidzz_list = JSON.parse(localStorage.getItem('kidzz'));
        find = false;
        loop = 0;
        while(!find && loop < kidzz_list.length){
            if(kidzz_list[loop]['info']['id'] == sessionStorage.getItem('id_kidzz')){
                items = kidzz_list[loop]['question'];
                find = true;
            }
            loop++;
        }
    }else{
        show_snack_bar("erreur");
    }

}



//notation du kidzz
function noter_kidzz(id) {
    show_loading_snack_bar("notation en cours...");
    envoie_formulaire(recuperation_formulaire(id), noter_kidzz_callback, 'rate_kidzz', '&id_kidzz='+sessionStorage.getItem('id_kidzz'));
}

function noter_kidzz_callback(response) {
    if(JSON.parse(response)[0] == true){
        sessionStorage.setItem('message', JSON.parse(response)[1]);
        document.location.href="home.html";
    }else{
        show_snack_bar(JSON.parse(response)[1]);
    }
}

//report du kidzz
function reporter_kidzz(id) {
    show_loading_snack_bar("report en cours...");
    envoie_formulaire(recuperation_formulaire(id), reporter_kidzz_callback, 'report_kidzz', '&id_kidzz='+sessionStorage.getItem('id_kidzz'));
}

function reporter_kidzz_callback(response) {
    if(JSON.parse(response)[0] == true){
        sessionStorage.setItem('message', JSON.parse(response)[1]);
        document.location.href="home.html";
    }else{
        show_snack_bar(JSON.parse(response)[1]);
    }
}

//ajout en favoris
function ajouter_favoris(id){
    show_loading_snack_bar("ajout en cours...");
    envoie_formulaire(recuperation_session(), ajouter_favoris_callback, 'add_kidzz_to_favorite', '&id_kidzz='+id);
}

function ajouter_favoris_callback(response){
    response = JSON.parse(response);
    if(response[0] == true){
        document.getElementById('id_button_star_down_div_'+response[2]).classList.add("disabled");
        document.getElementById('id_button_star_down_'+response[2]).classList.add("disabled");
        document.getElementById('id_button_star_up_div_'+response[2]).classList.remove("disabled");
        document.getElementById('id_button_star_up_'+response[2]).classList.remove("disabled");
        show_snack_bar(response[1]);
    }else{
        show_snack_bar(JSON.parse(response)[1]);
    }
}

//retrait favoris
function retirer_favoris(id){
    show_loading_snack_bar("retrait en cours...");
    envoie_formulaire(recuperation_session(), retirer_favoris_callback, 'remove_kidzz_to_favorite', '&id_kidzz='+id);
}

function retirer_favoris_callback(response){
    response = JSON.parse(response);
    if(response[0] == true){
        document.getElementById('id_button_star_up_div_'+response[2]).classList.add("disabled");
        document.getElementById('id_button_star_up_'+response[2]).classList.add("disabled");
        document.getElementById('id_button_star_down_div_'+response[2]).classList.remove("disabled");
        document.getElementById('id_button_star_down_'+response[2]).classList.remove("disabled");
        show_snack_bar(response[1]);
    }else{
        show_snack_bar(JSON.parse(response)[1]);
    }
}

//mode hors ligne
//verification
function verification_reseau() {
    if(sessionStorage.getItem('network') == 'false'){
        network = false;
        mode_hors_ligne();
    }else if(sessionStorage.getItem('network') == 'true'){
        network = true;
        mode_en_ligne();
    }
    document.addEventListener("offline", mode_hors_ligne, false);
    document.addEventListener("online", mode_en_ligne, false);
}

//mode en ligne
function mode_en_ligne() {
    sessionStorage.setItem('network', 'true');
    classe = document.getElementsByClassName("link_disable_offline");
    for (var i in classe) {
        classe[i].onclick = classe[i].content;
    }
    network = true;
    enable_by_class("disable_offline");
    remove_class_by_class("disable_offline", "offline_mode");
}


//mode hors ligne
function mode_hors_ligne() {
    sessionStorage.setItem('network', 'false');
    classe = document.getElementsByClassName("link_disable_offline");
    for (var i in classe) {
        classe[i].content = classe[i].onclick;
        classe[i].onclick = function() {return false;};
    }
    disable_by_class("disable_offline");
    add_class_by_class("disable_offline", "offline_mode");
    network = false;

}

//verification des données hors ligne
function verification_kidzz_hors_ligne() {
    show_loading_snack_bar("verification des données");
    envoie_formulaire(recuperation_session(), verification_kidzz_hors_ligne_callback, 'check_offline_kidzz');
}
function verification_kidzz_hors_ligne_callback(response) {
    response = JSON.parse(response);
    if(response[0] == true){
        $local_data = JSON.parse(localStorage.getItem("kidzz_list"));
        $data =  response[1];
        if($local_data == null || JSON.stringify($local_data) != JSON.stringify($data) || JSON.parse(localStorage.getItem('kidzz')) == 'false'){
            recuperation_kidzz_hors_ligne();
            localStorage.setItem("kidzz_list", JSON.stringify($data));
        }else{
            show_snack_bar("vos données sont déja a jour ! ");
        }
    }else{
        show_snack_bar(response[1]);
    }
}

//recuperation des données hors lignes
function recuperation_kidzz_hors_ligne() {
    show_loading_snack_bar("téléchargement des données");
    envoie_formulaire(recuperation_session(), recuperation_kidzz_hors_ligne_callback, 'get_offline_kidzz');
}
function recuperation_kidzz_hors_ligne_callback(response) {
    response = JSON.parse(response);
    if(response[0] == true){
        if(response.length < 2000000) {
            localStorage.setItem('kidzz', JSON.stringify(response[1]));
            show_snack_bar("vos données on été mis a jour ! ");
        }else{
            show_snack_bar("pas assez d'espace de stockage");
        }
    }else{
        show_snack_bar(response[1]);
    }

}




////////////////////////////////////////////////////////TEST//////////////////////////////////////////////////////////////////////////////////////////////

//lancement de la partie
function test_choix_kidzz(id) {
    sessionStorage.setItem('id_kidzz', id);
}