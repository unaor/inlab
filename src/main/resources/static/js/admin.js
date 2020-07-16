/* Archivo de funciones para la vista /Admin */
let polls;
let campaigns;
let users;

$(document).ready(function () {
  jQuery.support.cors = true;

  // ########### USUARIOS ############

  /* GET JSON USUARIOS */

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/api/user",
    success: function (data) {
      users = data;
      //console.log(data);

      var trHTML = "";
      $.each(data, function (i, item) {
        trHTML +=
          '<tr id="' +
          item.userId +
          '"><td>' +
          item.userId +
          "</td><td>" +
          item.completeName +
          "</td><td>" +
          item.username +
          "</td><td>" +
          item.roleName +
          "</td><td>" +
          '<button id="btnUserEdit' +
          item.userId +
          '" type="button" onclick="EditUser(' +
          item.userId +
          ')" rel="tooltip" data-toggle="modal" data-target="#modalEditarUsuario" class="btn btn-info btn-icon btn-sm " data-original-title="Editar" title="Editar"><i class="far fa-edit"></i></button> ' +
          '<button id="btnUserDelete' +
          item.userId +
          '" type="button" onclick="DeleteUser(' +
          item.userId +
          ')" rel="tooltip" data-toggle="modal" data-target="#modalBorrar" class="btn btn-danger btn-icon btn-sm " data-original-title="Borrar" title="Borrar"><i class="far fa-trash-alt"></i></button></td></tr>';
      });

      $("#tbUsuarios").append(trHTML);
    },

    /*
     * error : function(msg) { alert(msg.responseText); }
     */
  });

  /* CREAR USUARIOS */

  $("#createUser").on("click", function () {
    const data = {
      completeName: $("#completeName").val(),
      username: $("#username").val(),
      password: $("#password").val(),
      roleName: $("#roleName").val(),
    };
    $.ajax({
      url: "/api/user",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        $("#crearUsuario")[0].reset();
        $("#modalMessage").text("Usuario Creado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
        $("#crearUsuario")[0].reset();
        $("#alertError").modal("show");
      },
    });
  });

  /* BORRAR USUARIOS */

  $("#btnUserDelete").click(function () {
    var data = $("#deleteUserId").val();
    var url = "/api/user?userId=" + data;

    $.ajax({
      url: url,
      type: "DELETE",
      contentType: "application/json",
      success: function (result) {
        $("#modalBorrar").modal("hide");
        $("#borrarUsuario")[0].reset();
        $("#modalMessage").text("Registro Borrado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
      },
    });
  });

  /* PUT JSON EDITAR USUARIOS */

  $("#btnEditUser").on("click", function () {
    const data = {
      userId: $("#editUserId").val(),
      completeName: $("#editCompleteName").val(),
      username: $("#editUserName").val(),
      password: $("#editPassword").val(),
      roleName: $("#editRoleName").val(),
      enabled: true,
    };

    $.ajax({
      url: "/api/user",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        $("#modalEditarUsuario").modal("hide");
        $("#formEditUser")[0].reset();
        $("#modalMessage").text("Registro Actualizado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
        $("#modalEditarUsuario").modal("hide");
        $("#formEditUser")[0].reset();
        $("#alertError").modal("show");
      },
    });
  });

  // ########### ENCUESTAS ############

  /* POST JSON CREAR ENCUESTAS */

  $("#btnPoll").on("click", function () {
    var vpollName = $("#pollName").val();

    var v1 = $("#startDate").val();
    var v1format = moment(v1, "DD/MM/YYYY").valueOf() / 1000;
    var v2 = $("#endDate").val();
    var v2format = moment(v2, "DD/MM/YYYY").valueOf() / 1000;

    var data = {
      pollName: vpollName,
      startDate: v1format,
      endDate: v2format,
    };

    /* console.log(data); */

    $.ajax({
      url: "/api/poll",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        //console.log(result);

        $("#modalCrearEncuesta").modal("hide");
        $("#formPoll")[0].reset();
        $("#modalMessage").text("Registro Creado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
        $("#modalCrearEncuesta").modal("hide");
        $("#formPoll")[0].reset();
        $("#alertError").modal("show");
      },
    });
  });

  /* PUT JSON EDITAR ENCUESTAS */

  $("#btnEditPoll").on("click", function () {
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
      endDate: e2format,
    };

    $.ajax({
      url: "/api/poll",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        $("#modalEditarEncuesta").modal("hide");
        $("#formEditPoll")[0].reset();
        $("#modalMessage").text("Registro Actualizado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
        $("#modalEditarEncuesta").modal("hide");
        $("#formEditPoll")[0].reset();
        $("#alertError").modal("show");
      },
    });
  });

  /* PUT JSON CREAR PREGUNTAS */

  $("#btnQuestion").on("click", function () {
    var pollId = $("#editPollId").val();
    const questions = [];

    $(".question").each((index, element) => {
      questions.push({
        questionId: element.dataset.questionId,
        question: element.value,
      });
    });

    //console.log(questions);

    var data = {
      pollId: pollId,
      questions: questions,
    };

    $.ajax({
      url: "/api/poll/question",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        //console.log(result);

        $("#modalCrearPregunta").modal("hide");
        $("#formNewQuestion")[0].reset();
        $("#modalMessage").text("Preguntas actualizadas Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
        $("#modalCrearPregunta").modal("hide");
        $("#formNewQuestion")[0].reset();
        $("#alertError").modal("show");
      },
    });
  });

  /* GUARDAR RESPUESTAS */

  $("#btnAnswer").on("click", function () {
    var pollId = $("#editPollId").val();
    const answers = [];
    $(".answer").each((index, element) => {
      answers.push({
        questionId: element.dataset.questionId,
        answer: element.value,
      });
    });
    //console.log(answers);

    $.ajax({
      url: "/api/poll/answer",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(answers),
      success: function (result) {
        //console.log(result);

        $("#modalCrearPregunta").modal("hide");
        //$("#formNewQuestion")[0].reset();
        $("#contestarEncuesta")[0].reset();
        $("#modalMessage").text("respuestas actualizadas Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        $("#modalCrearPregunta").modal("hide");
        $("#contestarEncuesta")[0].reset();
        $("#alertError").modal("show");
      },
    });
  });

  /* GET JSON ENCUESTAS */

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/api/poll",
    success: function (data) {
      polls = data;

      var trHTML = "";
      var trHTML2 = "";

      $.each(data, function (i, item) {
        /* convertir dato unix a fecha */
        var unixTimeStamp1 = new Date(item.startDate * 1000);
        var day1 =
          (unixTimeStamp1.getDate() < 10 ? "0" : "") + unixTimeStamp1.getDate();
        var month1 =
          (unixTimeStamp1.getMonth() < 9 ? "0" : "") +
          (unixTimeStamp1.getMonth() + 1);
        var year1 = unixTimeStamp1.getFullYear();
        var formattedDate1 = day1 + "/" + month1 + "/" + year1;

        var unixTimeStamp2 = new Date(item.endDate * 1000);
        var day2 =
          (unixTimeStamp2.getDate() < 10 ? "0" : "") + unixTimeStamp2.getDate();
        var month2 =
          (unixTimeStamp2.getMonth() < 9 ? "0" : "") +
          (unixTimeStamp2.getMonth() + 1);
        var year2 = unixTimeStamp2.getFullYear();
        var formattedDate2 = day2 + "/" + month2 + "/" + year2;

        trHTML +=
          '<tr id="' +
          item.pollId +
          '"><td>' +
          item.pollId +
          "</td><td>" +
          item.pollName +
          "</td><td>" +
          formattedDate1 +
          "</td><td>" +
          formattedDate2 +
          "</td><td>" +
          '<button id="btnPollEdit' +
          item.pollId +
          '" type="button" onclick="EditPoll(' +
          item.pollId +
          ')" rel="tooltip" data-toggle="modal" data-target="#modalEditarEncuesta" class="btn btn-info btn-icon btn-sm " data-original-title="Editar" title="Editar"><i class="far fa-edit"></i></button> ' +
          '<button id="btnQuestion" type="button" onclick="NewQuestion(' +
          item.pollId +
          ')" rel="tooltip" data-toggle="modal" data-target="#modalCrearPregunta" class="btn btn-default btn-icon btn-sm " data-original-title="Preguntas" title="Preguntas"><i class="fas fa-question"></i></button> ' +
          //+ '<button type="button" rel="tooltip" onclick="NewAnswer('+ item.pollId +')" data-toggle="modal" data-target="#modalContestarEncuesta" class="btn btn-warning btn-icon btn-sm " data-original-title="Contestar" title="Contestar"><i class="far fa-check-square"></i></button> '
          '<button id="btnPollExport' +
          item.pollId +
          '" type="button" onclick="exportPoll(' +
          item.pollId +
          ')" rel="tooltip" class="btn btn-success btn-icon btn-sm " data-original-title="Excel" title="Excel"><i class="far fa-file-excel"></i></button> ' +
          '<button id="btnPollDelete' +
          item.pollId +
          '" type="button" onclick="DeletePoll(' +
          item.pollId +
          ')" rel="tooltip" data-toggle="modal" data-target="#modalBorrar" class="btn btn-danger btn-icon btn-sm " data-original-title="Borrar" title="Borrar"><i class="far fa-trash-alt"></i></button></td></tr>';

        /* CARGAR ENCUESTAS PARA RESPUESTAS*/
        trHTML2 +=
          '<tr id="' +
          item.pollId +
          '"><td>' +
          item.pollId +
          "</td><td>" +
          item.pollName +
          "</td><td>" +
          '<button type="button" rel="tooltip" onclick="NewAnswer(' +
          item.pollId +
          ')" data-toggle="modal" data-target="#modalContestarEncuesta" class="btn btn-warning btn-icon btn-sm " data-original-title="Contestar" title="Contestar"><i class="far fa-check-square"></i></button> ';
      });

      $("#tbEncuestas").append(trHTML);
      $("#tbRespuestas").append(trHTML2);
    },
  });

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/api/word",
    success: function (data) {
      polls = data;

      var trHTML = "";
      $.each(data, function (i, item) {
        trHTML +=
          "<tr><td>" +
          item.word +
          '</td><td class="text-center">' +
          '<button type="button" rel="tooltip" data-toggle="modal" data-target="#modalBorrarPalabra" onclick="deleteWord(\'' +
          item.word +
          '\')" class="btn btn-danger btn-icon btn-sm " data-original-title="Borrar" title="Borrar"><i class="far fa-trash-alt"></i></button></td>';
      });

      $("#tbPalabras").append(trHTML);
    },
  });

  $("#createWord").click(() => {
    var data = { word: $("#requestedWord").val() };
    $.ajax({
      url: "/api/word",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        $("#modalCrearPalabra").modal("hide");
        $("#requestedWord").val("");
        $("#modalMessage").text("Registro Creado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
        $("#modalCrearPalabra").modal("hide");
        $("#requestedWord").val("");
        $("#alertError").modal("show");
      },
    });
  });

  $("#btnDeleteWord").click(function () {
    var data = $("#word").val();
    var url = "/api/word?word=" + data;

    $.ajax({
      url: url,
      type: "DELETE",
      contentType: "application/json",
      success: function (result) {
        //console.log(result);

        $("#modalCrearPalabra").modal("hide");
        $("#word").val("");
        $("#modalMessage").text("Registro Borrado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
      },
    });
  });

  /* DELETE JSON ENCUESTAS */

  $("#btnDeletePoll").click(function () {
    var data = $("#deletePollId").val();
    var url = "/api/poll?pollId=" + data;

    $.ajax({
      url: url,
      type: "DELETE",
      contentType: "application/json",
      success: function (result) {
        //console.log(result);

        $("#modalBorrar").modal("hide");
        $("#borrarPregunta")[0].reset();
        $("#modalMessage").text("Registro Borrado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
      },
    });
  });

  /* AGREGAR PREGUNTAS */
  $(function () {
    var i = 1;

    $("#btnAddQuestion").click(function (e) {
      // Append a new row of code to the "#items" div
      $("#itemsQuestion").append(
        '<div class="form-group no-border btn-group d-flex w-100" role="group"><input class="form-control question" placeholder="Texto Pregunta" type="text" name="inputQuestion' +
        i +
        '" id="inputQuestion' +
        i +
        '"><button id="btnTrash" type="button" rel="tooltip" class="btn btn-danger btn-icon btn-sm delete"><i class="far fa-trash-alt"></i></button></div>'
      );

      i++;
      return false;
    });

    //	$("#btnTrash").click(function (e) {
    $("body").on("click", ".delete", function (e) {
      if (i > 1) {
        $(this).parent("div").remove();
        i--;
      }
      return false;
    });
  });

  /* REFRESCAR PAGINA */

  $("#btnOK").click(function () {
    location.reload();
  });

  // ############# CAMPAÑAS ##################

  /* POST JSON CREAR CAMPAÑAS */

  $("#btnCampaign").on("click", function () {
    var vCampaignName = $("#campaignName").val();
    var vCampaignCustomer = $("#campaignCustomer").val();
    var vCampaignProject = $("#campaignProject").val();
    var v1 = $("#startDate").val();
    var v1format = moment(v1, "DD/MM/YYYY").valueOf() / 1000;
    var v2 = $("#endDate").val();
    var v2format = moment(v2, "DD/MM/YYYY").valueOf() / 1000;
    var vvideoUrl = $("#videoUrl").val();
    var vchatUrl = $("#chatUrl").val();
    var vpollUrl = $("#pollUrl").val();
    var vinsightId = $("#insightId").val();
    var vpowerBIUrl = $("#powerBIUrl").val();
    var vtimelineUrl = $("#timelineUrl").val();
    var vtweetsUrl = $("#tweetsUrl").val();
    var vtopicsUrl = $("#topicsUrl").val();
    var vinfluenceUrl = $("#influenceUrl").val();
    var vtopDomainsUrl = $("#topDomainsUrl").val();
    var vcountries = $("#countries").val();
    var vdemographics = $("#demographics").val();
    var vpostType = $("#postType").val();
    var vsources = $("#sources").val();
    var vemotionsUrl = $("#emotionsUrl").val();
    var vemotionsIA = $("#emotionsIA").val();
    var vassignedUser = $("#assignedUser").val();

    var data = {
      campaignName: vCampaignName,
      campaignCustomer: vCampaignCustomer,
      campaignProject: vCampaignProject,
      startDate: v1format,
      endDate: v2format,
      videoUrl: vvideoUrl,
      chatUrl: vchatUrl,
      pollUrl: vpollUrl,
      insightId: vinsightId,
      powerBIUrl: vpowerBIUrl,
      timelineUrl: vtimelineUrl,
      tweetsUrl: vtweetsUrl,
      topicsUrl: vtopicsUrl,
      influenceUrl: vinfluenceUrl,
      topDomainsUrl: vtopDomainsUrl,
      countries: vcountries,
      demographics: vdemographics,
      postType: vpostType,
      sources: vsources,
      emotionsUrl: vemotionsUrl,
      emotionsIA: vemotionsIA,
      assignedUser: vassignedUser,
    };

    /* console.log(data); */

    $.ajax({
      url: "/api/campaign",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        //console.log(result);

        $("#modalCrearCampana").modal("hide");
        $("#formNewCampaign")[0].reset();
        $("#modalMessage").text("Registro Creado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
        $("#modalCrearCampana").modal("hide");
        $("#formNewCampaign")[0].reset();
        $("#alertError").modal("show");
      },
    });
  });

  $("#btnConferenceSave").on("click", function () {
    var campaignId = $("#vidConfCampaignId").val();
    var conferenceName = $("#conferenceName").val();
    var conferenceUrl = $("#conferenceUrl").val();

    var data = {
      campaignId: campaignId,
      conferenceName: conferenceName,
      conferenceUrl: conferenceUrl,
    };

    /* console.log(data); */

    $.ajax({
      url: "/api/campaign/conference",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        //console.log(result);

        $("#modalPollVidConf").modal("hide");
        $("#formPollVidConf")[0].reset();
        $("#modalMessage").text("Registro Creado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
        $("#modalPollVidConf").modal("hide");
        $("#formPollVidConf")[0].reset();
        $("#alertError").modal("show");
      },
    });
  });

  /* GET JSON CAMPAÑAS */

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/api/campaign",
    success: function (data) {
      campaigns = data;
      //console.log(data);

      var trHTML3 = "";
      var trHTML4 = "";
      

      $.each(data, function (i, item) {
        /* convertir dato unix a fecha */
        var unixTimeStamp1 = new Date(item.startDate * 1000);
        var day1 =
          (unixTimeStamp1.getDate() < 10 ? "0" : "") + unixTimeStamp1.getDate();
        var month1 =
          (unixTimeStamp1.getMonth() < 9 ? "0" : "") +
          (unixTimeStamp1.getMonth() + 1);
        var year1 = unixTimeStamp1.getFullYear();
        var formattedDate1 = day1 + "/" + month1 + "/" + year1;

        var unixTimeStamp2 = new Date(item.endDate * 1000);
        var day2 =
          (unixTimeStamp2.getDate() < 10 ? "0" : "") + unixTimeStamp2.getDate();
        var month2 =
          (unixTimeStamp2.getMonth() < 9 ? "0" : "") +
          (unixTimeStamp2.getMonth() + 1);
        var year2 = unixTimeStamp2.getFullYear();
        var formattedDate2 = day2 + "/" + month2 + "/" + year2;

        trHTML3 +=
          '<tr id="' +
          item.campaignId +
          '"><td>' +
          item.campaignId +
          "</td><td>" +
          item.campaignName +
          "</td><td>" +
          item.campaignCustomer +
          "</td><td>" +
          formattedDate1 +
          "</td><td>" +
          formattedDate2 +
          "</td><td>" +
          '<button id="btnCampaignEdit' +
          item.campaignId +
          '" type="button" onclick="EditCampaign(' +
          item.campaignId +
          ')" rel="tooltip" data-toggle="modal" data-target="#modalEditarCampana" class="btn btn-info btn-icon btn-sm " data-original-title="Editar" title="Editar"><i class="far fa-edit"></i></button> ' +
          '<button onclick="pollImgUpload(' +
          item.campaignId +
          ')" type="button" rel="tooltip" data-toggle="modal" data-target="#modalPollImg" class="btn btn-success btn-icon btn-sm " data-original-title="Cargar Img Mediciones" title="Cargar Img Mediciones"><i class="fas fa-upload"></i></button> ' +
          //fernmarr agregar zoom julio2020
          " &nbsp; " +
          '<button onclick="pollVidConf(' +
          item.campaignId +
          ')" type="button" rel="tooltip" data-toggle="modal" data-target="#modalPollVidConf" class="btn btn-primary btn-icon btn-sm " data-original-title="Salas Videoconferencia" title="Salas Videoconferencia"><i class="fas fa-laptop"></i></button> ' +
          //+ '<button onclick="pollDelVidConf('+ item.campaignId +')" type="button" rel="tooltip" data-toggle="modal" data-target="#modalPollDelVidConf" class="btn btn-warning btn-icon btn-sm " data-original-title="Borrar Salas Videoconferencia" title="Borrar Salas Videoconferencia"><i class="fas fa-laptop-code"></i></button> '
          " &nbsp; " +
          //+ '<button onclick="NewGallery('+ item.campaignId +')" type="button" rel="tooltip" data-toggle="modal" data-target="#modalGaleriaCampana" class="btn btn-warning btn-icon btn-sm " data-original-title="Galeria" title="Galeria"><i class="far fa-images"></i></button> '
          '<button id="btnCampaignDelete' +
          item.campaignId +
          '" type="button" onclick="DeleteCampaign(' +
          item.campaignId +
          ')" rel="tooltip" data-toggle="modal" data-target="#modalBorrarCampaign" class="btn btn-danger btn-icon btn-sm " data-original-title="Borrar Campaña" title="Borrar Campaña"><i class="far fa-trash-alt"></i></button></td></tr>';

        trHTML4 +=
          '<tr id="' +
          item.campaignId +
          '"><td>' +
          item.campaignId +
          "</td><td>" +
          item.campaignName +
          "</td><td>" +
          '<button onclick="NewGallery(' +
          item.campaignId +
          ')" type="button" rel="tooltip" data-toggle="modal" data-target="#modalGaleriaCampana" class="btn btn-warning btn-icon btn-sm " data-original-title="Cargar Fotos" title="Cargar Fotos"><i class="fas fa-camera-retro"></i></button> ' +
          '<button onclick="deleteGallery(' +
          item.campaignId +
          ')" type="button" rel="tooltip" data-toggle="modal" data-target="#modalGaleriaBorrado" class="btn btn-danger btn-icon btn-sm " data-original-title="Borrar Fotos" title="Borrar Fotos"><i class="fas fa-folder-minus"></i></button></td></tr>';

      });

      $("#tbCampaign").append(trHTML3);
      $("#tbCampaignGalerias").append(trHTML4);

    },
  });

  /* PUT JSON EDITAR CAMPAÑAS */

  $("#EbtnCampaign").on("click", function () {
    var ecampaignId = $("#editCampaignId").val();
    var eCampaignName = $("#EcampaignName").val();
    var eCampaignCustomer = $("#EcampaignCustomer").val();
    var eCampaignProject = $("#EcampaignProject").val();
    var e1 = $("#EstartDate").val();
    var e1format = moment(e1, "DD/MM/YYYY").valueOf() / 1000;
    var e2 = $("#EendDate").val();
    var e2format = moment(e2, "DD/MM/YYYY").valueOf() / 1000;
    var evideoUrl = $("#EvideoUrl").val();
    var echatUrl = $("#EchatUrl").val();
    var epollUrl = $("#EpollUrl").val();
    var einsightId = $("#EinsightId").val();
    var epowerBIUrl = $("#EpowerBIUrl").val();
    var etimelineUrl = $("#EtimelineUrl").val();
    var etweetsUrl = $("#EtweetsUrl").val();
    var etopicsUrl = $("#EtopicsUrl").val();
    var einfluenceUrl = $("#EinfluenceUrl").val();
    var etopDomainsUrl = $("#EtopDomainsUrl").val();
    var ecountries = $("#Ecountries").val();
    var edemographics = $("#Edemographics").val();
    var epostType = $("#EpostType").val();
    var esources = $("#Esources").val();
    var eassignedUser = $("#EassignedUser").val();
    var eemotionsUrl = $("#EemotionsUrl").val();
    var eemotionsIA = $("#EemotionsIA").val();

    var data = {
      campaignId: ecampaignId,
      campaignName: eCampaignName,
      campaignCustomer: eCampaignCustomer,
      campaignProject: eCampaignProject,
      startDate: e1format,
      endDate: e2format,
      videoUrl: evideoUrl,
      chatUrl: echatUrl,
      pollUrl: epollUrl,
      insightId: einsightId,
      powerBIUrl: epowerBIUrl,
      timelineUrl: etimelineUrl,
      tweetsUrl: etweetsUrl,
      topicsUrl: etopicsUrl,
      influenceUrl: einfluenceUrl,
      topDomainsUrl: etopDomainsUrl,
      countries: ecountries,
      demographics: edemographics,
      postType: epostType,
      sources: esources,
      emotionsUrl: eemotionsUrl,
      emotionsIA: eemotionsIA,
      assignedUser: eassignedUser,
    };

    $.ajax({
      url: "/api/campaign",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        $("#modalEditarCampana").modal("hide");
        $("#formEditCampaign")[0].reset();
        $("#modalMessage").text("Registro Actualizado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
        $("#modalEditarCampana").modal("hide");
        $("#formEditCampaign")[0].reset();
        $("#alertError").modal("show");
      },
    });
  });

  $("#btnCerrarPreguntas").click(function () {
    /* Single line Reset function executes on click of Reset Button */
    $("#formNewQuestion")[0].reset();
    $(".question").each((index, element) => {
      $(element).parent("div").remove();
    });
  });

  $("#btnCerrarAnswers").click(function () {
    /* Single line Reset function executes on click of Reset Button */
    $("#contestarEncuesta")[0].reset();
    $(".answerContainer").each((index, element) => {
      $(element).remove();
    });
  });

  /* BORRAR CAMPAÑAS */

  $("#btnCampaignDelete").click(function () {
    var data = $("#deleteCampaignId").val();
    var url = "/api/campaign?campaignId=" + data;

    $.ajax({
      url: url,
      type: "DELETE",
      contentType: "application/json",
      success: function (result) {
        $("#modalBorrarCampaign").modal("hide");
        $("#formDeleteCampaign")[0].reset();
        $("#modalMessage").text("Registro Borrado Exitosamente");
        $("#alertSuccess").modal("show");
      },
      error: function (xhr, resp, text) {
        console.log(xhr, resp, text);
        data: data;
        $("#alertError").modal("show");
      },
    });
  });
}); // fin function

