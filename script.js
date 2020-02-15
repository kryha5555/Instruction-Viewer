var xmlhttp = new XMLHttpRequest();
var url = "instr.json";
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        console.log(myObj);
        //document.getElementById("demo").innerHTML += "<pre><code class=\"html\">" + myObj.instrukcja[0].punkt[1].podpunkt[1].kod + "</code></pre>";
        document.getElementById("instrukcja").innerHTML += myObj.instrukcja[0].numer;
        document.getElementById("temat").innerHTML += myObj.instrukcja[0].temat;

        for (sp in myObj.instrukcja[0].specyfikacja)
            document.getElementById("specyfikacja").innerHTML += myObj.instrukcja[0].specyfikacja[sp].opis + ": <a href=\"" + myObj.instrukcja[0].specyfikacja[sp].link + "\" target=\"_blank\">" + myObj.instrukcja[0].specyfikacja[sp].link + "</a><br/>";

        for (p in myObj.instrukcja[0].punkt) {

            let punkt = document.createElement("div");
            punkt.className = "punkt";

            let tytul = document.createElement("div");
            tytul.className = "tytul";
            punkt.appendChild(tytul);
            tytul.innerHTML += myObj.instrukcja[0].punkt[p].tytul;

            let tekst = document.createElement("div");
            tekst.className = "tekst";
            punkt.appendChild(tekst);
            tekst.innerHTML += myObj.instrukcja[0].punkt[p].tekst;

            for (pp in myObj.instrukcja[0].punkt[p].podpunkt) {

                let podpunkt = document.createElement("div");
                podpunkt.className = "podpunkt";
                punkt.appendChild(podpunkt);

                let ptytul = document.createElement("div");
                ptytul.className = "ptytul";
                podpunkt.appendChild(ptytul);
                ptytul.innerHTML += "&nbsp&nbsp&nbsp&nbsp" + myObj.instrukcja[0].punkt[p].podpunkt[pp].tytul;

                let kod = document.createElement("div");
                kod.className = "kod";
                podpunkt.appendChild(kod);
                kod.innerHTML += "<table><td><pre><code>" + myObj.instrukcja[0].punkt[p].podpunkt[pp].kod + "</code></pre></td></table>";

                let podpis = document.createElement("div");
                podpis.className = "podpis";
                podpunkt.appendChild(podpis);
                podpis.innerHTML += myObj.instrukcja[0].punkt[p].podpunkt[pp].podpis;
            }

            document.getElementById("punktroot").appendChild(punkt);
        }
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
