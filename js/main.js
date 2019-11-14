var main = {
    auth: firebase.auth(),
    db: firebase.firestore(),
    init: function(){
        document.addEventListener("deviceready",main.ready);
    },
    ready: function(){
        user.verify(main.start);
        $('div.screen footer a, a.links').click(main.menuOpt);
        $('.cancelModal').click(main.hideModal);
        main.fillYears();
        world.init();
        pr.fillProfessions();
        access.init();
    },
    start:function(){
        pr.init();
        edu.init();
        jobs.init();
    },
    menuOpt: function(e){
        e.preventDefault();
        var id = $(this).attr('href');
        $('div.screen.active').removeClass("active");
        $(id).addClass("active");
    },
    hideModal: function(e){
        e.preventDefault();
        $('.modal').hide();
    },
    fillYears: function(){
        var d = new Date();
        var y = d.getFullYear();
        var html = '<option value="">Año</option>';
        for(i=0;i<80;i++){
            let year = y - i;
            html += '<option value="'+year+'">'+year+'</option>';
        }
        $('#byear,#edu-start-year,#edu-end-year,#job-start-year,#job-end-year').html(html);
    }
};
$(main.init);