/* DATOS CARGAR IMG MEDICIONES CAMPAÑAS */

function NewGallery(campaignId) {
  //alert(campaignId);
  const selectedCampaign = campaigns.filter(
    (x) => x.campaignId === campaignId
  )[0];

  $("#formGaleria")[0].reset();

  /* capturar información del registro para asociar */
  $("#galleryCampaignId").val(selectedCampaign.campaignId);
}

function deleteGallery(campaignId) {
  //alert(campaignId);
  const selectedCampaign = campaigns.filter(
    (x) => x.campaignId === campaignId
  )[0];

  document.getElementById("tbgallery").innerHTML = "";
  var pics = selectedCampaign.galleries;

  //console.log(pics);

  var picHTML =
    "<tr><th>Id</th><th>Nombre Im&aacute;gen</th><th class='text-center'>Borrar</th>/tr>";

  pics.map((pic, index) => {
    var picID = pic.galleryId;
    var picUrl = pic.image;
    var picElement = picUrl.replace("/images/", "");

    picHTML +=
      "<tr><td>" +
      picID +
      "</td><td>" +
      picElement +
      '</td><td class="text-center"><button onclick="deletePic(' +
      picID +
      ')" type="button" rel="tooltip" data-toggle="modal" data-target="#modalDeletePic" class="btn btn-danger btn-icon btn-sm " data-original-title="Borrar" title="Borrar"><i class="far fa-trash-alt"></i></button></td></tr>';
    //+ '<button onclick="NewGallery('+ item.campaignId +')" type="button" rel="tooltip" data-toggle="modal" data-target="#modalGaleriaCampana" class="btn btn-warning btn-icon btn-sm " data-original-title="Galeria" title="Galeria"><i class="fas fa-camera-retro"></i></button>';
  });

  $("#tbgallery").append(picHTML);
  $("#campaignIdBorrado").val(selectedCampaign.campaignId);
}

