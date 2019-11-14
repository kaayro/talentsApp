var access = {
    init:function(){
        $('#logSend').click(access.login);
        $('#forgotSend').click(access.forgot);
        $('#regSend').click(access.register);
    },
    login:function(){
        let m = $("#logMail").val();
        let p = $('#logPass').val();
        if(m != '' && p != ''){
            
            main.auth.signInWithEmailAndPassword(m, p).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
            
        }else{
            alert("Todos los campos son necesarios");
        }
    },
    forgot:function(){
        let m = $("#forgotMail").val();
        if(m != ''){
            
            main.auth.sendPasswordResetEmail(m).then(function() {
                alert("Te hemos enviado un correo electrónico para que puedas recuperar tu contraseña");
            }).catch(function(error) {
                alert("Hubo un error, intenta más tarde.");
            });
            
        }else{
            alert("Llenar el campo es necesarios");
        }
    },
    register:function(){
        let m = $("#regMail").val();
        let p = $('#regPass').val();
        let c = $('#regPassConf').val();
        if(m != '' && p != '' && c != ''){
            if(p == c){
                
                main.auth.createUserWithEmailAndPassword(m, p).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                }).then(function(r){
                    main.db.collection("talents").doc('talent-'+r.user.uid).collection('references').doc('social').set({facebook:''});
                    r.user.sendEmailVerification().then(function() {
                        alert("Benvenido, te hemos enviado un mensaje a tu correo electrónico para verificar tu cuenta.");
                    }).catch(function(error) {
                        alert("Ups! Hubo un error, intenta de nuevo.");
                    });
                });
                
            }else
                alert("Las contraseñas no coinciden");
        }else
            alert("Todos los campos son necesarios");
    }
};