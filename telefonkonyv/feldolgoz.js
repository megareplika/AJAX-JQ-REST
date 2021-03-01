
var telefonkonyvem = [];
function kiir() {
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        var konyv = telefonkonyvem[i];
        var elem = "<div><h2>" + konyv.nev + "</h2><p>" + konyv.tel + "</p><p><img src = '" + konyv.kep + "' alt='kep'></p><button class='torol'>Töröl</button></div>";
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

$(function () {
    $("#beolvas").on("click", beolvas);
    $("#kuld").on("click", adBeir);
});

