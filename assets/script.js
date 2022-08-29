//array de números que representam as frutas
const arrFruits = [];

let selectedFruit = 0;
let score = 0;

//função para preencher o array de frutas
//caso haja splice de alguns itens, ele preencherá novamente até a length de 63 itens
function fullfillArr() {
  while (true) {
    if (arrFruits.length === 56) {
      break;
    }
    //funcão para gerar números considerando 8 frutas
    const aleatoryNumber = Math.floor(Math.random() * 7 + 1);
    arrFruits.unshift(aleatoryNumber);
  }
}

//funcão para começar o jogo
//insere as divs com as frutas
function generateGame() {
  fullfillArr();
  for (let i = 0; i < arrFruits.length; i++) {
    document.getElementById("gameBoard").insertAdjacentHTML(
      "beforeend",
      `
    <div id="number${i}" class="fruitElements row${setRowClass(
        i
      )} column${setColumnClass(i)}" onClick="setSelectedFruit(${i})">${
        arrFruits[i]
      }</div>
    `
    );
  }
  verifySequences();

  for (let i = 0; i <= 60; i++) {
    dropBoxes();
  }
  addNewItens();
}

//seleciona o local da fruta ao clicar no elemento e armazena na variável selectedFruit
//caso a primeira fruta já tenha sido selecionada, ele muda as duas de lugar
function setSelectedFruit(num) {
  if (selectedFruit === 0) {
    selectedFruit = num;
    colorItem(selectedFruit, "gold");
  } else {
    colorItem(selectedFruit, "greenyellow");
    if (
      num == selectedFruit - 1 ||
      num == selectedFruit + 1 ||
      num == selectedFruit - 8 ||
      num == selectedFruit + 8
    ) {
      const selected1 = document.getElementById(
        `number${selectedFruit}`
      ).innerText;
      const selected2 = document.getElementById(`number${num}`).innerText;

      document.getElementById(`number${selectedFruit}`).innerText = selected2;
      document.getElementById(`number${num}`).innerText = selected1;

      selectedFruit = 0;

      verifySequences();

      for (let i = 0; i <= 60; i++) {
        dropBoxes();
      }

      addNewItens();
    } else {
      selectedFruit = 0;
    }
  }
}

//função para colorir a fruta escolhida
function colorItem(num, color) {
  document.getElementById(`number${num}`).style.backgroundColor = color;
}

//verifica sequências na horizontal e vertical e dá splice
function verifySequences() {
  const arrRows = [];
  const arrColumns = [];

  for (let i = 1; i <= 8; i++) {
    const rows = document.querySelectorAll(`.row${i}`);

    for (let n = 0; n < rows.length; n++) {
      if (n < rows.length - 2) {
        if (
          rows[n].innerText === rows[n + 1].innerText &&
          rows[n].innerText === rows[n + 2].innerText
        ) {
          arrRows.push(rows[n]);
          arrRows.push(rows[n + 1]);
          arrRows.push(rows[n + 2]);
        }
      }
    }
  }

  for (let i = 1; i <= 8; i++) {
    const columns = document.querySelectorAll(`.column${i}`);

    for (let n = 0; n < columns.length; n++) {
      if (n < columns.length - 2) {
        if (
          columns[n].innerText === columns[n + 1].innerText &&
          columns[n].innerText === columns[n + 2].innerText
        ) {
          arrColumns.push(columns[n]);
          arrColumns.push(columns[n + 1]);
          arrColumns.push(columns[n + 2]);
        }
      }
    }
  }
  for (let n of arrColumns) {
    n.innerText = "";
  }
  for (let n of arrRows) {
    n.innerText = "";
  }
}

//faz as frutas "caírem" caso alguma fruta abaixo delas tenha sido removida
function dropBoxes() {
  for (let i = 1; i <= 8; i++) {
    const columns = document.querySelectorAll(`.column${i}`);

    for (let i = columns.length - 1; i >= 0; i--) {
      if (i < columns.length - 1) {
        if (columns[i + 1].innerText == "") {
          columns[i + 1].innerText = columns[i].innerText;
          columns[i].innerText = "";
        }
      }
    }
  }
}

//adiciona novos itens
function addNewItens() {
  for (let i = 1; i <= 8; i++) {
    const columns = document.querySelectorAll(`.column${i}`);
    for (let n of columns) {
      if (n.innerText === "") {
        const aleatoryNumber = Math.floor(Math.random() * 7 + 1).toString();
        n.innerText = aleatoryNumber;
      }
    }
  }
}

function setRowClass(i) {
  let rowClass = 0;
  if (i >= 0 && i <= 7) {
    rowClass = 1;
  } else if (i >= 8 && i <= 15) {
    rowClass = 2;
  } else if (i >= 16 && i <= 23) {
    rowClass = 3;
  } else if (i >= 24 && i <= 31) {
    rowClass = 4;
  } else if (i >= 32 && i <= 39) {
    rowClass = 5;
  } else if (i >= 40 && i <= 47) {
    rowClass = 6;
  } else if (i >= 48 && i <= 55) {
    rowClass = 7;
  }
  return rowClass;
}

function setColumnClass(i) {
  let columnClass = 0;
  if (
    i === 0 ||
    i === 8 ||
    i === 16 ||
    i === 24 ||
    i === 32 ||
    i === 40 ||
    i === 48
  ) {
    columnClass = 1;
  } else if (
    i === 1 ||
    i === 9 ||
    i === 17 ||
    i === 25 ||
    i === 33 ||
    i === 41 ||
    i === 49
  ) {
    columnClass = 2;
  } else if (
    i === 2 ||
    i === 10 ||
    i === 18 ||
    i === 26 ||
    i === 34 ||
    i === 42 ||
    i === 50
  ) {
    columnClass = 3;
  } else if (
    i === 3 ||
    i === 11 ||
    i === 19 ||
    i === 27 ||
    i === 35 ||
    i === 43 ||
    i === 51
  ) {
    columnClass = 4;
  } else if (
    i === 4 ||
    i === 12 ||
    i === 20 ||
    i === 28 ||
    i === 36 ||
    i === 44 ||
    i === 52
  ) {
    columnClass = 5;
  } else if (
    i === 5 ||
    i === 13 ||
    i === 21 ||
    i === 29 ||
    i === 37 ||
    i === 45 ||
    i === 53
  ) {
    columnClass = 6;
  } else if (
    i === 6 ||
    i === 14 ||
    i === 22 ||
    i === 30 ||
    i === 38 ||
    i === 46 ||
    i === 54
  ) {
    columnClass = 7;
  } else if (
    i === 7 ||
    i === 15 ||
    i === 23 ||
    i === 31 ||
    i === 39 ||
    i === 47 ||
    i === 55
  ) {
    columnClass = 8;
  }
  return columnClass;
}

generateGame();
