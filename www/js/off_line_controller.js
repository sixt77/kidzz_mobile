////////////////////////////////////////////////////////TEST//////////////////////////////////////////////////////////////////////////////////////////////





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

