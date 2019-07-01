/////////////////////////////////////////////////////////////////////////////application///////////////////////////////////////////////////////////////////////////////

//ajout de question a la creation de kidzz
function add_question(id, incr) {
    document.getElementById(id).appendChild(create_element("div", "div_question_" + incr, "", "", ""));

    //ajout question
    document.getElementById("div_question_" + incr).appendChild(create_element("div", "question_"+incr, "question_form", "", ""));
    document.getElementById("question_" + incr).appendChild(create_element("div", "", "name-question", "", "Question n°"+incr+" :"));
    document.getElementById("question_" + incr).appendChild(create_element("div", "", "", "", "Nom"));
    document.getElementById("question_" + incr).appendChild(create_input("text", "", "input-question","question_"+incr, "required"));


    //ajout reponse
    for (var i = 1; i < 5; i++) {
        document.getElementById("div_question_" + incr).appendChild(create_label("answer_"+i+"_"+incr+"_validity", "answer_"+i+"_"+incr, "label-container", "", ""));
        document.getElementById("answer_" + i + "_"+incr).appendChild(create_input("checkbox", "answer_"+i+"_"+incr+"_validity", "disabled", "answer_"+i+"_"+incr+"_validity", true));
        document.getElementById("answer_" + i + "_"+incr).appendChild(create_element("span", "", "", "", "Réponse "+i));
        document.getElementById("answer_" + i + "_"+incr).appendChild(create_input("text", "", "init-button input-answer","answer_"+i+"_"+incr, "required"));
    }


    //ajout explication
    document.getElementById("div_question_" + incr).appendChild(create_element("div", "form_explication_"+incr, "", "", ""));
    document.getElementById("form_explication_" + incr).appendChild(create_element("span", "", "name-question question-explication", "", "Explication"));
    document.getElementById("form_explication_" + incr).appendChild(create_element("textarea", "", "input-log question-explication-input", "", "", "question_"+incr+"_explication", "true"));

    if(count_class("question_form")>1 && count_class("form_delete_button") === 0) {
        document.getElementById("remove_question").appendChild(create_element("LI", "form_delete_button", "form_delete_button", "", ""));
        document.getElementById("form_delete_button").appendChild(create_element("i", "", "fas fa-trash-alt button-del", "delete_question()"));
    }
}

//suppression de question a la creation de kidzz
function delete_question(){
    let nb = count_class("question_form");
    if(nb>1){
        remove_id("question_"+nb);
        for (var i = 1; i < 5; i++) {
            remove_id("answer_"+i+"_"+nb);
        }
        remove_id("form_explication_"+nb);
    }
    if(nb===2 || nb < 2){
        remove_id("form_delete_button");
    }
}
//rempli les infos du kidzz
function fill_kidzz(kidzz) {
    document.getElementById('kidzz_name').value = kidzz['nom'];
    document.getElementById('kidzz_description').value = kidzz['description'];
}


