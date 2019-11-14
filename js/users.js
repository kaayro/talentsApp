var user = {
    data: null,
    verify: function(fnc){
        firebase.auth().onAuthStateChanged(function(u) {
            if (u){
                user.data = u;
                $('div.screen.active').removeClass("active");
                $('div.screen#profile').addClass("active");
                fnc();
            }
        });
    }
};