/* GUARDAR FOTOGRAFÍA */

$(document).on("click", "#btnGalleryGuardar", function () {
  if ($("#inputGroupFile04").val() == "") {
    $("#alertError").modal("show");
    $("#modalGaleriaCampana").modal("hide");
  } else {
    $("#formGaleria").submit();
    $("#modalMessage").text("Imágen Cargada Exitosamente");
    $("#modalGaleriaCampana").modal("hide");
    $("#alertSuccess").modal("show");
  }

  //location.reload();
});

/* DATOS PARA BORRAR FOTOGRAFÍA */

function deletePic(galleryId) {
  //$('#modalGaleriaCampana').modal('hide');
  $("#deletePicId").val(galleryId);
}

/* BORRAR FOTOGRAFÍA */

$(document).on("click", "#btnPicDelete", function () {
  //$("#btnPicDelete").click(function() {

  var data = $("#deletePicId").val();
  //alert(data);

  var url = "/api/campaign/galeria?galleryId=" + data;

  $.ajax({
    url: url,
    type: "DELETE",
    contentType: "application/json",
    success: function (result) {
      //alert(data);
      $("#modalDeletePic").modal("hide");
      $("#formDeletePic")[0].reset();
      $("#modalMessage").text("Registro Borrado Exitosamente");
      $("#alertSuccess").modal("show");
    },
    error: function (xhr, resp, text) {
      console.log(xhr, resp, text);
      data: data;
    },
  });
});

