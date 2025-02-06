import React, { useState, useEffect } from 'react';
import { FaRegStar } from 'react-icons/fa';
import styles from './Avaliacao.module.css';
import { useTheme } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Avaliacao = () => {
    const [avaliacoes, setAvaliacoes] = useState({
        avaliacaoGeral: 0,
        avaliacaoAparencia: 0,
        avaliacaoConteudo: 0,
        avaliacaoUsabilidade: 0,
    });
    const [clientIP, setClientIP] = useState('');

    useEffect(() => {
        const fetchIP = async () => {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            setClientIP(data.ip);
        };
        fetchIP();
    }, []);

    const handleStarClick = (categoria, valor) => {
        setAvaliacoes({
            ...avaliacoes,
            [categoria]: valor,
        });
    };

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (
            avaliacoes.avaliacaoGeral === 0 ||
            avaliacoes.avaliacaoAparencia === 0 ||
            avaliacoes.avaliacaoConteudo === 0 ||
            avaliacoes.avaliacaoUsabilidade === 0
        ) {
            window.alert("Por favor, dê ao menos 1 estrela em cada categoria antes de enviar.");
        } else {
            const response = await fetch('https://app.jeanhenrique.site/avaliacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
                },
                body: JSON.stringify({
                    nome: e.target.name.value,
                    avaliacaoGeral: avaliacoes.avaliacaoGeral,
                    avaliacaoAparencia: avaliacoes.avaliacaoAparencia,
                    avaliacaoConteudo: avaliacoes.avaliacaoConteudo,
                    avaliacaoUsabilidade: avaliacoes.avaliacaoUsabilidade,
                    opinion: e.target.opinion.value,
                    ip: clientIP
                })
            });

            if (response.ok) {
                window.alert("Avaliação Realizada com Sucesso");
                navigate("/");
            } else {
                window.alert("Erro ao enviar avaliação");
            }
        }
    };

    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;

    return (
        <div className={theme}>
            <div className={styles.container}>
                <h1>Formulário de Avaliação do Site</h1>
                <h2>Por favor, explore todo o site antes da avaliação e seja o mais sincero possível</h2>
                <h2>Para explorar o site, você precisa clicar no menu superior</h2>
                <h2>Para retornar para este formulário, vá para aba "Portfolio" e busque por "Avaliação"</h2>
                <h3>Caso não queira se identificar, o campo "nome" é facultativo</h3>
                <form onSubmit={handleFormSubmit} className={styles.form}>

                    <label>Nome</label>
                    <input type="text" name="name" placeholder="Digite o seu nome" />

                    <label>De 1 a 10, o quanto você avalia o site no geral?</label>
                    <div className={styles.starContainer}>
                        {[...Array(10)].map((_, index) => (
                            <FaRegStar
                                key={index}
                                className={index < avaliacoes.avaliacaoGeral ? styles.starSelected : styles.star}
                                onClick={() => handleStarClick('avaliacaoGeral', index + 1)}
                            />
                        ))}
                    </div>

                    <label>De 1 a 10, o quanto você avalia a aparência do site?</label>
                    <div className={styles.starContainer}>
                        {[...Array(10)].map((_, index) => (
                            <FaRegStar
                                key={index}
                                className={index < avaliacoes.avaliacaoAparencia ? styles.starSelected : styles.star}
                                onClick={() => handleStarClick('avaliacaoAparencia', index + 1)}
                            />
                        ))}
                    </div>

                    <label>De 1 a 10, o quanto você avalia o conteúdo do site? Achou divertido e/ou útil?</label>
                    <div className={styles.starContainer}>
                        {[...Array(10)].map((_, index) => (
                            <FaRegStar
                                key={index}
                                className={index < avaliacoes.avaliacaoConteudo ? styles.starSelected : styles.star}
                                onClick={() => handleStarClick('avaliacaoConteudo', index + 1)}
                            />
                        ))}
                    </div>

                    <label>De 1 a 10, o quanto você avalia a usabilidade do site?</label>
                    <div className={styles.starContainer}>
                        {[...Array(10)].map((_, index) => (
                            <FaRegStar
                                key={index}
                                className={index < avaliacoes.avaliacaoUsabilidade ? styles.starSelected : styles.star}
                                onClick={() => handleStarClick('avaliacaoUsabilidade', index + 1)}
                            />
                        ))}
                    </div>

                    <label>Achou algum bug? Alguma crítica ou sugestão? Insira aqui:</label>
                    <textarea name="opinion" placeholder="Digite sua opinião" maxLength={1500} />

                    <button type="submit">
                        Enviar
                    </button>

                </form>
                <h3>Obrigado pelas respostas. Acesse o conteúdo interativo na aba "Portfolio"</h3>
            </div>
        </div>
    );
};

export default Avaliacao;
