
const DIRECOES = ['N', 'L', 'S', 'O'];

// Retorna o índice da direção (N,L,S,O) no array DIRECOES
function indiceDirecao(dir) {
    return DIRECOES.indexOf(dir);
}

// GIRA PARA "E" ou "D"
function girar(dirAtual, comando) {
    let i = indiceDirecao(dirAtual);
    if (comando === 'D') i = (i + 1) % 4;
    else if (comando === 'E') i = (i + 3) % 4;
    return DIRECOES[i];
}

// Gira até chegar 
function girarAte(dirAtual, dirAlvo) {
    if (dirAtual === dirAlvo) return '';
    let comandos = '', d = dirAtual;
    for (let i = 0; i < 4; i++) {
        d = girar(d, 'D');
        comandos += 'D';
        if (d === dirAlvo) break;
    }
    return comandos;
}

// Gera comandos para ir de (x1,y1,dir) até (x2,y2)
function caminhoAte(x1, y1, dir, x2, y2) {
    let cmds = '', d = dir, x = x1, y = y1;

    // Ajustar eixo X
    if (x2 !== x) {
        const alvo = x2 > x ? 'L' : 'O';
        const rot = girarAte(d, alvo);
        cmds += rot;
        for (const c of rot) d = girar(d, c);
        cmds += 'M'.repeat(Math.abs(x2 - x));
        x = x2;
    }

    // Ajustar eixo Y
    if (y2 !== y) {
        const alvo = y2 > y ? 'N' : 'S';
        const rot = girarAte(d, alvo);
        cmds += rot;
        for (const c of rot) d = girar(d, c);
        cmds += 'M'.repeat(Math.abs(y2 - y));
        y = y2;
    }

    return { cmds, dirFinal: d, xFinal: x, yFinal: y };
}

// STRING DE COMANDOS
function comandosIrrigacao(largura, altura, xIni, yIni, dirIni, canteiros) {
    let cmds = '', x = xIni, y = yIni, d = dirIni;
    for (const [cx, cy] of canteiros) {
        const { cmds: mov, dirFinal, xFinal, yFinal } = caminhoAte(x, y, d, cx, cy);
        cmds += mov + 'I';
        d = dirFinal; x = xFinal; y = yFinal;
    }
    return { cmdsFinais: cmds, dirFinal: d };
}

// Função MAIN (Entradas)
const largura = 5, altura = 5;
const xInicial = 0, yInicial = 0, dirInicial = 'N';
const canteiros = [[4, 1], [4, 5], [3, 4], [2, 3], [1, 2], [2, 1]];

const resultado = comandosIrrigacao(largura, altura, xInicial, yInicial, dirInicial, canteiros);
console.log('Comandos gerados:', resultado.cmdsFinais);
console.log('Orientação final :', resultado.dirFinal);

// PASSO A PASSO
function executarPassoAPasso(x, y, dir, comandos) {
    let i = 0;
    const intervalo = setInterval(() => {
        if (i >= comandos.length) {
            clearInterval(intervalo);
            console.log('Processo concluído!');
            return;
        }
        const acao = comandos[i++];
        if (acao === 'D' || acao === 'E') {
            dir = girar(dir, acao);
        } else if (acao === 'M') {
            if (dir === 'N') y++;
            else if (dir === 'S') y--;
            else if (dir === 'L') x++;
            else if (dir === 'O') x--;
        } else if (acao === 'I') {
            console.log(`Irrigando em (${x}, ${y})`);
        }
        console.log(`Ação: ${acao} => Posição: (${x}, ${y}) | Direção: ${dir}`);
    }, 500);
}

// Descomente para ver a animação passo a passo no console:
executarPassoAPasso(xInicial, yInicial, dirInicial, resultado.cmdsFinais);