/* DATOS CARGAR IMG MEDICIONES CAMPAÑAS */

function pollImgUpload(campaignId) {
  //alert(campaignId);
  const selectedCampaign = campaigns.filter(
    (x) => x.campaignId === campaignId
  )[0];
  /* capturar información del registro para cargar */

  $("#uploadCampaignId").val(selectedCampaign.campaignId);
}

//fernmarr agregar zoom julio2020
/* DATOS CARGAR VIDEOCONFERENCIAS A CAMPAÑAS */

function pollVidConf(campaignId) {
  //alert(campaignId);
  const selectedCampaign = campaigns.filter(
    (x) => x.campaignId === campaignId
  )[0];
  /* capturar información del registro para cargar */

  $("#vidConfCampaignId").val(selectedCampaign.campaignId);
  $("#tblConferences tbody").empty()
  if (selectedCampaign.conferences) {

    selectedCampaign.conferences.map(conference => {
      let trHTML5 =
        '<tr id="' +
        selectedCampaign.campaignId +
        '"><td>' +
        conference.conferenceName +
        "</td><td>" +
        conference.conferenceUrl +
        "</td><td>" +
     
        '<button onclick="deleteConference(' + conference.conferenceId + ')" type="button" rel="tooltip" data-toggle="modal" data-target="#modalBorrarConference" class="btn btn-danger btn-icon btn-sm " data-original-title="Borrar Sala" title="Borrar Sala"><i class="far fa-trash-alt"></i></button></td></tr>';

        $("#tblConferences").append(trHTML5);
    });
  }
}

