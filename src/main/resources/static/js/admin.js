/* Archivo de funciones para la vista /Admin */
let polls;


$(document).ready(function() {
	

jQuery.support.cors = true;

/* GET JSON USUARIOS */
	
	$.ajax({
			type : "GET",
			dataType : "json",
			url : "/api/user",
			success : function(data) {

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

			/*
			 * error : function(msg) { alert(msg.responseText); }
			 */
		});



				
/* POST JSON CREAR ENCUESTAS */

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
	
	
	/* console.log(data); */

	$.ajax({
		url : '/api/poll',
		type : "POST",
		contentType : 'application/json',
		data : JSON.stringify(data),
		success : function(result) {
			console.log(result);
			
			$('#modalCrearEncuesta').modal('hide');
			$("#formPoll")[0].reset();
			$('#modalMessage').text('Registro Creado Exitosamente');
			$('#alertSuccess').modal('show');
			
		},
			error : function(xhr, resp, text) {
			console.log(xhr, resp, text);
			data: data
			$('#modalCrearEncuesta').modal('hide');
			$("#formPoll")[0].reset();
			$('#alertError').modal('show');
			
			
		}
	})
});


/* PUT JSON EDITAR ENCUESTAS */

$("#btnEditPoll").on('click', function() {
	
	var epollId = $("#editPollId").val();
	var epollName = $("#editPollName").val();
	
	var e1 = $("#editStartDate").val();
	var e1format = moment(e1, "DD/MM/YYYY").valueOf() / 1000;
	var e2 = $("#editEndDate").val();
    var e2format = moment(e2, "DD/MM/YYYY").valueOf() / 1000;
    
    var data = {
    		pollId: epollId,
    		pollName: epollName,
    		startDate: e1format,
    		endDate: e2format
        };

	$.ajax({
		url : '/api/poll',
		type : "PUT",
		contentType : 'application/json',
		data : JSON.stringify(data),
		success : function(result) {
			$('#modalEditarEncuesta').modal('hide');
			$("#formEditPoll")[0].reset();
			$('#modalMessage').text('Registro Actualizado Exitosamente');
			$('#alertSuccess').modal('show');
			
		},
			error : function(xhr, resp, text) {
			console.log(xhr, resp, text);
			data: data
			$('#modalEditarEncuesta').modal('hide');
			$("#formEditPoll")[0].reset();
			$('#alertError').modal('show');
			
			
		}
	})
});


/* PUT JSON CREAR PREGUNTAS */

$("#btnQuestion").on('click', function() {
	
		
	var pollId = $("#editPollId").val();
	const questions = [];
	$(".question").each((index, element) => {
		questions.push({questionId: element.dataset.questionId, question:element.value});
	});
	
    var data = {
    		pollId: pollId,
    		questions: questions

        };
    

	$.ajax({
		url : '/api/poll/question',
		type : "PUT",
		contentType : 'application/json',
		data : JSON.stringify(data),
		success : function(result) {
			console.log(result);
			
			$('#modalCrearPregunta').modal('hide');
			$("#formNewQuestion")[0].reset();
			$('#modalMessage').text('Preguntas actualizadas Exitosamente');  
			$('#alertSuccess').modal('show');
			
		},
			error : function(xhr, resp, text) {
			console.log(xhr, resp, text);
			data: data
			$('#modalCrearPregunta').modal('hide');
			$("#formNewQuestion")[0].reset();
			$('#alertError').modal('show');
			
			
		}
	})
});

$("#btnAnswer").on('click', function() {
	
	
	var pollId = $("#editPollId").val();
	const answers = [];
	$(".answer").each((index, element) => {
		answers.push({questionId: element.dataset.questionId, answer:element.value});
	});
    

	$.ajax({
		url : '/api/poll/answer',
		type : "POST",
		contentType : 'application/json',
		data : JSON.stringify(answers),
		success : function(result) {
			console.log(result);
			
			$('#modalCrearPregunta').modal('hide');
			$("#formNewQuestion")[0].reset();
			$('#modalMessage').text('respuestas actualizadas Exitosamente');  
			$('#alertSuccess').modal('show');
			
		},
			error : function(xhr, resp, text) {
			console.log(xhr, resp, text);
			data: data
			$('#modalCrearPregunta').modal('hide');
			$("#formNewQuestion")[0].reset();
			$('#alertError').modal('show');
			
			
		}
	})
});

/* SAVE USERS */

$("#createUser").on('click', function() {
	
    
	const data = {completeName: $("#completeName").val(), username: $("#username").val(), password: $("#password").val(), roleName: $("#roleName").val()};
	$.ajax({
		url : '/api/user',
		type : "POST",
		contentType : 'application/json',
		data : JSON.stringify(data),
		success : function(result) {			
			$("#crearUsuario")[0].reset();
			$('#modalMessage').text('usuario creado exitosamente Exitosamente');  
			$('#alertSuccess').modal('show');
			
		},
			error : function(xhr, resp, text) {
			console.log(xhr, resp, text);
			data: data
			$("#crearUsuario")[0].reset();
			$('#alertError').modal('show');
			
			
		}
	})
});



/* BORRAR FORMLARIOS */

$("#btnCerrar").click(function() {
	/* Single line Reset function executes on click of Reset Button */
	$("#formPoll")[0].reset();
});

$("#btnCerrarPreguntas").click(function() {
	/* Single line Reset function executes on click of Reset Button */
	$("#formNewQuestion")[0].reset();
	$(".question").each((index, element) => {
		$(element).parent("div").remove();
	});
	
	
});

$("#btnCerrarAnswers").click(function() {
	/* Single line Reset function executes on click of Reset Button */
	$("#contestarEncuesta")[0].reset();
	
	
});


/* REFRESCAR PAGINA */

$("#btnOK").click(function() {
	location.reload();
});




/* GET JSON ENCUESTAS */

	$.ajax({
			type : "GET",
			dataType : "json",
			url : "/api/poll",
			success : function(data) {

				polls = data;

				var trHTML = '';
				$.each(
					data,
					function(i, item) {
						
						/* convertir dato unix a fecha */
						var unixTimeStamp1 = new Date(item.startDate*1000);
						var day1 = (unixTimeStamp1.getDate() < 10 ? '0' : '') + unixTimeStamp1.getDate();
						var month1 = (unixTimeStamp1.getMonth() < 9 ? '0' : '') + (unixTimeStamp1.getMonth() + 1);
						var year1 = unixTimeStamp1.getFullYear();
						var formattedDate1 = day1 + '/' + month1 + '/' + year1;

						var unixTimeStamp2 = new Date(item.endDate*1000);
						var day2 = (unixTimeStamp2.getDate() < 10 ? '0' : '') + unixTimeStamp2.getDate();
						var month2 = (unixTimeStamp2.getMonth() < 9 ? '0' : '') + (unixTimeStamp2.getMonth() + 1);
						var year2 = unixTimeStamp2.getFullYear();
						var formattedDate2 = day2 + '/' + month2 + '/' + year2;						
						


						trHTML += '<tr id="'+ item.pollId + '"><td>'
								+ item.pollId
								+ '</td><td>'
								+ item.pollName
								+ '</td><td>'
								+ formattedDate1
								+ '</td><td>'
								+ formattedDate2
								+ '</td><td>'
								+ '<button id="btnPollEdit'+ item.pollId + '" type="button" onclick="EditPoll('+ item.pollId +')" rel="tooltip" data-toggle="modal" data-target="#modalEditarEncuesta" class="btn btn-info btn-icon btn-sm " data-original-title="Editar" title="Editar"><i class="far fa-edit"></i></button> '
								+ '<button id="btnQuestion" type="button" onclick="NewQuestion('+ item.pollId +')" rel="tooltip" data-toggle="modal" data-target="#modalCrearPregunta" class="btn btn-default btn-icon btn-sm " data-original-title="Preguntas" title="Preguntas"><i class="fas fa-question"></i></button> '
								+ '<button type="button" rel="tooltip" onclick="NewAnswer('+ item.pollId +')" data-toggle="modal" data-target="#modalContestarEncuesta" class="btn btn-warning btn-icon btn-sm " data-original-title="Contestar" title="Contestar"><i class="far fa-check-square"></i></button> '
								+ '<button type="button" rel="tooltip" data-toggle="modal" data-target="#modalInsight" class="btn btn-primary btn-icon btn-sm " data-original-title="Insight" title="Insight"><i class="fas fa-cloud"></i></button> '
								+ '<button type="button" rel="tooltip" class="btn btn-success btn-icon btn-sm " data-original-title="Excel" title="Excel"><i class="far fa-file-excel"></i></button> '
								+ '<button id="btnPollDelete'+ item.pollId + '" type="button" onclick="DeletePoll('+ item.pollId +')" rel="tooltip" data-toggle="modal" data-target="#modalBorrar" class="btn btn-danger btn-icon btn-sm " data-original-title="Borrar" title="Borrar"><i class="far fa-trash-alt"></i></button></td></tr>';
					});

				$('#tbEncuestas').append(trHTML);

			},

		});
	
	
/* DELETE JSON ENCUESTAS */
	
$("#btnDeletePoll").click(function() {
		
		var data = $("#deletePollId").val();
		var url= "/api/poll?pollId="+data;
		
	    $.ajax({
	    	url : url,
	    	type : "DELETE",
	    	contentType : 'application/json',
	    	success : function(result) {
	    		console.log(result);
	    		
	    		$('#modalBorrar').modal('hide');
				$("#borrarPregunta")[0].reset();
				$('#modalMessage').text('Registro Borrado Exitosamente'); 
				$('#alertSuccess').modal('show');	    		
	    	},
	    		error : function(xhr, resp, text) {
	    		console.log(xhr, resp, text);
	    		data: data
	    		
	    		
	    	}
	    })
	});		

/* AGREGAR PREGUNTAS */
$(function() {

	var i = 2;
	
	$("#btnAddQuestion").click(function (e) {
		
		
		
		 // Append a new row of code to the "#items" div
		 $("#itemsQuestion").append('<div class="form-group no-border btn-group d-flex w-100" role="group"><input class="form-control question" placeholder="Texto Pregunta" type="text" name="inputQuestion' + i +'" id="inputQuestion' + i +'"><button type="button" rel="tooltip" class="btn btn-danger btn-icon btn-sm delete"><i class="far fa-trash-alt"></i></button></div>'); 
		 
		 i++;
		 return false;
	
	});
	
	$("body").on("click", ".delete", function (e) {
		
		
		if( i > 2 ) {
			$(this).parent("div").remove();
	        i--;
		}
		return false;
	});
	
});







}) // fin function

