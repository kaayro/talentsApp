var jobs = {
    vidOpt:{limit:1,duration:120},
    init:function(){
        $('#addJobBtn').click(jobs.addJobModal);
        $('#addJobSend').click(jobs.addJob);
        $('#quest1').click(jobs.questOne);
        jobs.getJobs();
    },
    addJobModal:function(){
        $('#addJobModal').show();
    },
    getJobs:function(){
        main.db.collection('talents').doc('talent-'+user.data.uid).collection('jobs').get().then((querySnapshot) => {
            var html = '';
            querySnapshot.forEach((doc) => {
                html += '<div class="block">'+
                    '<div class="icon">'+
                        '<i class="fas fa-building"></i>'+
                    '</div>'+
                    '<div class="desc">'+
                        '<h4>'+doc.data().place+'</h4>'+
                        '<p>'+doc.data().company+'</p>'+
                        '<p>'+doc.data().start+' - '+doc.data().end+'</p>'+
                    '</div>'+
                '</div>';
            });
            if(html != '')
                $('#jobList').html(html);
        });
    },
    addJob:function(){
        var p = $('#jobPlace').val();
        var c = $('#company').val();
        var start = $('#job-start-month').val() + '/' + $('#job-start-year').val();
        var end = $('#job-end-month').val() + '/' + $('#job-end-year').val();
        
        if(p != '' && c != '' && start != '/' && end != '/'){
            main.db.collection("talents").doc("talent-"+user.data.uid).collection('jobs').add({
                place: p,
                company: c,
                start: start,
                end: end
            }).then(() => {
                $('#jobPlace').val('');
                $('#company').val('');
                $('#job-start-month').val('');
                $('#job-start-year').val('');
                $('#job-end-month').val('');
                $('#job-end-year').val('');
                jobs.getJobs();
                $('.modal').hide();
            });
        }else
            alert("Todos los campos son necesarios");
    },
    questOne:function(e){
        e.preventDefault();
        alert(navigator.device);
        //navigator.device.capture.captureVideo(jobs.captureSuccessOne, jobs.captureError);
    },
    captureError:function(e){
        alert(error.code);
    },
    captureSuccessOne:function(r){
        alert(r[0].fullPath);
    },
    captureSuccessTwo:function(r){
        alert(r[0].fullPath);
    }
};
