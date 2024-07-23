$(document).ready(function () {
  $("#easy").click(function () {
    $("#easy").toggleClass("btn-success text-white");
    $("#difficult").removeClass("btn-danger text-white");
  });

  $("#difficult").click(function () {
    $("#difficult").toggleClass("btn-danger text-white");
    $("#easy").removeClass("btn-success text-white");
  });

  $("#sendComments").click(function () {
    let comments = $("#comments").val();
    if (comments) {
      alert("¡Gracias por tus comentarios!\n\n" + comments);
    } else {
      alert("Por favor, escribe tus comentarios.");
    }
  });
});
