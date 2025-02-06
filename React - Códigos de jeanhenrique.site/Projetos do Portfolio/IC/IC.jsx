import React from 'react';
import styles from './IC.module.css';
import { useTheme } from '../../ThemeContext';

function IC() {
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;

    return (
        <div className={theme}>
            <div className={styles.containerFora}>
                <section className={styles.container}>
                    <h1>Trabalho de Inteligência Computacional</h1>
                    <h2>Alunos</h2>
                    <div className={styles.alunosContainer}>
                        <div className={styles.alunos}>
                            <div className={styles.aluno}>
                                <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Dyonatam Terluk" className={styles.profileImage} />
                                <p>Dyonatam Terluk</p>
                            </div>
                            <div className={styles.aluno}>
                                <img src="https://randomuser.me/api/portraits/lego/2.jpg" alt="Gabriel Gomes" className={styles.profileImage} />
                                <p>Gabriel Gomes</p>
                            </div>
                            <div className={styles.aluno}>
                                <img src="https://randomuser.me/api/portraits/lego/3.jpg" alt="Jean Henrique" className={styles.profileImage} />
                                <p>Jean Henrique</p>
                            </div>
                            <div className={styles.aluno}>
                                <img src="https://randomuser.me/api/portraits/lego/4.jpg" alt="João Jardel" className={styles.profileImage} />
                                <p>João Jardel</p>
                            </div>
                        </div>
                    </div>
                    <article className={styles.section}>
                        <h2>Conteúdos:</h2>
                        <ol className={styles.summary}>
                            <li><a href="#graphplan">Algoritmo Graphplan</a></li>
                            <ul>
                                <li><a href="#descricao">Descrição do Algoritmo</a></li>
                                <li><a href="#construção">Construção do Gráfico</a></li>
                                <li><a href="#busca">Busca por Planos</a></li>
                                <li><a href="#exclusao">Exclusões Mútuas</a></li>
                            </ul>
                            <li><a href="#strips-pddl">STRIPS e PDDL</a></li>
                            <ul>
                                <li><a href="#strips">STRIPS</a></li>
                                <li><a href="#pddl">PDDL</a></li>
                            </ul>
                            <li><a href="#exemplo">Exemplo de Aplicação</a></li>
                            <li><a href="#blocks">Problema "Blocks" com Pyperplan</a></li>
                            <ul>
                                <li><a href="#blocks-modelo">Modelo em PDDL</a></li>
                                <li><a href="#blocks-problema">Problema em PDDL</a></li>
                                <li><a href="#blocks-execucao">Executando com Pyperplan</a></li>
                            </ul>
                            <li><a href="#logistics">Problema "Logistics" com Pyperplan</a></li>
                            <ul>
                                <li><a href="#logistics-modelo">Modelo em PDDL</a></li>
                                <li><a href="#logistics-problema">Problema em PDDL</a></li>
                                <li><a href="#logistics-execucao">Executando com Pyperplan</a></li>
                            </ul>
                        </ol>
                    </article>
                    <article id="graphplan" className={styles.section}>
                        <h2>Algoritmo Graphplan</h2>
                        <h3 id="descricao">Descrição do Algoritmo</h3>
                        <p>
                            O Graphplan é um algoritmo de planejamento em inteligência artificial introduzido por Avrim Blum e Merrick Furst em 1995.
                            Ele é usado para resolver problemas que requerem a determinação de uma sequência de ações que transforma um estado inicial
                            em um estado objetivo. O algoritmo constrói um gráfico de planejamento que consiste em camadas alternadas de estados e ações.
                            Cada camada de estado representa as condições possíveis naquele ponto, enquanto cada camada de ação representa as ações
                            que podem ser realizadas a partir daquele estado.
                        </p>
                        <p>
                            O processo de planejamento com Graphplan envolve a expansão deste gráfico até que uma solução que satisfaça as condições
                            de meta seja encontrada ou até que seja provado que nenhum plano viável existe. O Graphplan utiliza técnicas de propagação
                            para eliminar ações inconsistentes, identificando "mutexes" (exclusões mútuas) que são pares de ações ou condições que
                            não podem ser verdadeiras simultaneamente. Esta técnica reduz significativamente o espaço de busca, tornando o Graphplan
                            eficiente em domínios onde múltiplas ações são interdependentes.
                        </p>
                        <p>
                            O Graphplan é particularmente eficaz em problemas de planejamento que envolvem muitas ações simultâneas e complexas,
                            permitindo a identificação rápida de soluções viáveis através da construção e análise do gráfico de planejamento.
                        </p>
                        <h3 id="construção">Construção do Gráfico</h3>
                        <p>
                            O gráfico de planejamento no Graphplan é construído em etapas:
                        </p>
                        <ul>
                            <li>**Estado Inicial:** Representado como o nível inicial do gráfico, onde cada fato verdadeiro no estado inicial é um nó.</li>
                            <li>**Ações:** Para cada ação aplicável no nível atual, um nó de ação é adicionado ao próximo nível do gráfico. As arestas são desenhadas entre as pré-condições das ações e as ações correspondentes.</li>
                            <li>**Estados Resultantes:** Cada efeito das ações no nível de ação é representado como nós no nível de estado subsequente. As arestas ligam as ações aos seus efeitos.</li>
                        </ul>
                        <p>
                            Esse processo continua até que um nível de estado contenha todos os objetivos ou até que não sejam gerados novos estados.
                        </p>
                        <h3 id="busca">Busca por Planos</h3>
                        <p>
                            Após a construção do gráfico, o Graphplan busca por um plano que satisfaça todos os objetivos. A busca é feita do nível de estado mais alto para baixo:
                        </p>
                        <ul>
                            <li>**Busca de Regressão:** A partir do nível de estado mais alto, a busca tenta satisfazer os objetivos movendo-se para trás através dos níveis de ação.</li>
                            <li>**Propagação de Exclusões Mútuas:** A busca leva em consideração as exclusões mútuas para garantir que não sejam escolhidas ações ou estados que se excluam mutuamente.</li>
                        </ul>
                        <h3 id="exclusao">Exclusões Mútuas</h3>
                        <p>
                            As exclusões mútuas são pares de ações ou estados que não podem ser verdadeiros ao mesmo tempo. Elas são usadas para reduzir o espaço de busca:
                        </p>
                        <ul>
                            <li>**Exclusões Mútuas de Ações:** Duas ações são mutuamente exclusivas se a execução de uma impede a execução da outra.</li>
                            <li>**Exclusões Mútuas de Estados:** Dois estados são mutuamente exclusivos se a verdade de um impede a verdade do outro.</li>
                        </ul>
                    </article>
                    <article id="strips-pddl" className={styles.section}>
                        <h2>STRIPS e PDDL</h2>
                        <h3 id="strips">STRIPS</h3>
                        <p>
                            STRIPS, ou Stanford Research Institute Problem Solver, é uma linguagem formal para especificação de problemas de planejamento
                            introduzida na década de 1970. STRIPS define problemas através de uma estrutura que inclui:
                        </p>
                        <ul>
                            <li><strong>Estado Inicial:</strong> Um conjunto de fatos que descrevem a configuração inicial do mundo. Cada fato é uma proposição que pode ser verdadeira ou falsa.</li>
                            <li><strong>Objetivo:</strong> Um conjunto de proposições que descrevem as condições que devem ser verdadeiras para que o objetivo seja alcançado.</li>
                            <li><strong>Ações:</strong> Cada ação tem pré-condições (proposições que devem ser verdadeiras para que a ação possa ser executada) e efeitos (proposições que se tornam verdadeiras ou falsas após a execução da ação).</li>
                        </ul>
                        <p>
                            As ações em STRIPS são representadas por operadores que descrevem como o estado do mundo muda ao aplicar a ação. A busca por
                            um plano consiste em aplicar essas ações ao estado inicial para gerar novos estados até que o estado objetivo seja alcançado.
                        </p>
                        <h3 id="pddl">PDDL</h3>
                        <p>
                            PDDL, ou Planning Domain Definition Language, é uma linguagem de modelagem de problemas de planejamento desenvolvida para
                            ser mais flexível e expressiva que STRIPS. PDDL permite:
                        </p>
                        <ul>
                            <li><strong>Definição de Tipos:</strong> Suporta a definição de diferentes tipos de objetos, facilitando a modelagem de domínios complexos.</li>
                            <li><strong>Hierarquias de Ações:</strong> Permite a organização de ações em hierarquias, oferecendo uma estrutura mais organizada para a modelagem de problemas.</li>
                            <li><strong>Pré-condições e Efeitos Detalhados:</strong> Permite a especificação de pré-condições e efeitos de maneira detalhada, incluindo condições temporais e efeitos condicionais.</li>
                        </ul>
                        <p>
                            PDDL se tornou amplamente adotado em competições de planejamento e em pesquisas devido à sua capacidade de modelar uma ampla
                            gama de problemas de planejamento com precisão e flexibilidade.
                        </p>
                    </article>
                    <article id="exemplo" className={styles.section}>
                        <h2>Exemplo de Aplicação</h2>
                        <p>
                            Considere um robô em uma sala que precisa mover um bloco de uma posição inicial para uma posição alvo. As ações possíveis para o robô incluem
                            mover-se entre posições, pegar o bloco e soltar o bloco. Este exemplo pode ser modelado em STRIPS da seguinte forma:
                        </p>
                        <code className={styles.codeBlock}>
                            {`
/*
 Estado inicial: O robô está na posição R1, o bloco está na posição B1
*/
PosiçãoRobo(R1), PosiçãoBloco(B1)

/*
 Ações:
 - Mover(R1, R2): O robô se move de R1 para R2
    Pré-condição: PosiçãoRobo(R1)
    Efeito: PosiçãoRobo(R2)
 - Pegar(R1, B1): O robô pega o bloco B1 na posição R1
    Pré-condição: PosiçãoRobo(R1), PosiçãoBloco(B1)
    Efeito: PossuiBloco(B1)
 - Soltar(R2, B2): O robô solta o bloco B1 na posição R2
    Pré-condição: PosiçãoRobo(R2), PossuiBloco(B1)
    Efeito: PosiçãoBloco(B2)
*/
                            `}
                        </code>
                        <p>
                            Com Graphplan, podemos expandir um gráfico de planejamento onde as camadas representam estados possíveis do robô e do bloco,
                            e as ações representam as transições entre esses estados. O objetivo é encontrar uma sequência de ações que mova o bloco da posição
                            inicial para a posição alvo, respeitando as condições e efeitos definidos.
                        </p>
                    </article>
                    <article id="blocks" className={styles.section}>
                        <h2>Problema "Blocks" com Pyperplan</h2>
                        <p>
                            O problema "blocks" (ou mundo dos blocos) envolve a tarefa de empilhar blocos em uma configuração específica. Cada bloco pode estar na mesa, sobre outro bloco,
                            ou ser segurado por um robô. O objetivo é reordenar os blocos para alcançar uma configuração desejada. Utilizando o pacote `pyperplan`, podemos modelar
                            essa tarefa em PDDL e executar um planejamento para encontrar a solução.
                        </p>
                        <h3 id="blocks-modelo">Modelo em PDDL</h3>
                        <code className={styles.codeBlock}>
                            {`
/*
 Domain PDDL para o problema blocks
*/
(define (domain blocks)
  (:predicates 
    (on ?x ?y) ; Bloco x está sobre o bloco y
    (ontable ?x) ; Bloco x está na mesa
    (clear ?x) ; O topo do bloco x está livre
    (holding ?x) ; O robô está segurando o bloco x
  )

  (:action pick-up
    :parameters (?x) ; Pegar o bloco x
    :precondition (and (clear ?x) (ontable ?x)) ; Condições: x está claro e na mesa
    :effect (and (holding ?x) (not (ontable ?x)) (not (clear ?x))) ; Efeitos: segurando x, x não está mais na mesa, x não está mais claro
  )

  (:action put-down
    :parameters (?x) ; Colocar o bloco x na mesa
    :precondition (holding ?x) ; Condição: segurando x
    :effect (and (ontable ?x) (clear ?x) (not (holding ?x))) ; Efeitos: x na mesa, x claro, não mais segurando x
  )

  (:action stack
    :parameters (?x ?y) ; Empilhar x em y
    :precondition (and (holding ?x) (clear ?y)) ; Condições: segurando x, y claro
    :effect (and (on ?x ?y) (clear ?x) (not (holding ?x)) (not (clear ?y))) ; Efeitos: x sobre y, x claro, não mais segurando x, y não mais claro
  )

  (:action unstack
    :parameters (?x ?y) ; Desempilhar x de y
    :precondition (and (on ?x ?y) (clear ?x)) ; Condições: x sobre y, x claro
    :effect (and (holding ?x) (clear ?y) (not (on ?x ?y)) (not (clear ?x))) ; Efeitos: segurando x, y claro, x não mais sobre y, x não mais claro
  )
)
                        `}
                        </code>
                        <h3 id="blocks-problema">Problema em PDDL</h3>
                        <code className={styles.codeBlock}>
                            {`
/*
 Problema PDDL para o problema blocks
*/
(define (problem blocksworld)
  (:domain blocks) ; Referencia ao domínio
  (:objects A B C) ; Definição dos objetos: blocos A, B, C
  (:init 
    (ontable A) ; A está na mesa
    (ontable B) ; B está na mesa
    (on C A) ; C está sobre A
    (clear B) ; B está claro
    (clear C) ; C está claro
  )
  (:goal 
    (and 
      (on A B) ; A deve estar sobre B
      (on B C) ; B deve estar sobre C
    )
  )
)
                        `}
                        </code>
                        <h3 id="blocks-execucao">Executando com Pyperplan</h3>
                        <p>
                            Para resolver o problema "blocks" usando `pyperplan`, primeiro precisamos instalar o pacote e depois executar os arquivos PDDL:
                        </p>
                        <code className={styles.codeBlock}>
                            {`
# Instalar o Pyperplan
pip install pyperplan

# Executar o Pyperplan com os arquivos de domínio e problema
pyperplan blocksworld-domain.pddl blocksworld-problem.pddl
                        `}
                        </code>
                        <p>
                            O comando acima utiliza o domínio e o problema descritos em PDDL para encontrar um plano que leva da configuração inicial dos blocos para a configuração desejada.
                        </p>
                    </article>
                    <article id="logistics" className={styles.section}>
                        <h2>Problema "Logistics" com Pyperplan</h2>
                        <p>
                            O problema "logistics" envolve o transporte de pacotes entre locais usando diferentes modos de transporte, como caminhões e aviões.
                            A tarefa é planejar as rotas e as ações de carga e descarga dos pacotes. Utilizando `pyperplan`, podemos modelar este problema
                            em PDDL e gerar planos para a entrega dos pacotes.
                        </p>
                        <h3 id="logistics-modelo">Modelo em PDDL</h3>
                        <code className={styles.codeBlock}>
                            {`
/*
 Domain PDDL para o problema logistics
*/
(define (domain logistics)
  (:predicates 
    (at ?obj ?loc) ; Objeto obj está no local loc
    (in ?pkg ?veh) ; Pacote pkg está no veículo veh
    (empty ?veh) ; O veículo veh está vazio
  )

  (:action load
    :parameters (?pkg ?veh ?loc) ; Carregar o pacote pkg no veículo veh no local loc
    :precondition (and (at ?pkg ?loc) (at ?veh ?loc) (empty ?veh)) ; Condições: pkg e veh no loc, veh vazio
    :effect (and (in ?pkg ?veh) (not (at ?pkg ?loc)) (not (empty ?veh))) ; Efeitos: pkg no veh, pkg não mais em loc, veh não mais vazio
  )

  (:action unload
    :parameters (?pkg ?veh ?loc) ; Descarregar o pacote pkg do veículo veh no local loc
    :precondition (and (in ?pkg ?veh) (at ?veh ?loc)) ; Condições: pkg no veh, veh em loc
    :effect (and (at ?pkg ?loc) (empty ?veh) (not (in ?pkg ?veh))) ; Efeitos: pkg em loc, veh vazio, pkg não mais no veh
  )

  (:action drive
    :parameters (?veh ?loc1 ?loc2) ; Dirigir o veículo veh de loc1 para loc2
    :precondition (at ?veh ?loc1) ; Condição: veh em loc1
    :effect (and (at ?veh ?loc2) (not (at ?veh ?loc1))) ; Efeitos: veh em loc2, veh não mais em loc1
  )

  (:action fly
    :parameters (?plane ?loc1 ?loc2) ; Voar com o avião plane de loc1 para loc2
    :precondition (at ?plane ?loc1) ; Condição: plane em loc1
    :effect (and (at ?plane ?loc2) (not (at ?plane ?loc1))) ; Efeitos: plane em loc2, plane não mais em loc1
  )
)
                        `}
                        </code>
                        <h3 id="logistics-problema">Problema em PDDL</h3>
                        <code className={styles.codeBlock}>
                            {`
/*
 Problema PDDL para o problema logistics
*/
(define (problem logistics-problem)
  (:domain logistics) ; Referencia ao domínio
  (:objects 
    truck plane - vehicle ; Veículos: caminhão e avião
    package1 package2 - package ; Pacotes: package1 e package2
    loc1 loc2 loc3 loc4 - location ; Locais: loc1, loc2, loc3, loc4
  )
  (:init 
    (at truck loc1) ; Caminhão no loc1
    (at plane loc3) ; Avião no loc3
    (at package1 loc1) ; Pacote 1 no loc1
    (at package2 loc2) ; Pacote 2 no loc2
    (empty truck) ; Caminhão vazio
    (empty plane) ; Avião vazio
  )
  (:goal 
    (and 
      (at package1 loc4) ; Pacote 1 deve estar no loc4
      (at package2 loc3) ; Pacote 2 deve estar no loc3
    )
  )
)
                        `}
                        </code>
                        <h3 id="logistics-execucao">Executando com Pyperplan</h3>
                        <p>
                            Para resolver o problema "logistics" usando `pyperplan`, execute o seguinte comando após a instalação do pacote:
                        </p>
                        <code className={styles.codeBlock}>
                            {`
# Instalar o Pyperplan
pip install pyperplan

# Executar o Pyperplan com os arquivos de domínio e problema
pyperplan logistics-domain.pddl logistics-problem.pddl
                        `}
                        </code>
                        <p>
                            Este comando processa os arquivos PDDL fornecidos e gera um plano para a entrega dos pacotes, considerando a movimentação dos veículos
                            e as ações de carga e descarga necessárias para alcançar o objetivo final.
                        </p>
                    </article>
                    <article id="referencia" className={styles.section}>
                        <h2>Referências</h2>
                        <p>
                            Todas as informações foram retiradas e baseadas no artigo de Avrim Blum e Merrick Furst. Para mais detalhes, consulte o artigo completo em <a href="https://www.cs.cmu.edu/~avrim/Papers/graphplan.pdf" target="_blank" rel="noopener noreferrer">Graphplan</a>.
                        </p>
                    </article>
                </section>
            </div>
        </div>
    );
}

export default IC;
