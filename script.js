let wypiszInstrukcje = () => {
    var instr = document.getElementById("wybor").value;
    console.log(instr);

    let instrukcjaRoot = document.getElementById("instrukcja");
    while (instrukcjaRoot.firstChild) {
        instrukcjaRoot.removeChild(instrukcjaRoot.firstChild);
    }
    let numer = document.createElement("div");
    numer.className = "numer";
    instrukcjaRoot.appendChild(numer);

    let temat = document.createElement("div");
    temat.className = "temat";
    instrukcjaRoot.appendChild(temat);

    // let specroot = document.createElement("div");
    // specroot.className = "specroot";
    // instrukcjaRoot.appendChild(specroot);

    // let punktroot = document.createElement("div");
    // punktroot.className = "punktroot";
    // instrukcjaRoot.appendChild(punktroot);


    numer.innerHTML = "Ćwiczenie nr " + jsonObj.instrukcja[instr].numer;
    temat.innerHTML = "Temat: " + jsonObj.instrukcja[instr].temat;

    for (sp in jsonObj.instrukcja[instr].specyfikacja) {
        let specyfikacja = document.createElement("div");
        specyfikacja.className = "specyfikacja";

        specyfikacja.innerHTML = jsonObj.instrukcja[instr].specyfikacja[sp].opis + ": <a href=\"" + jsonObj.instrukcja[instr].specyfikacja[sp].link + "\" target=\"_blank\">" + jsonObj.instrukcja[instr].specyfikacja[sp].link + "</a><br/>";
        instrukcja.appendChild(specyfikacja);

    }
    for (p in jsonObj.instrukcja[instr].punkt) {

        let punkt = document.createElement("div");
        punkt.className = "punkt";

        let tytul = document.createElement("div");
        tytul.className = "tytul";
        punkt.appendChild(tytul);
        tytul.innerHTML = jsonObj.instrukcja[instr].punkt[p].tytul;

        let tekst = document.createElement("div");
        tekst.className = "tekst";
        punkt.appendChild(tekst);
        tekst.innerHTML = jsonObj.instrukcja[instr].punkt[p].tekst;

        for (pp in jsonObj.instrukcja[instr].punkt[p].podpunkt) {

            let podpunkt = document.createElement("div");
            podpunkt.className = "podpunkt";
            punkt.appendChild(podpunkt);

            let podtytul = document.createElement("div");
            podtytul.className = "podtytul";
            podpunkt.appendChild(podtytul);
            podtytul.innerHTML = jsonObj.instrukcja[instr].punkt[p].podpunkt[pp].tytul;

            if (jsonObj.instrukcja[instr].punkt[p].podpunkt[pp].kod !== "") {
                let kod = document.createElement("div");
                kod.className = "kod";
                podpunkt.appendChild(kod);
                kod.innerHTML = "<table><td><pre><code>" + jsonObj.instrukcja[instr].punkt[p].podpunkt[pp].kod + "</code></pre></td></table>";
            }
            let podpis = document.createElement("div");
            podpis.className = "podpis";
            podpunkt.appendChild(podpis);
            podpis.innerHTML = jsonObj.instrukcja[instr].punkt[p].podpunkt[pp].podpis;
        }

        instrukcja.appendChild(punkt);
    }

}

var xmlhttp = new XMLHttpRequest();
var url = "instr.json";
var jsonObj;

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        jsonObj = JSON.parse(this.responseText);
        console.log(jsonObj);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();
