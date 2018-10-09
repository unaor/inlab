/*
 * Archivo de funciones para la vista /Admin
 */

/* GET JSON */

$(document)
		.ready(
				function() {

					jQuery.support.cors = true;

					$
							.ajax({
								type : "GET",
								dataType : "json",
								url : "/api/user",
								success : function(data) {

									console.log(data);

									var trHTML = '';

									$
											.each(
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
				})

/* POST JSON ENCUESTAS */

$(document).ready(function() {
	// click on button submit
	$("#btnPoll").on('click', function() {
		var data = {};
		$("#formPoll").serializeArray().map(function(x){data[x.name] = x.value;}); 
		// send ajax
		$.ajax({
			url : '/api/poll', // url where to submit the request
			type : "POST", // type of action POST || GET
			dataType : 'json', // data type
			contentType : 'application/json;charset=utf-8', // data type
			data : JSON.stringify(data), // post data || get data
			success : function(result) {
				// you can see the result from the console
				// tab of the developer tools
				console.log(result);
			},
			error : function(xhr, resp, text) {
				console.log(xhr, resp, text);
			}
		})
	});
});

/* BORRAR FORMLARIOS */
$(document).ready(function() {
	$("#btnCerrar").click(function() {
		/* Single line Reset function executes on click of Reset Button */
		$("#formPoll")[0].reset();
	});
});