/* LLENAR FORMULARIO CREAR PREGUNTAS */

function NewQuestion(pollId){
		/* capturar información del registro para editar */
		const selectedPoll = polls.filter(x => x.pollId === pollId)[0];	
		
		/* enviar datos a la modal */
		
		$('#editPollId').val(selectedPoll.pollId);
		if(selectedPoll.questions && selectedPoll.questions.length > 0) {
			for(var i = 0; selectedPoll.questions.length > i ; i++) { 
					$("#itemsQuestion").append('<div class="form-group no-border btn-group d-flex w-100" role="group"><input class="form-control question" value="' + selectedPoll.questions[i].question +'" type="text" name="inputQuestion' + i +'" id="inputQuestion' + i +'" data-question-id=" '+selectedPoll.questions[i].questionId+'"><button type="button" rel="tooltip" class="btn btn-danger btn-icon btn-sm delete"><i class="far fa-trash-alt"></i></button></div>'); 
				
			}
		}

		
}

function NewAnswer(pollId){
	/* capturar información del registro para editar */
	const selectedPoll = polls.filter(x => x.pollId === pollId)[0];	
	
	/* enviar datos a la modal */
	
	$('#editPollId').val(selectedPoll.pollId);
	$('#pollName').val(selectedPoll.pollName);
	
	
	if(selectedPoll.questions && selectedPoll.questions.length > 0) {
		for(var i = 0; selectedPoll.questions.length > i ; i++) {
			$("#listQuestions").append('<div class="alert alert-primary" role="alert"><label class="control-label">' + selectedPoll.questions[i].question +'</label></div><textarea class="form-control answer" data-question-id=" '+selectedPoll.questions[i].questionId+'" name="name" rows="4" cols="80" placeholder="Escriba la respuesta"></textarea>')

			
		}
	}

	
}

