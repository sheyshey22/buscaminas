var filas, colum, bombs, matriz, table;
function statusLevel() {
    init();
    var difficulty = document.getElementById("level");
    difficulty.onchange = init;
}
statusLevel();
function init() {
    table = document.getElementById("table");
    table.onclick = verifica;
    table.oncontextmenu = flag;
    var difficulty = document.getElementById("level");
    switch (parseInt(difficulty.value)) {
        case 0:
            filas = 9;
            colum = 9;
            bombs = 10;
            break;
        case 1:
            filas = 16;
            colum = 16;
            bombs = 40;
            break;
        default:
            filas = 16;
            colum = 30;
            bombs = 99;
            break;
    }
    makeTable(filas, colum);
    makeBombs();
    putNums();
}
function generaMatriz(f, c) {
    matriz = [];
    for (var i = 0; i < f; i++) {
        matriz[i] = new Array(c).fill(0);
    }
    console.log(matriz);
}
function makeTable(f, c) {
    generaMatriz(f, c);
    var str = "";
    for (var i = 0; i < f; i++) {
        str += "<tr>";
        for (var j = 0; j < c; j++) {
            str += "<td class='celda'></td>";
        }
        str += "</tr>";
    }
    table.innerHTML = str;
}
function showTable() {
    for (var i = 0; i < filas; i++) {
        for (var j = 0; j < colum; j++) {
            if (matriz[i][j] === -1) {
                table.rows[i].cells[j].innerHTML = "../";
            } else {
                table.rows[i].cells[j].innerHTML = matriz[i][j];
            }
        }
    }
}
function makeBombs() {
    for (var i = 0; i < bombs;) {
        var fila = Math.floor((Math.random() * filas));
        var col = Math.floor((Math.random() * colum));
        if (matriz[fila][col] === 0) {
            matriz[fila][col] = -1;
            i++;
        }
    }
}
function makeNums(f, c) {
    var cont = 0;
    for (var i = f - 1; i <= f + 1; i++) {
        for (var j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < filas && j >= 0 && j < colum) {
                if (matriz[i][j] === -1) {
                    cont++;
                }
            }
        }
    }
    matriz[f][c] = cont;
}
function putNums() {
    for (var i = 0; i < filas; i++) {
        for (var j = 0; j < colum; j++) {
            if (matriz[i][j] !== -1) {
                makeNums(i, j);
            }
        }
    }
}
function flag(event) {
    var cell = event.target;
    var fila = cell.parentNode.rowIndex;
    var col = cell.cellIndex;
    if (cell.className === "celda") {
        cell.className = "flag";
        cell.innerHTML = "&#128681;";
    } else if (cell.className === "flag") {
        cell.className = "celda";
        cell.innerHTML = "";
    }
    return false;
}

function space(f, c) {
    for (var i = f - 1; i <= f + 1; i++) {
        for (var j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < filas && j >= 0 && j < colum) {
                var cell = table.rows[i].cells[j];
                if (cell.className !== "blank") {
                    switch (matriz[i][j]) {
                        case -1:
                            break;
                        case 0:
                            cell.innerHTML = "";
                            cell.className = "blank";
                            space(i, j);
                            break;
                        default:
                            cell.innerHTML = matriz[i][j];
                            cell.className = "n" + matriz[i][j];
                    }
                }
            }
        }
    }
}
function mostrarBombas() {
    for (var i = 0; i < filas; i++) {
        for (var j = 0; j < colum; j++) {
            if (matriz[i][j] === -1) {
                var cell = table.rows[i].cells[j];
                cell.innerHTML = "&#128163;";
                cell.className = "blank";
            }
        }
    }
}
function verifica(event) {
    var cell = event.target;
    if (cell.className !== "flag") {
        var fila = cell.parentNode.rowIndex;
        var col = cell.cellIndex;
        switch (matriz[fila][col]) {
            case -1:
                mostrarBombas();
                cell.style.backgroundColor = "red";
                table.onclick = undefined;
                swal("BUMMM!", "You clicked the button!", "error");
                break;
            case 0:
                space(fila, col);
                break;
            default:
                cell.innerHTML = matriz[fila][col];
                cell.className = "n" + matriz[fila][col];
        }
        isWin();
    }
}
function isWin() {
    var cells = document.querySelectorAll(".celda, .flag");
    if (cells.length === bombs) {
        mostrarBombas();
        table.onclick = undefined;
        table.oncontextmenu = undefined;
         swal("BUMMM!", "You clicked the button!", "succes");;
    }
}
function playAgain(){
    onload=statusLevel();
    onload =init();

}