//ajout de question a la modification de kidzz
function fill_question(id) {

    for(var i = 0; i < items.length; i++){

        document.getElementById(id).appendChild(create_element("div", "div_question_" + (i+1), "", "", ""));

        //ajout question
        document.getElementById("div_question_" + (i+1)).appendChild(create_element("div", "question_"+(i+1), "question_form", "", ""));
        document.getElementById("question_" + (i+1)).appendChild(create_element("div", "", "name-question", "", "Question n°"+(i+1)+" :"));
        document.getElementById("question_" + (i+1)).appendChild(create_element("div", "", "", "", "Nom"));
        document.getElementById("question_" + (i+1)).appendChild(create_input("text", "", "input-question","question_"+(i+1), "required", items[i]['info']['valeur']));


        //ajout reponse
        for (var j = 0; j < items[i]['answer'].length; j++) {
            document.getElementById("div_question_" + (i+1)).appendChild(create_label("answer_"+(j+1)+"_"+(i+1)+"_validity", "answer_"+(j+1)+"_"+(i+1), "label-container", "", ""));
            if(items[i]['answer'][j]['valide'] ==  1){
                document.getElementById("answer_" + (j+1) + "_" + (i+1)).appendChild(create_input("checkbox", "answer_"+(j+1)+"_"+(i+1)+"_validity", "disabled","answer_"+(j+1)+"_"+(i+1)+"_validity", "", "", true));
            }else{
                document.getElementById("answer_" + (j+1) + "_" + (i+1)).appendChild(create_input("checkbox", "answer_"+(j+1)+"_"+(i+1)+"_validity", "disabled","answer_"+(j+1)+"_"+(i+1)+"_validity", ""));
            }
            document.getElementById("answer_" + (j+1) + "_" + (i+1)).appendChild(create_element("span", "", "", "", "Réponse "+(j+1)+" :"));
            document.getElementById("answer_" + (j+1) + "_" + (i+1)).appendChild(create_input("text", "", "init-button input-answer","answer_"+(j+1)+"_"+(i+1), "required", items[i]['answer'][j]['valeur']));


        }

        //ajout explication
        document.getElementById("div_question_" + (i+1)).appendChild(create_element("div", "form_explication_"+(i+1), "", "", ""));
        document.getElementById("form_explication_" + (i+1)).appendChild(create_element("span", "", "name-question question-explication", "", "Explication"));
        document.getElementById("form_explication_" + (i+1)).appendChild(create_element("textarea", "", "input-log question-explication-input", "", items[i]['info']['explication'], "question_"+(i+1)+"_explication", "true"));


        if(count_class("question_form")>1 && count_class("form_delete_button") === 0) {
            document.getElementById("remove_question").appendChild(create_element("LI", "form_delete_button", "form_delete_button", "", ""));
            document.getElementById("form_delete_button").appendChild(create_element("i", "", "fas fa-trash-alt button-del", "delete_question()"));
        }
    }

}



//ajout de joueur au lancement du jeux
function add_user(id, incr) {
    //ajout joueur
    document.getElementById(id).appendChild(create_element("LI", "joueur_" + incr, "user_form", "", "joueur " + incr + " :"));
    document.getElementById("joueur_" + incr).appendChild(create_element("label", "form_label_" + incr, "", "", ""));
    document.getElementById("joueur_" + incr).appendChild(create_input("text", "joueur_"+incr+"_name", "joueur_text kidzz_input", "joueur_" + incr, "required"));
    if(count_class("user_form")>1 && count_class("form_delete_button") === 0) {
        document.getElementById("remove_user").appendChild(create_element("LI", "form_delete_button", "form_delete_button ", "", ""));
        document.getElementById("form_delete_button").appendChild(create_button("button", "kidzz_button", "-", "delete_user()"));
    }
}

//suppression de joueur au lancement du jeux
function delete_user(){
    let nb = count_class("user_form");
    if(nb>1){
        remove_id("joueur_"+nb);
    }
    if(nb===2 || nb < 2){
        remove_id("form_delete_button");
    }
}

//lancement du jeux
function start_game() {
    if(typeof items !== 'undefined'){
        player_list = get_player_list();
        if(player_list !== null){
            incr = 0;
            hide_class("game_div");
            hide_class("large_game_div");
            show_id("game");
            remove_id("game_setup");
            game_turn();
        }else{
            show_snack_bar("il faut au moins un joueur !!");
        }
    }else{
        show_snack_bar("erreur, veuillez raffraichir vos données");
    }
}

//déroulement des tours
function game_turn() {
    if(incr < items.length){
        display_player_list(player_list, "player_in_game_list");
        if(incr > 0){
            remove_class("question_div");
            remove_class("reponse_div");
        }
        document.getElementById("question").appendChild(create_element("div", "question_"+incr, "question_div", "", ""));
        document.getElementById("question_"+incr).appendChild(create_element("div", "question_item"+incr, "question_item", "", ""+items[incr]['info']['valeur']));
        for(i = 0; i < items[incr]['answer'].length; i++) {
            document.getElementById("reponse").appendChild(create_element("div", "answer_"+i, "reponse_div reponse_div_"+(i+1)+" droptarget", "move_player("+i+")", ""));
            document.getElementById("answer_"+i).appendChild(create_element("div", "answer_item"+i, "answer_item", "", ""+items[incr]['answer'][i]['valeur']));
        }
    }else{
        end_game();
    }
}

