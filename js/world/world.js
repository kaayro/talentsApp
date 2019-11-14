var world = {
	init: function(){
		world.fillCountries();
		$("#country").change(world.fillStates);
		$("#state").change(world.fillCity);

	},
	fillCountries: function(){
		var cs = '<option value="">País</option>';
		for(i=0; i< countries.length;i++){
		
			cs += '<option value="'+ countries[i].id+'">'+countries[i].name+'</option>';

		}

		$("#country").html(cs);
	},
	fillStates: function(load,val,city){
		var cs = $("#country").val();
		var ss = '<option value="">Estado</option>';
        for(i = 0; i < states[cs].length; i++){
        	//alert(i);
			ss += '<option value="'+ states[cs][i].id+'">'+states[cs][i].name+'</option>';
		}
         $("#state").html(ss);
         if(load == true){
         	$('#state').val(val);
         	world.fillCity(true,city);
         }
	},
    

     fillCity: function(load,val){
	    var cs = $("#state").val();
	    var ci = '<option value="">Ciudad o Municipio</option>';
		
		 for(i = 0; i < cities[cs].length; i++){

		 	
         ci += '<option value="'+ cities[cs][i].id+'">'+cities[cs][i].name+'</option>';
		}
         $("#city").html(ci);
         if(load == true){
         	$("#city").val(val);
         }

	},

};




