////////////////////////////////////////////////////////TEST//////////////////////////////////////////////////////////////////////////////////////////////

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

    for (var i = 0; i < response.length; i++) {
        document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_'+response[i]['id'], 'kidzz_div_list'));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['nom']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['description']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['note']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_button('','','play', 'choix_kidzz('+response[i]['id']+')'));
    }
}

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

    for (var i = 0; i < response.length; i++) {
        document.getElementById('kidzz_list').appendChild(create_element('div', 'kidzz_'+response[i]['id'], 'kidzz_div_list'));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['nom']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['description']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_element('p', '','','', response[i]['note']));
        document.getElementById('kidzz_'+response[i]['id']).appendChild(create_button('','','play', 'choix_kidzz('+response[i]['id']+')'));
    }
}

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

