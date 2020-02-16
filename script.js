let init = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            jsonObj = JSON.parse(this.responseText);
            console.log(jsonObj);
            wypiszMenu();
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    document.title = "Wybierz instrukcję";
}

let wypiszMenu = () => {
    let menuRoot = document.getElementById("interface");
    while (menuRoot.firstChild)
        menuRoot.removeChild(menuRoot.firstChild);

    let ul = document.createElement("ul");
    let menuheader = document.createElement("div");
    menuheader.className = "menuheader";
    ul.appendChild(menuheader);
    menuheader.innerHTML = "Wybierz instrukcję";
    menuRoot.appendChild(ul);

    for (instr in jsonObj.instrukcja) {
        let mins = document.createElement("div");
        mins.className = "minstr";
        mins.setAttribute("onclick", "wypiszInstrukcje(" + instr + ")");
        mins.innerHTML = jsonObj.instrukcja[instr].numer + ". " + jsonObj.instrukcja[instr].temat;
        let li = document.createElement("li")
        li.appendChild(mins)
        ul.appendChild(li);
    }



}
let wypiszInstrukcje = (instr) => {

    let czyZwin = document.getElementsByTagName("li")[instr].getElementsByClassName("mpunkt").length;
    wypiszMenu();
    let li = document.getElementsByTagName("li")[instr];

    document.title = jsonObj.instrukcja[instr].temat;
    document.getElementsByClassName("minstr")[instr].className += " active";

    for (p in jsonObj.instrukcja[instr].punkt) {
        if (jsonObj.instrukcja[instr].punkt[p].tytul !== "") {
            let mpunkt = document.createElement("div");
            mpunkt.className = "mpunkt";
            mpunkt.setAttribute("onclick", "wypiszPunkt(" + instr + "," + p + ")");
            li.appendChild(mpunkt);
            mpunkt.innerHTML = parseInt(p) + 1 + ". " + jsonObj.instrukcja[instr].punkt[p].tytul;
        }
    }

    let instrukcjaRoot = document.getElementById("instrukcja");
    while (instrukcjaRoot.firstChild)
        instrukcjaRoot.removeChild(instrukcjaRoot.firstChild);

    let numer = document.createElement("div");
    numer.className = "numer";
    instrukcjaRoot.appendChild(numer);
    numer.innerHTML = "Ćwiczenie nr " + jsonObj.instrukcja[instr].numer;

    let temat = document.createElement("div");
    temat.className = "temat";
    instrukcjaRoot.appendChild(temat);
    temat.innerHTML = "Temat: " + jsonObj.instrukcja[instr].temat;

    for (sp in jsonObj.instrukcja[instr].specyfikacja) {
        let specyfikacja = document.createElement("div");
        specyfikacja.className = "specyfikacja";
        instrukcja.appendChild(specyfikacja);
        specyfikacja.innerHTML = jsonObj.instrukcja[instr].specyfikacja[sp].opis + ": <a href=\"" + jsonObj.instrukcja[instr].specyfikacja[sp].link + "\" target=\"_blank\">" + jsonObj.instrukcja[instr].specyfikacja[sp].link + "</a><br/>";
    }

    if (czyZwin) {
        while (li.childElementCount > 1)
            li.removeChild(li.lastChild);
    }
}
let wypiszPunkt = (instr, p) => {
    document.title = jsonObj.instrukcja[instr].temat + " - " + jsonObj.instrukcja[instr].punkt[p].tytul;
    document.getElementsByClassName("minstr")[instr].className = "minstr";
    for (pk in jsonObj.instrukcja[instr].punkt) {
        if (pk == p)
            document.getElementsByClassName("mpunkt")[pk].className = "mpunkt active";
        else
            document.getElementsByClassName("mpunkt")[pk].className = "mpunkt"
    }

    let instrukcjaRoot = document.getElementById("instrukcja");
    while (instrukcjaRoot.firstChild)
        instrukcjaRoot.removeChild(instrukcjaRoot.firstChild);

    instrukcjaRoot.scrollTo({ top: 0, behavior: 'smooth' });

    let punkt = document.createElement("div");
    punkt.className = "punkt";
    instrukcja.appendChild(punkt);

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

        if (jsonObj.instrukcja[instr].punkt[p].podpunkt[pp].obraz !== "") {
            let obraz = document.createElement("div");
            obraz.className = "obraz";
            podpunkt.appendChild(obraz);
            obraz.innerHTML = "<img src=" + jsonObj.instrukcja[instr].punkt[p].podpunkt[pp].obraz + " width='100' height='100'></img>";
        }
    }

}
var url = "instr.json";
var jsonObj;

window.addEventListener('load', init);