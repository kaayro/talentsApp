var pr = {
    profiles:[
        'Monitor de GYM',
        'SPA Concierge',
        'Fisioterapeuta',
        'Masajista',
        'SPA Attendant',
        'Instructor de Yoga',
        'Estilista',
        'Esteticista',
        'Técnico de uñas',
        'Supervisor de SPA',
        'Director Wellness',
        'Supervisor', 
        'Terapista acuático',
        'Osteopata',
        'Acupunturista',
        'Life Coach',
        'Nutricionista',
        'Gestor de estrés',
    ],
    init:function(){
        $('#profile select').change(pr.updateInfo);
        $('#imageChanger').change(pr.updateInfo);
        $('#profile input').keyup(pr.updateInfo);
        $("#profileImageBtn").click(pr.changeImage);
        pr.getData();
        pr.getExtraData();
        pr.getReferences();
    },
    fillProfessions: function(){
        let html = '<option value="">Profesión</option>';
        for(i=0;i<pr.profiles.length;i++)
            html += '<option value="'+(i+1)+'">'+pr.profiles[i]+'</option>';
        $('#profession').html(html);
    },
    updateInfo: function(){
        var id = $(this).attr('id');
        var val = $(this).val();
        switch(id){
            case 'imageChanger':
                pr.upladImage($(this));
                break;
            case 'name':
                user.data.updateProfile({displayName:val});
                break;
            case 'mail':
                user.data.updateEmail(val);
                break;
            case 'phone':
                main.db.collection("talents").doc("talent-"+user.data.uid).set({'phone':val});
                break;
            case 'bday':
                pr.changeDate();
                break;
            case 'bmonth':
                pr.changeDate();
                break;
            case 'byear':
                pr.changeDate();
                break;
            case 'sex':
                main.db.collection("talents").doc("talent-"+user.data.uid).update({'sex':val});
                break;
            case 'country':
                main.db.collection("talents").doc("talent-"+user.data.uid).update({'country':val});
                break;
            case 'state':
                main.db.collection("talents").doc("talent-"+user.data.uid).update({'state':val});
                break;
            case 'city':
                main.db.collection("talents").doc("talent-"+user.data.uid).update({'city':val});
                break;
            case 'profession':
                main.db.collection("talents").doc("talent-"+user.data.uid).update({'profession':val});
                break;
            case 'facebook':
                main.db.collection("talents").doc("talent-"+user.data.uid).collection("references").doc("social").update({'facebook':val});
                break;
            case 'instagram':
                main.db.collection("talents").doc("talent-"+user.data.uid).collection("references").doc("social").update({'instagram':val});
                break;
            case 'linkedin':
                main.db.collection("talents").doc("talent-"+user.data.uid).collection("references").doc("social").update({'linkedin':val});
                break;
        }
        
    },
    changeDate: function(){
        var d = $('#bday').val();
        var m = $('#bmonth').val();
        var y = $('#byear').val();
        var date = d+'-'+m+'-'+y;
        
        main.db.collection("talents").doc("talent-"+user.data.uid).update({'bdate':date});
    },
    getData: function(){
        $('#name').val(user.data.displayName);
        $('#mail').val(user.data.email);
        console.log(user.data.photoURL);
        if(user.data.photoURL != null)
            $('#profileImage').attr("style","background-image:url('"+user.data.photoURL+"')");
    },
    getExtraData: function(){
        main.db.collection("talents").doc("talent-"+user.data.uid).get().then(function(doc){
            $('#phone').val(doc.data().phone);
            var bdate = doc.data().bdate.split('-');
            $('#bday').val(bdate[0]);
            $('#bmonth').val(bdate[1]);
            $('#byear').val(bdate[2]);
            $('#sex').val(doc.data().sex);
            $('#country').val(doc.data().country);
            world.fillStates(true,doc.data().state,doc.data().city);
            $('#profession').val(doc.data().profession);
        });
    },
    getReferences: function(){
        main.db.collection("talents").doc("talent-"+user.data.uid).collection("references").doc("social").get().then(function(doc){
            $('#facebook').val(doc.data().facebook);
            $('#instagram').val(doc.data().instagram);
            $('#linkedin').val(doc.data().linkedin);
        });
    },
    changeImage: function(){
        $("#imageChanger").click();
    },
    upladImage: function(target){
        //obtener archivo
        var file = target[0].files[0];
        //crear un storage ref
        var storageRef = firebase.storage().ref('talents/' + user.data.uid);
        // Subir archivo
        var task = storageRef.put(file);
        // Actualizar barra progreso
        task.on('state_changed',
        null,
        function error(err){
            alert("hubo un error");
        },
        function complete() {
            storageRef.getDownloadURL().then(function(url){
                console.log(url);
                user.data.updateProfile({photoURL:url});
                $('#profileImage').attr("style","background-image:url('"+url+"')");
            });
        });
    }
};