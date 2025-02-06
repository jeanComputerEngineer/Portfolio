import React, { useState, useEffect, useCallback } from 'react';
import styles from './Simulador.module.css';
import SimuladorIdadeAnimalLight from "../../repositorioImagens/SimuladorIdadeAnimalLight.png";
import SimuladorIdadeAnimalDark from "../../repositorioImagens/SimuladorIdadeAnimalDark.png";

import { useTheme } from '../../ThemeContext';



export default function IndexSimulador() {
    const [animalSelect, setAnimalSelect] = useState('selecione o animal');
    const [idadeTotal, setIdadeTotal] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;
    const pets = isDarkMode ? SimuladorIdadeAnimalDark : SimuladorIdadeAnimalLight;


    const voltarAoConteudoAntigo = useCallback(() => {
        const ResetSelect = () => {
            setAnimalSelect("selecione o animal");
        }

        const ResetIdade = () => {
            setIdadeTotal(0);
        }

        setMostrarResultado(false);
        ResetSelect();
        ResetIdade();
    }, [setMostrarResultado]);

    const showResult = useCallback((resultado) => {
        if (resultado === 0 || !mostrarResultado) {
            return <div></div>;
        } else {
            return (
                <div className={styles.resultado}>
                    <h1 id='resultadoSection'>A idade do(a) {animalSelect} seria o equivalente a {Math.round(resultado)} anos para os humanos.</h1>
                    <button onClick={voltarAoConteudoAntigo}>Simule Outra Idade</button>
                    <img src={pets} alt="Animaizinhos" className={styles.imagem} />
                </div>
            );
        }
    }, [mostrarResultado, animalSelect, voltarAoConteudoAntigo, pets]);




    useEffect(() => {
        window.scrollTo(0, 0);
        showResult(idadeTotal);
    }, [idadeTotal, mostrarResultado, showResult]);





    function calcularIdade() {
        var anos = parseFloat(document.getElementById('idade').value) || 0;
        var meses = parseFloat(document.getElementById('meses').value) || 0;
        var idadeCalculada = parseFloat(anos + (meses / 12));
        const animalSelectElement = document.querySelector('select#animal');
        const porteSelectElement = document.querySelector('select#porte');


        if (idadeCalculada <= 0 || meses < 0 || anos < 0) {
            return alert('Por favor, forneça numeros positivos.');
        }
        else if (meses > 11) {
            return alert('Por favor, forneça apenas meses dentro de um ano.');
        }

        else if (animalSelectElement.value === "cachorro") {
            switch (porteSelectElement.value) {
                case "selecione o porte":
                    alert("Selecione o Porte do Cão");
                    break;
                case "pequeno":
                    if (idadeCalculada <= 1 && idadeCalculada > 0) {
                        setIdadeTotal(idadeCalculada * 15);
                        setMostrarResultado(true);
                    } else if (idadeCalculada < 2 && idadeCalculada > 1) {
                        setIdadeTotal(idadeCalculada * 12);
                        setMostrarResultado(true);
                    } else if (idadeCalculada >= 2 && idadeCalculada < 20) {
                        setIdadeTotal(16 + (idadeCalculada * 4));
                        setMostrarResultado(true);
                    }
                    else {
                        return alert('Por favor, forneça uma idade dentro da expectativa de vida do(a) ' + animalSelectElement.value + '.');

                    }
                    break;
                case "medio":
                    if (idadeCalculada > 0 && idadeCalculada <= 1) {
                        setIdadeTotal(idadeCalculada * 15);
                        setMostrarResultado(true);
                    } else if (idadeCalculada <= 2 && idadeCalculada > 1) {
                        setIdadeTotal(idadeCalculada * 12);
                        setMostrarResultado(true);
                    } else if (idadeCalculada <= 5 && idadeCalculada > 2) {
                        setIdadeTotal(16 + (idadeCalculada * 4));
                    } else if (idadeCalculada <= 6 && idadeCalculada > 5) {
                        setIdadeTotal(16 + (idadeCalculada * 3.4));
                        setMostrarResultado(true);
                    } else if (idadeCalculada > 6 && idadeCalculada % 2 !== 0 && idadeCalculada < 20) {
                        let cont = 0;
                        for (let i = 9; i <= idadeCalculada; i += 2) {
                            cont += 1;
                        }
                        setIdadeTotal(19 + (idadeCalculada * 4) + cont);
                        setMostrarResultado(true);
                    } else if (idadeCalculada > 6 && idadeCalculada % 2 === 0 && idadeCalculada < 20) {
                        let cont = 0;
                        for (let i = 10; i <= idadeCalculada; i += 2) {
                            cont += 1;
                        }
                        setIdadeTotal(19 + (idadeCalculada * 4) + cont);
                        setMostrarResultado(true);
                    }
                    else {
                        return alert('Por favor, forneça uma idade dentro da expectativa de vida do(a) ' + animalSelectElement.value + '.');
                    }
                    break;
                case "grande":
                    if (idadeCalculada <= 1 && idadeCalculada > 0) {
                        setIdadeTotal(idadeCalculada * 15);
                        setMostrarResultado(true);
                    } else if (idadeCalculada <= 2) {
                        setIdadeTotal(idadeCalculada * 12);
                        setMostrarResultado(true);
                    } else if (idadeCalculada <= 5) {
                        setIdadeTotal(16 + (idadeCalculada * 4));
                        setMostrarResultado(true);
                    }
                    else if (idadeCalculada <= 6) {
                        setIdadeTotal(21 + (idadeCalculada * 4));
                    }
                    else if (idadeCalculada <= 8) {
                        setIdadeTotal(15 + (idadeCalculada * 5));
                        setMostrarResultado(true);
                    }

                    else if (idadeCalculada > 8 && idadeCalculada < 18) {
                        setIdadeTotal(11.5 + (idadeCalculada * 5.5));
                        setMostrarResultado(true);
                    }
                    else {
                        return alert('Por favor, forneça uma idade dentro da expectativa de vida do(a) ' + animalSelectElement.value + '.');
                    }
                    break;


                default:
                    break;
            }
        }


        else {


            const tabelaEquivalencia = {
                'gato': [15, 24, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80,
                    84, 88, 92, 96, 100, 104, 108, 112, 116],
                'cavalo': [6.5, 13, 18, 20.5, 23, 25.5, 28, 30.5, 33, 35.5, 38, 40.5, 43, 45.5, 48,
                    50.5, 53, 55.5, 58, 60.5, 63, 65.5, 68, 70.5, 73, 75.5, 78, 80.5, 83, 85.5, 88,
                    90.5, 93, 95.5, 98, 100.5, 103, 105.5, 108, 110.5, 113, 115.5],
                'calopsita': [4, 7, 11, 15, 18, 22, 25, 29, 33, 36, 40, 43, 47, 50, 54,
                    57, 61, 64, 68, 71, 75, 78, 82, 85, 89, 92, 96, 99, 103, 106, 110, 113, 117,],
                'papagaio': [2, 3, 5, 6, 8, 9, 11, 13, 14, 16, 17, 19, 20, 22, 23, 25, 26, 28, 29,
                    31, 32, 34, 35, 37, 38, 40, 41, 43, 44, 46, 47, 49, 50, 52, 53, 55, 56, 58, 59, 61, 62,
                    64, 65, 67, 68, 70, 71, 73, 74, 76, 77, 79, 80, 82, 83, 85, 86, 88, 89, 91, 92, 94, 95,
                    97, 98, 100, 101, 103, 104, 106, 107, 109, 110, 112, 113, 115, 116, 118, 119, 121, 122,
                ], 'hamster': [41, 63.5, 80, 105],
                'coelho': [21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99, 105],
                'porquinho-da-india': [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
                'tartaruga': [],
                'tigre': [], 'porco': [], 'boi': [], 'galinha': [],

            };

            const expectativaVidaHumana = 110;

            // Preenche a tabela para a tartaruga
            const expectativaVidaTartaruga = 150;
            const partesTartaruga = expectativaVidaHumana / expectativaVidaTartaruga;
            const tabelaTartaruga = Array.from({ length: expectativaVidaTartaruga + 1 }, (_, i) => Math.ceil((i + 1) * partesTartaruga));
            if (idadeCalculada > 0 && idadeCalculada <= expectativaVidaTartaruga) {
                tabelaEquivalencia['tartaruga'] = tabelaTartaruga;

            }

            // Preenche a tabela para o tigre
            const expectativaVidaTigre = 20;
            const partesTigre = expectativaVidaHumana / expectativaVidaTigre;
            const tabelaTigre = Array.from({ length: expectativaVidaTigre + 1 }, (_, i) => Math.ceil((i + 1) * partesTigre));
            if (idadeCalculada > 0 && idadeCalculada <= expectativaVidaTigre) {
                tabelaEquivalencia['tigre'] = tabelaTigre;

            }

            // Preenche a tabela para o porco
            const expectativaVidaPorco = 20;
            const partesPorco = expectativaVidaHumana / expectativaVidaPorco;
            const tabelaPorco = Array.from({ length: expectativaVidaPorco + 1 }, (_, i) => Math.ceil((i + 1) * partesPorco));
            if (idadeCalculada > 0 && idadeCalculada <= expectativaVidaPorco) {
                tabelaEquivalencia['porco'] = tabelaPorco;

            }

            // Preenche a tabela para o boi
            const expectativaVidaBoi = 20;
            const partesBoi = expectativaVidaHumana / expectativaVidaBoi;
            const tabelaBoi = Array.from({ length: expectativaVidaBoi + 1 }, (_, i) => Math.ceil((i + 1) * partesBoi));
            if (idadeCalculada > 0 && idadeCalculada <= expectativaVidaBoi) {
                tabelaEquivalencia['boi'] = tabelaBoi;

            }

            // Preenche a tabela para a galinha
            const expectativaVidaGalinha = 10;
            const partesGalinha = expectativaVidaHumana / expectativaVidaGalinha;
            const tabelaGalinha = Array.from({ length: expectativaVidaGalinha + 1 }, (_, i) => Math.ceil((i + 1) * partesGalinha));
            if (idadeCalculada > 0 && idadeCalculada <= expectativaVidaGalinha) {
                tabelaEquivalencia['galinha'] = tabelaGalinha;

            }



            const tabela = tabelaEquivalencia[animalSelectElement.value];
            const idadeInteira = Math.floor(idadeCalculada);
            const idadeDecimal = idadeCalculada - idadeInteira;



            if (idadeInteira < tabela.length && idadeCalculada >= 1) {
                const idadeEquivalente = tabela[idadeInteira - 1] + ((tabela[idadeInteira] - tabela[idadeInteira - 1]) * idadeDecimal);
                setIdadeTotal(idadeEquivalente);
                setMostrarResultado(true);
            } else if (idadeCalculada === tabela.length) {
                const indexFinal = idadeCalculada - 1;
                setIdadeTotal(tabela[indexFinal])
                setMostrarResultado(true);

            }
            else if (idadeCalculada < 1 && idadeCalculada > 0) {
                setIdadeTotal(tabela[0] * idadeCalculada)
                setMostrarResultado(true);
            }
            else {
                return alert('Por favor, forneça uma idade dentro da expectativa de vida do(a) ' + animalSelectElement.value + '.');
            }









        }



    }



    function showButtons(animalSelect) {
        if (animalSelect === "selecione o animal") {
            return (
                <div></div>
            );
        }
        if (animalSelect === "cachorro") {
            return (
                <div className={styles.botoes}>


                    <label>Selecione o Porte do Cão</label>
                    <select id="porte" >
                        <option value="selecione o porte">Selecione o Porte do Cão</option>
                        <option value="pequeno">Pequeno</option>
                        <option value="medio">Medio</option>
                        <option value="grande">Grande</option>
                    </select>



                    <label htmlFor="idade">Quantos anos?</label>
                    <input type="number" id="idade" placeholder="Digite os anos" />

                    <label htmlFor="meses">Quantos meses?</label>
                    <input type="number" id="meses" placeholder="Digite os meses" />

                    <button onClick={calcularIdade}>Calcular</button>

                </div>

            );
        }
        else {
            return (
                <div className={styles.botoes}>
                    <label htmlFor="idade">Quantos anos?</label>
                    <input type="number" id="idade" placeholder="Digite os anos" />

                    <label htmlFor="meses">Quantos meses?</label>
                    <input type="number" id="meses" placeholder="Digite os meses" />

                    <button onClick={calcularIdade}>Calcular</button>
                </div>
            )
        }

    }



    return (
        <div className={theme}>
            <div className={styles.container}>

                {!mostrarResultado && (
                    <>

                        <h1>Simulador de Idade Animal</h1>
                        <h2>Todas as idades são calculadas por meio de variáveis dos estudos mais recentes sobre isso</h2>
                        <h3>São apenas previsões de aproximações de idade, não se esqueça disso!</h3>
                        <select
                            id="animal"
                            onChange={(e) => setAnimalSelect(e.target.value)}
                            className={styles.animal}
                        >
                            <option value="selecione o animal">Clique Aqui Para Selecionar o Animal</option>
                            <option value="cachorro">Cachorro</option>
                            <option value="gato">Gato</option>
                            <option value="cavalo">Cavalo</option>
                            <option value="calopsita">Calopsita</option>
                            <option value="papagaio">Papagaio</option>
                            <option value="hamster">Hamster</option>
                            <option value="coelho">Coelho</option>
                            <option value="porquinho-da-india">Porquinho-Da-Índia</option>
                            <option value="tartaruga">Tartaruga</option>
                            <option value="tigre">Tigre</option>
                            <option value="porco">Porco</option>
                            <option value="boi">Boi</option>
                            <option value="galinha">Galinha</option>
                        </select>

                        {showButtons(animalSelect)}
                    </>
                )}


                {/* Renderizar o resultado se mostrarResultado for verdadeiro */}
                {mostrarResultado && showResult(idadeTotal)}

                {/* Renderizar a imagem se animalSelect for 'selecione o animal' */}
                {animalSelect === 'selecione o animal' && (
                    <img src={pets} alt="Animaizinhos" className={styles.imagem} />
                )}





            </div>

        </div>
    )
}