//fernmarr agregar zoom julio2020
/* DATOS BORRAR VIDEOCONFERENCIAS A CAMPAÑAS */

function deleteConference(conferenceId) {
  
  /*const selectedConference = conferences.filter(
    (x) => x.conferenceId === conferenceId
  )[0];*/
  
  /* capturar información del registro para cargar */
  $('#modalPollVidConf').modal('hide')
  $("#deleteConferenceId").val(conferenceId);
}



/* DATOS PARA BORRAR CAMPAÑA */

function DeleteCampaign(campaignId) {
  const selectedCampaign = campaigns.filter(
    (x) => x.campaignId === campaignId
  )[0];
  /* capturar información del registro para borrar */

  $("#deleteCampaignId").val(selectedCampaign.campaignId);
}

/* LLENAR FORMULARIO EDICION CAMPAÑAS */

function EditCampaign(campaignId) {
  const selectedCampaign = campaigns.filter(
    (x) => x.campaignId === campaignId
  )[0];

  $("#editCampaignId").val(selectedCampaign.campaignId);
  $("#EcampaignName").val(selectedCampaign.campaignName);
  $("#EcampaignCustomer").val(selectedCampaign.campaignCustomer);
  $("#EcampaignProject").val(selectedCampaign.campaignProject);

  const startDate = moment
    .unix(selectedCampaign.startDate)
    .format("DD/MM/YYYY");
  $("#EstartDate").val(startDate);
  const endDate = moment.unix(selectedCampaign.endDate).format("DD/MM/YYYY");
  $("#EendDate").val(endDate);

  $("#EvideoUrl").val(selectedCampaign.videoUrl);

  $("#EchatUrl").val(selectedCampaign.chatUrl);
  $("#EpollUrl").val(selectedCampaign.pollUrl);
  $("#EinsightId").val(selectedCampaign.insightId);
  $("#EpollImageUrl").val(selectedCampaign.pollImageUrl);
  $("#EpowerBIUrl").val(selectedCampaign.powerBIUrl);
  $("#EtimelineUrl").val(selectedCampaign.timelineUrl);
  $("#EtweetsUrl").val(selectedCampaign.tweetsUrl);
  $("#EtopicsUrl").val(selectedCampaign.topicsUrl);
  $("#EinfluenceUrl").val(selectedCampaign.influenceUrl);
  $("#EtopDomainsUrl").val(selectedCampaign.topDomainsUrl);
  $("#Ecountries").val(selectedCampaign.countries);
  $("#Edemographics").val(selectedCampaign.demographics);
  $("#EpostType").val(selectedCampaign.postType);
  $("#Esources").val(selectedCampaign.sources);
  $("#EemotionsUrl").val(selectedCampaign.emotionsUrl);
  $("#EemotionsIA").val(selectedCampaign.emotionsIA);

  //$("#EassignedUser").val(selectedCampaign.assignedUser);

  // cargar lista de usuarios con el perfil CLIENTE

  const EselectedUserClient = users.filter((x) => x.roleName === "Cliente");
  //console.log(selectedUserClient);

  $.each(EselectedUserClient, function (i, item) {
    if (selectedCampaign.assignedUser == item.username) {
      $("#EassignedUser").append(
        '<option value="' +
        item.username +
        '" selected="selected">' +
        item.username +
        "</option>"
      );
    } else {
      $("#EassignedUser").append(new Option(item.username, item.username));
    }
  });
}