//validation des tours
function valid_turn() {
    if(count_class("explication_div")===0){
        hide_id('reponse');
        show_id('explication');
        document.getElementById("explication").appendChild(create_element("div", incr, "explication_div", "", items[incr]['info']['explication']));
        count_point();
    }else{
        remove_class("explication_div");
        hide_id('explication');
        show_id('reponse');
        incr++;
        game_turn(incr);
    }
}

//verifie les réponse et ajoute les point
function count_point(){
    div_list = document.getElementsByClassName("reponse_div");
    for(var i = 0; i < div_list.length; i++){
        if(items[incr]['answer'][i]['valide'] == 1){
            player_list_by_div = div_list[i].childNodes;
            for(var j = 0; j < player_list_by_div.length; j++){
                if(player_list_by_div[j].className !== undefined && player_list_by_div[j].className.includes("joueur_div")){
                    player_list[player_list_by_div[j].id.split('_')[1]][1] = player_list[player_list_by_div[j].id.split('_')[1]][1]+10;
                }
            }
        }
    }
}

//deplacement des joueurs
//click
function select_player(id){
    remove_class_by_class('joueur_div', 'selected');
    add_class_by_id('joueur_'+id, 'selected');
}

function move_player(id){
    player = document.getElementsByClassName('selected');
    for(var i = 0; i < player.length; i++){
        document.getElementById('answer_'+id).append(player[i]);
    }
}

//drag&drop
/* Events fired on the drag target */
document.ondragstart = function() {
    event.dataTransfer.setData("Text", event.target.id);
};



/* Events fired on the drop target */
document.ondragover = function() {
    event.preventDefault();
};

document.ondrop = function() {
    event.preventDefault();
    if ( event.target.className.includes("droptarget")) {
        var data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));
    }
};

//fin du jeux
function end_game() {
    hide_class("game_div");
    hide_class("large_game_div");
    show_id("end_game");
    if(kidzz['note_utilisateur'] == 5){
        document.getElementById("rate+").checked = true;
    }else if(kidzz['note_utilisateur'] == 0){
        document.getElementById("rate-").checked = true;
    }
    if(kidzz['favoris'] == true){
        document.getElementById('favorite_checkbox').checked = true;
    }
    console.log(kidzz);
    player_list.sort(function(a, b){return b[1] - a[1]});
    display_player_list_with_score(player_list, "player_list_end_game");

}

//recuperation des joueurs
function get_player_list() {
    j=0;
    player_list = [];
    input_list = document.getElementsByClassName("joueur_text");
    for(i = 0; i < input_list.length; i++){
        if(input_list[i].value !== "" && input_list[i].value !== " "){
            player_list[j] = [];
            player_list[j][0] = input_list[i].value;
            player_list[j][1] = 0;
            j++;
        }
    }
    if(player_list.length !== 0){
        return player_list;
    }else{
        return null;
    }
}

//affichage des joueurs
function display_player_list(player_list, div) {
    remove_class("joueur_div");
    for(var i in player_list){
        document.getElementById(div).appendChild(create_element("div", "joueur_"+i, "joueur_div", "select_player("+i+")", player_list[i][0]));
    }
    player_div = document.getElementsByClassName("joueur_div");
    for(var j in player_div){
        player_div[j].draggable = true;
    }
}

//affichage des joueurs avec des score
function display_player_list_with_score(player_list, div) {
    remove_class("joueur_div");
    for(var i in player_list){
        document.getElementById(div).appendChild(create_element("div", "joueur_"+i, "joueur_div", "", player_list[i][0]+" : "+player_list[i][1]));
    }

}

//trie des kidzz
function sort_kidzz(str, array, classe) {
    var j = 0;
    console.log(array);
    var array2 = new Array();
    for(var i in array){
        if(array[i]['nom'].toLowerCase().includes(str.toLowerCase())||array[i]['description'].toLowerCase().includes(str.toLowerCase())){
            array2[j] = array[i];
            j++;
        }
    }
    add_class_by_class(classe, "hide_by_text");
    for(var z in array2){
        remove_class_by_id('kidzz_'+array2[z]['id'], "hide_by_text");

    }
}