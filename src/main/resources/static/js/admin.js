/* Archivo de funciones para la vista /Admin */

/* GET JSON */

$(document).ready(function() {
	
	jQuery.support.cors = true;

	$.ajax({
			type : "GET",
			dataType : "json",
			url : "/api/user",
			success : function(data) {

				console.log(data);

				var trHTML = '';
				$.each(
					data,
					function(i, item) {

								// alert(item.enabled);
								// alert(item.username);

						trHTML += '<tr><td>'
								+ item.username
								+ '</td><td>'
								+ item.enabled
								+ '</td><td><a class="btn btn-info btn-icon btn-sm " href="#" data-toggle="modal" data-target="#modalUsuario" data-tooltip="tooltip" data-placement="right" title="Editar" data-original-title="Editar"><i class="far fa-edit"></i></a> <button type="button" rel="tooltip" data-toggle="modal" data-target="#modalBorrar" class="btn btn-danger btn-icon btn-sm " data-original-title="Borrar" title="Borrar"><i class="far fa-trash-alt"></i></button></td></tr>';
					});

				$('#tbUsuarios').append(trHTML);

			},

			error : function(msg) {
			alert(msg.responseText);

			}
		});



				
/* POST JSON ENCUESTAS */

$("#btnPoll").on('click', function() {
	
	var vpollName = $("#pollName").val();
	
	var v1 = $("#startDate").val();
	var v1format = moment(v1, "DD/MM/YYYY").valueOf() / 1000;
	var v2 = $("#endDate").val();
    var v2format = moment(v2, "DD/MM/YYYY").valueOf() / 1000;
    
    var data = {
    		pollName: vpollName,
    		startDate: v1format,
    		endDate: v2format
        };
	
	
	console.log(data);

	$.ajax({
		url : '/api/poll',
		type : "POST",
		contentType : 'application/json',
		data : JSON.stringify(data),
		success : function(result) {
			console.log(result);
		},
			error : function(xhr, resp, text) {
			console.log(xhr, resp, text);
			data: data
		}
	})
});


/* BORRAR FORMLARIOS */

$("#btnCerrar").click(function() {
	/* Single line Reset function executes on click of Reset Button */
	$("#formPoll")[0].reset();
});



})