/* BORRAR ENCUESTA */

function DeletePoll(pollId) {
  const selectedPoll = polls.filter((x) => x.pollId === pollId)[0];
  /* capturar información del registro para borrar */

  $("#deletePollId").val(selectedPoll.pollId);
}

/* LLENAR FORMULARIO EDICION ENCUESTAS */

function EditPoll(pollId) {
  const selectedPoll = polls.filter((x) => x.pollId === pollId)[0];
  $("#editPollId").val(selectedPoll.pollId);
  $("#editPollName").val(selectedPoll.pollName);
  const startDate = moment.unix(selectedPoll.startDate).format("DD/MM/YYYY");
  $("#editStartDate").val(startDate);
  const endDate = moment.unix(selectedPoll.endDate).format("DD/MM/YYYY");
  $("#editEndDate").val(endDate);
}

/* BORRAR PALABRAS */

function deleteWord(word) {
  $("#word").val(word);
}

/* BORRAR USUARIOS */

function DeleteUser(userId) {
  const selectedUser = users.filter((x) => x.userId === userId)[0];
  /* capturar información del registro para borrar */

  $("#deleteUserId").val(selectedUser.userId);
}

/* LLENAR FORMULARIO EDITAR USUARIOS */

function EditUser(userId) {
  const selectedUser = users.filter((x) => x.userId === userId)[0];
  $("#editUserId").val(selectedUser.userId);
  $("#editCompleteName").val(selectedUser.completeName);
  $("#editUserName").val(selectedUser.username);
}

