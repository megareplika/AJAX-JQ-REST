
var telefonkonyvem = [];
function kiir() {
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        var konyv = telefonkonyvem[i];
        var elem = "<div><h2>" + konyv.nev + "</h2><p>" + konyv.tel + "</p><p><img src = '" + konyv.kep + "' alt='kep'></p><button class='torol' id='" + konyv.ID + "'>Töröl</button> <button class='szerkeszt' id='" + i + "'>Szerkeszt</button></div>";
        $("article").append(elem);
    }
}

function beolvas() {
    $.ajax(
            {
                type: "GET",
                url: "feldolgoz.php",
                success: function (result) {
                    telefonkonyvem = JSON.parse(result);
                    console.log(telefonkonyvem);
                    kiir();
                },
                error: function () {
                    alert("Hiba az adatok betöltésekor");
                }
            });
}

function adBeir() {
    var személy = {
        nev: $("#nev").val(),
        tel: $("#tel").val(),
        kep: $("#kep").val()
    }
    $.ajax(
            {
                type: "POST",
                url: "beir.php",
                data: személy,
                success: function (result) {
                    telefonkonyvem.push(JSON.parse(result));
                    console.log(telefonkonyvem);
                    kiir();
                },
                error: function () {
                    alert("Hiba az adatok mentésekor");
                }
            });
}

function adTorol() {
    console.log("torlés");
    var elem = $(this);
    var id = elem.attr("id");
    $.ajax(
            {
                type: "DELETE",
                url: "torles.php?ID=" + id,
                success: function (result) {
                    elem.closest("div").remove();
                },
                error: function () {
                    alert("Hiba az adatok torlésekor");
                }
            });
}

function adatszerkeszt() {
//    console.log("modosit");
    $(".szerkesztes").removeClass("elrejt");
    var index = $(this).attr("id");
//    console.log(index);
    var elem = telefonkonyvem[index];
    $("#id2").val(elem.ID);
    $("#nev2").val(elem.nev);
    $("#tel2").val(elem.tel);
    $("#kep2").val(elem.kep);
}

function adatmegse() {
    $(".szerkesztes").addClass("elrejt");
}

function admodosit() {
    var editSzemély = {
        id: $("#id2").val(),
        nev: $("#nev2").val(),
        tel: $("#tel2").val(),
        kep: $("#kep2").val()
    }
    console.log("modosít");
    console.log(editSzemély);
    $.ajax(
            {
                type: "PUT",
                url: "modosit.php",
                data: editSzemély,
                success: function () {
                    beolvas();
                },
                error: function () {
                    alert("Hiba az adatok adatokmodosításakor");
                }
            });
}

$(function () {
    $("#beolvas").on("click", beolvas);
    $("#kuld").on("click", adBeir);
    $("#megse").on("click", adatmegse);
    $("#modosit").on("click", admodosit);
    $("article").delegate(".torol", "click", adTorol);
    $("article").delegate(".szerkeszt", "click", adatszerkeszt);
});