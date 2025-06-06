// Questão 1 - AFD (a)
function verificarAFD1() {
    const input = document.getElementById('inputAfd1').value.trim();
    let estado = 'q0';
    const transicoes = [];

    const transicoesEl = document.getElementById('transicoesAfd1');
    const resultadoEl = document.getElementById('resultadoAfd1');

    // Resetar conteúdo anterior
    transicoesEl.innerHTML = '';
    resultadoEl.innerText = '';

    // Mostrar estado inicial
    transicoes.push(`Estado inicial: <strong>${estado}</strong>`);

    for (const simbolo of input) {
        let proximoEstado = estado;

        if (estado === 'q0') {
            if (simbolo === '1') {
                proximoEstado = 'q1';
            } else if (simbolo === '0') {
                proximoEstado = 'q4'; // Estado que aceita "0" isolado
            }
        } else if (estado === 'q1') {
            proximoEstado = simbolo === '0' ? 'q2' : 'q1';
        } else if (estado === 'q2') {
            proximoEstado = simbolo === '0' ? 'q3' : 'q1';
        } else if (estado === 'q3') {
            proximoEstado = 'q3'; // Estado de aceitação por ter visto "100"
        } else if (estado === 'q4') {
            proximoEstado = simbolo === '1' ? 'q1' : 'q4'; // Continua aceitando zeros após ter visto um único "0"
        }

        transicoes.push(`(${estado}) --[${simbolo}]--> (${proximoEstado})`);
        estado = proximoEstado;
    }

    // Mostrar transições no HTML
    transicoesEl.innerHTML = `<h4>Transições:</h4><ul>` + 
        transicoes.map(t => `<li>${t}</li>`).join('') + `</ul>`;

    // Verificar se aceita
const aceita = (estado === 'q3' || estado === 'q4');

if (aceita) {
    resultadoEl.innerText = `Cadeia aceita. Terminou no estado (${estado}), que é um estado de aceitação.`;
} else {
    resultadoEl.innerText = `Cadeia não aceita. Terminou no estado (${estado}), que não é um estado de aceitação.`;
}

resultadoEl.className = aceita ? 'texto-sucesso' : 'texto-erro';

}

// Questão 1 - AFD (b)
function verificarAFD2() {
  const input = document.getElementById('inputAfd2').value.trim();
  const resultadoEl = document.getElementById('resultadoAfd2');

  if (!/^[ab]*$/.test(input)) {
    resultadoEl.innerText = ' Entrada inválida: use apenas "a" e "b".';
    resultadoEl.className = 'texto-erro';
    return;
  }

  let paridadeA = true; // true = par
  let ultimo = '';
  for (const c of input) {
    if (c === 'a') paridadeA = !paridadeA;
    if (c === 'a' || c === 'b') ultimo = c;
  }

  if (ultimo === 'b' && paridadeA) {
    resultadoEl.innerText = ' Cadeia aceita.';
    resultadoEl.className = 'texto-sucesso';
  } else {
    resultadoEl.innerText = ' Cadeia não aceita.';
    resultadoEl.className = 'texto-erro';
  }
}

// Questão 2 - Buscar "computador"
function buscarComputador() {
  const texto = document.getElementById('textoQuestao2').innerText.toLowerCase();
  const palavra = 'computador';
  const posicoes = [];

  for (let i = 0; i <= texto.length - palavra.length; i++) {
    let estado = 0; // Começa no estado inicial (q0)
    
    // Percorre as letras do texto a partir da posição i
    for (let j = 0; j < palavra.length; j++) {
      if (texto[i + j] === palavra[j]) {
        estado++; // Transita para o próximo estado se a letra corresponder
      } else {
        break; // Se não corresponder, a busca para nesse ponto
      }
    }

    // Se chegarmos ao estado final (q10), encontramos a palavra
    if (estado === palavra.length) {
      posicoes.push(i);
    }
  }

  const resultadoEl = document.getElementById('resultadoComputador');
  if (posicoes.length > 0) {
    resultadoEl.innerText = `Ocorrências encontradas nas posições: ${posicoes.join(', ')}.`;
    resultadoEl.className = 'texto-sucesso';
  } else {
    resultadoEl.innerText = 'Nenhuma ocorrência encontrada.';
    resultadoEl.className = 'texto-erro';
  }
}


// Questão 3 - Máquina de Refrigerante (Mealy)
let saldo = 0;
let historicoMoedas = [];
let historicoSaidas = [];

function inserirMoeda(valor) {
  historicoMoedas.push(valor);
  saldo += valor;

  let latasLiberadas = 0;

  while (saldo >= 100) {
    saldo -= 100;
    latasLiberadas++;
    historicoSaidas.push('Lata liberada');
  }

  atualizarHistorico(latasLiberadas);
}

function atualizarHistorico(latasLiberadas) {
  const saidaEl = document.getElementById('saida');
  const historicoMoedasEl = document.getElementById('historicoMoedas');
  const historicoSaidasEl = document.getElementById('historicoSaidas');
  const saldoAtualEl = document.getElementById('saldoAtual');

  if (latasLiberadas > 0) {
    saidaEl.innerText = ` ${latasLiberadas} lata(s) liberada(s).`;
    saidaEl.className = 'texto-sucesso';
  } else {
    saidaEl.innerText = 'Saldo insuficiente para liberar lata.';
    saidaEl.className = 'texto-erro';
  }

  historicoMoedasEl.innerText = 'Moedas inseridas: ' + historicoMoedas.map(v => `R$ ${(v/100).toFixed(2)}`).join(', ');
  historicoSaidasEl.innerText = 'Latas liberadas: ' + (historicoSaidas.length > 0 ? historicoSaidas.join(', ') : '-');
  saldoAtualEl.innerText = `Saldo atual: R$ ${(saldo/100).toFixed(2)}`;
}

function resetar() {
  saldo = 0;
  historicoMoedas = [];
  historicoSaidas = [];
  document.getElementById('saida').innerText = '-';
  document.getElementById('historicoMoedas').innerText = 'Moedas inseridas: ';
  document.getElementById('historicoSaidas').innerText = 'Latas liberadas: ';
  document.getElementById('saldoAtual').innerText = 'Saldo atual: R$ 0,00';
  document.getElementById('resultadoAfd1').innerText = '';
  document.getElementById('resultadoAfd2').innerText = '';
  document.getElementById('resultadoComputador').innerText = '';
}