/* LLENAR FORMULARIO CREAR PREGUNTAS */

function NewQuestion(pollId) {
  /* capturar información del registro para editar */
  const selectedPoll = polls.filter((x) => x.pollId === pollId)[0];

  /* enviar datos a la modal */

  $("#editPollId").val(selectedPoll.pollId);
  if (selectedPoll.questions && selectedPoll.questions.length > 0) {
    for (var i = 0; selectedPoll.questions.length > i; i++) {
      $("#itemsQuestion").append(
        '<div class="form-group no-border btn-group d-flex w-100" role="group"><input class="form-control question" value="' +
        selectedPoll.questions[i].question +
        '" type="text" name="inputQuestion' +
        i +
        '" id="inputQuestion' +
        i +
        '" data-question-id="' +
        selectedPoll.questions[i].questionId +
        '"></div>'
      );
    }
  }
}

/* REGISTRAR NUEVA RESPUESTA */

function NewAnswer(pollId) {
  /* limpia formulario */
  // $("#contestarEncuesta")[0].reset();
  /* capturar información del registro para editar */
  const selectedPoll = polls.filter((x) => x.pollId === pollId)[0];

  /* enviar datos a la modal */

  $("#ApollId").val(selectedPoll.pollId);
  $("#ApollName").val(selectedPoll.pollName);

  if (selectedPoll.questions && selectedPoll.questions.length > 0) {
    for (var i = 0; selectedPoll.questions.length > i; i++) {
      $("#listQuestions").append(
        '<div class="answerContainer"><div class="alert alert-primary" role="alert"><label class="control-label">' +
        selectedPoll.questions[i].question +
        '</label></div><textarea class="form-control answer" data-question-id=" ' +
        selectedPoll.questions[i].questionId +
        '" name="name" rows="4" cols="80" placeholder="Escriba la respuesta"></textarea></div>'
      );
    }
  }
}