/* LLENAR FORMULARIO EDICION ENCUESTAS */

	 function EditPoll(pollId){
		const selectedPoll = polls.filter(x => x.pollId === pollId)[0];		
		$('#editPollId').val(selectedPoll.pollId);
		$('#editPollName').val(selectedPoll.pollName);
		const startDate = moment.unix(selectedPoll.startDate).format('DD/MM/YYYY'); 
		$('#editStartDate').val(startDate);
		const endDate = moment.unix(selectedPoll.endDate).format('DD/MM/YYYY');
		$('#editEndDate').val(endDate);
		
	}



	function DeletePoll(pollId){
		const selectedPoll = polls.filter(x => x.pollId === pollId)[0];	
		/* capturar información del registro para editar */
		
		$('#deletePollId').val(selectedPoll.pollId);
		
	}




/* PRECARGADOR */
    var Body = $('body');
    Body.addClass('preloader-site');

$(window).load(function() {
    $('.preloader-wrapper').delay(3000).fadeOut(1000);
    $('body').removeClass('preloader-site');
});

/* DELETE USER */

$("#btnDeletePoll").click(function() {
		
		var data = $("#deletePollId").val();
		var url= "/api/user?userId="+data;
		
	    $.ajax({
	    	url : url,
	    	type : "DELETE",
	    	contentType : 'application/json',
	    	success : function(result) {
	    		
	    		$('#modalBorrar').modal('hide');
				$("#borrarPregunta")[0].reset();
				$('#modalMessage').text('Registro Borrado Exitosamente'); 
				$('#alertSuccess').modal('show');	    		
	    	},
	    		error : function(xhr, resp, text) {
	    		console.log(xhr, resp, text);
	    		data: data
	    		
	    		
	    	}
	    })
	});	

