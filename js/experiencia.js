$(document).ready(function () {
  $("#easy").click(function () {
    $("#easy").toggleClass("facil");
    $("#difficult").removeClass("dificil");
  });

  $("#difficult").click(function () {
    $("#difficult").toggleClass("dificil");
    $("#easy").removeClass("facil");
  });

  $("#sendComments").click(function () {
    let comments = $("#comments").val();
    if (comments) {
      $("#alertSuccess").removeClass("d-none");
      $("#alertError").addClass("d-none"); // Ocultar el mensaje de error si está visible

      
      $("#comments").val("");

      setTimeout(function () {
        $("#alertSuccess").addClass("d-none");
      }, 2000);
    } else {
      $("#alertError").removeClass("d-none");

      setTimeout(function () {
        $("#alertError").addClass("d-none");
      }, 2000);
    }
  });
});