/* BORRAR FORMULARIOS */

$("#btnCerrar").click(function () {
  /* Single line Reset function executes on click of Reset Button */
  $("#formPoll")[0].reset();
});

$("#btnCerrarPreguntas").click(function () {
  /* Single line Reset function executes on click of Reset Button */
  $("#formNewQuestion")[0].reset();
});

/* CARGAR USUARIOS TIPO CLIENTE  */

function getUserClient() {
  const selectedUserClient = users.filter((x) => x.roleName === "Cliente");
  //console.log(selectedUserClient);

  $.each(selectedUserClient, function (i, item) {
    $("#assignedUser").append(new Option(item.username, item.username));
  });
}

/* EXPORT JSON TO CSV */

function exportPoll(pollId) {
  const selectedPoll = polls.filter((x) => x.pollId === pollId)[0];

  //	console.log(selectedPoll);
  //	var dataE = selectedPoll.questions;
  //	var exportAnswer = selectedPoll.answers;
  //	console.log(dataE);
  const csvArray = [];
  //csvArray.push({question: "Nombre de la pregunta", answer: "respuesta de la pregunta"});
  selectedPoll.questions.map((questionInPoll) => {
    questionInPoll.answers.map((answerInQuestion) => {
      csvArray.push({
        INSIGHT: selectedPoll.pollName,
        PREGUNTA: questionInPoll.question,
        RESPUESTA: answerInQuestion.answer,
      });
    });
  });
  const items = csvArray;
  const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
  const header = Object.keys(items[0]);
  let csv = items.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(",")
  );
  csv.unshift(header.join(","));
  csv = csv.join("\r\n");

  //console.log(csv);
  // nombre del archivo
  fileName = selectedPoll.pollName + ".csv";
  //console.log(fileName);

  // exportar archivo

  var hiddenElement = document.createElement("a");
  hiddenElement.href =
    "data:text/csv;charset=UTF-8," + "\uFEFF" + encodeURI(csv);
  //hiddenElement.href = 'data:text/csv;charset=ANSI,' + encodeURI(csv);
  hiddenElement.target = "_blank";
  hiddenElement.download = fileName;
  hiddenElement.click();
}
