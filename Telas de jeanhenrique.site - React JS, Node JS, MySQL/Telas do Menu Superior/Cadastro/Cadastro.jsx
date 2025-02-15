import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cadastro.module.css';
import { useTheme } from '../../ThemeContext';
import axios from 'axios';
import ComoFunciona from '../../repositorioImagens/Como Funciona o Processo.png';
import ComoFuncionaDark from '../../repositorioImagens/Como Funciona o Processo Escuro.png';


function Cadastro() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nomeCompletoProspecto: '',
        emailProspecto: '',
        telefoneProspecto: '',
        tipoServico: '', // Novo campo 'tipoServico'
    });

    const config = {
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        }
    };




    const [showModal, setShowModal] = useState(false);
    const [confirmation, setConfirmation] = useState(null);
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const key in formData) {
            if (formData[key] === '') {
                return alert(`Nenhum Campo Pode Estar Vazio!`);
            }
        }

        if (formData.nomeCompletoProspecto.length > 50) {
            return alert('O nome deve ter no máximo 50 caracteres!');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.emailProspecto)) {
            return alert('Por favor, insira um email válido!');
        }

        const telefoneRegex = /^[0-9]+$/;
        if (!telefoneRegex.test(formData.telefoneProspecto)) {
            return alert('O telefone não pode conter letras!');
        }

        openConfirmation();
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openConfirmation = () => {
        setConfirmation(true);
    };

    const closeConfirmation = () => {
        setConfirmation(false);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://app.jeanhenrique.site/cadastro', formData, config);

            setFormData({
                nomeCompletoProspecto: '',
                emailProspecto: '',
                telefoneProspecto: '',
                tipoServico: '',
            });

            alert('Enviado com Sucesso! Em breve entrarei em contato!');
            navigate('/');
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert('Ocorreu um erro ao enviar os dados. Por favor, tente novamente.');
        }
    };

    return (
        <div className={theme}>
            <div className={styles.container}>
                <div className={styles.cadContainer}>
                    <h1>Solicitar Orçamento</h1>
                    <form onSubmit={handleSubmit}>
                        <h2>Nome Completo:</h2>
                        <input
                            type="text"
                            id="nomeCompletoProspecto"
                            name="nomeCompletoProspecto"
                            value={formData.nomeCompletoProspecto}
                            onChange={handleChange}
                            placeholder="Digite seu nome"
                            required
                        />

                        <h2 htmlFor="email">Email:</h2>
                        <input
                            type="email"
                            id="emailProspecto"
                            name="emailProspecto"
                            value={formData.emailProspecto}
                            onChange={handleChange}
                            placeholder="Digite seu email"
                            required
                        />

                        <h2 htmlFor="telefone">Telefone:</h2>
                        <input
                            type="tel"
                            id="telefoneProspecto"
                            name="telefoneProspecto"
                            value={formData.telefoneProspecto}
                            onChange={handleChange}
                            placeholder="Digite seu telefone"
                            required
                        />
                        <h2>Tipo de Serviço:</h2>
                        <select
                            id="tipoServico"
                            name="tipoServico"
                            value={formData.tipoServico}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Selecione o tipo de serviço</option>
                            <option value="criacaoSite">Criação de Site</option>
                            <option value="desenvolvimentoApp">Desenvolvimento de Aplicativo Móvel</option>
                            <option value="desenvolvimentoDesktop">Desenvolvimento de Aplicação Desktop</option>
                            <option value="assistenciaTecnica">Assistência Técnica para Computadores</option>
                            <option value="edicaoImagens">Edição de Imagens</option>
                            <option value="criacaoAnimacoes">Criação de Vídeos</option>
                            <option value="desenvolvimentoJogos">Desenvolvimento de Jogos</option>
                            <option value="contratar">Proposta de Emprego Fixo CLT/PJ</option>
                        </select>


                        <p>
                            Ao solicitar orçamento, você declara que está de acordo com a{' '}
                            <button
                                className={styles.botaoTermos}
                                onClick={(e) => { e.preventDefault(); openModal(); }}
                            >
                                Política de Privacidade e os Termos de Uso.
                            </button>
                        </p>
                        {showModal && (
                            <div className={styles.modal}>
                                <div className={styles.modalContent}>
                                    <button className={styles.close} onClick={closeModal}>&times;</button>
                                    <div className={styles.containerExtra}>
                                        <h2>Termos de Uso</h2>
                                        <p>
                                            Bem-vindo ao site de Jean Samuel Candido Henrique.
                                        </p>
                                        <p>
                                            Ao acessar nosso site e utilizar nossos serviços, você concorda com estes termos de uso. Se você não concorda com algum destes termos, por favor, não continue usando nosso site.
                                        </p>
                                        <p>
                                            <strong>Informações Pessoais:</strong> Ao utilizar nosso site e fornecer informações pessoais como nome completo, número de telefone e email para solicitar orçamentos, você concorda com nossa política de privacidade.
                                        </p>
                                        <p>
                                            <strong>Uso Responsável:</strong> Você concorda em utilizar nosso site de forma responsável e de acordo com todas as leis e regulamentos aplicáveis.
                                        </p>
                                        <p>
                                            <strong>Propriedade Intelectual:</strong> O conteúdo em nosso site, incluindo códigos de desenvolvimento, texto, logotipos, designs, é de propriedade exclusiva de Jean Samuel Candido Henrique.
                                        </p>
                                        <p>
                                            <strong>Links para Terceiros:</strong> Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelo conteúdo ou práticas de privacidade desses sites.
                                        </p>
                                        <p>
                                            <strong>Alterações nos Termos:</strong> Reservamo-nos o direito de fazer alterações nestes termos de uso a qualquer momento, sem aviso prévio. É sua responsabilidade revisar periodicamente estes termos para se manter informado sobre quaisquer mudanças.
                                        </p>
                                        <p>
                                            <strong>Contato:</strong> Se você tiver alguma dúvida ou preocupação sobre estes termos de uso, entre em contato conosco.
                                        </p>

                                        <h2>Política de Privacidade</h2>
                                        <p>
                                            A sua privacidade é importante para nós. Esta política de privacidade descreve como coletamos, usamos e protegemos as informações pessoais que você fornece ao utilizar nosso site.
                                        </p>
                                        <p>
                                            <strong>Informações Coletadas:</strong> Podemos coletar informações pessoais, como nome completo, número de telefone e email, quando você preenche um formulário de contato ou agendamento de consulta em nosso site.
                                        </p>
                                        <p>
                                            <strong>Uso das Informações:</strong> Utilizamos as informações que coletamos para agendar consultas, discutir sobre os valores dos serviços prestados, responder às suas perguntas e fornecer informações adicionais sobre nossos serviços. Não compartilharemos suas informações pessoais com terceiros sem o seu consentimento, exceto quando necessário para fornecer os serviços solicitados por você.
                                        </p>
                                        <p>
                                            <strong>Segurança:</strong> Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                                        </p>

                                        <p>
                                            <strong>Alterações na Política de Privacidade:</strong> Reservamo-nos o direito de fazer alterações nesta política de privacidade a qualquer momento, publicando uma versão atualizada em nosso site. Recomendamos que você revise esta política periodicamente para estar ciente de quaisquer alterações.
                                        </p>
                                        <p>
                                            <strong>Exclusões:</strong> Se você quiser excluir as informações fornecidas neste formulário, por favor, entre em contato conosco nas formas de contato fornecidas em nosso site.
                                        </p>
                                        <p>
                                            <strong>Contato:</strong> Se você tiver alguma dúvida ou preocupação sobre nossa política de privacidade, entre em contato conosco.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        )}
                        <button className={styles.botao} type="submit">Agendar</button>
                        {confirmation && (<div className={styles.modalOverlay}>
                            <div className={styles.modalConfirmation}>
                                <div className={styles.modalHeader}>
                                    <br />
                                    <button className={styles.modalClose} onClick={closeConfirmation}>X</button>
                                </div>
                                <div className={styles.modalBody}>
                                    <p>Tem certeza de que os dados inseridos estão corretos?</p>
                                </div>
                                <div className={styles.modalFooter}>
                                    <button onClick={closeConfirmation} className={styles.modalCancel}>Cancelar</button>
                                    <button type='submit' onClick={submitForm} className={styles.modalConfirm}>Confirmar</button>
                                </div>
                            </div>
                        </div>)}
                    </form>
                </div>
                <div className={styles.ImagemLado}>
                    {isDarkMode ? <img src={ComoFuncionaDark} alt="ImagemLado" /> : <img src={ComoFunciona} alt="ImagemLado" />}
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
