var edu = {
    init:function(){
        $('#addEducationBtn').click(edu.addEducationModal);
        $('#languages').change(edu.updateLanguages);
        $('#addCourseBtn').click(edu.addSchool);
        edu.getLanguages();
        edu.getSchools();
    },
    addEducationModal:function(){
        $('#addEducationModal').show();
    },
    updateLanguages:function(){
        var val = $(this).val();
        main.db.collection("talents").doc("talent-"+user.data.uid).collection("education").doc("languages").set({'lang':val});
    },
    addSchool: function(){
        var g = $('#grade').val();
        var s = $('#school').val();
        var t = $('#title').val();
        var start = $('#edu-start-month').val() + '/' + $('#edu-start-year').val();
        var end = $('#edu-end-month').val() + '/' + $('#edu-end-year').val();
        
        if(g != '' && s != '' && t != '' && start != '/' && end != '/'){
            main.db.collection("talents").doc("talent-"+user.data.uid).collection("education").add({
                grade: g,
                school: s,
                title: t,
                start: start,
                end: end
            }).then(function(){
                $('#grade').val(1);
                $('#school').val('');
                $('#title').val('');
                $('#edu-start-month').val('')
                $('#edu-start-year').val('');
                $('#edu-end-month').val('')
                $('#edu-end-year').val('');
                edu.getSchools();
                $('.modal').hide();
            });
        }else{
            alert("Todos los campos son requeridos");
        }
    },
    getLanguages:function(){
        main.db.collection('talents').doc('talent-'+user.data.uid).collection('education').doc('languages').get().then((doc) => {
            var values = doc.data().lang;
            for (var i = 0; i < $('#languages')[0].options.length; i++)
                $('#languages')[0].options[i].selected = values.indexOf($('#languages')[0].options[i].value) >= 0;
        });
    },
    getSchools:function(){
        main.db.collection('talents').doc('talent-'+user.data.uid).collection('education').get().then((querySnapshot) => {
            var html = '';
            querySnapshot.forEach((doc) => {
                if(doc.id != 'languages'){
                    html += '<div class="block">'+
                        '<div class="icon">'+
                            '<i class="fas fa-university"></i>'+
                        '</div>'+
                        '<div class="desc">'+
                            '<h4>'+doc.data().grade+'</h4>'+
                            '<p>'+doc.data().school+'</p>'+
                            '<p>'+doc.data().title+'</p>'+
                            '<p>'+doc.data().start+' - '+doc.data().end+'</p>'+
                        '</div>'+
                    '</div>';
                }
            });
            if(html != '')
                $('#schoolList').html(html);
        });
    }
};