/*
- Junta os componentes de cadastro(CadastroPessoa) e listagem(ListaPessoas) de pessoas
- Controla quando mostrar o modal para cadastrar ou editar uma pessoa
- Tem um botão para adicionar nova pessoa e, ao editar, passa os dados para o formulário
- O modal é aberto ou fechado conforme o estado, permitindo o cadastro ou a edição
*/

import React, { useState, useContext } from 'react';
import CadastroPessoa from './CadastroPessoa';
import ListaPessoas from './ListaPessoas';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../ThemeContext';
import styles from './Pessoas.module.css';

function Pessoas() {
    const [showModal, setShowModal] = useState(false);
    const [pessoaParaEditar, setPessoaParaEditar] = useState(null);
    const { pessoas } = useContext(DataContext);
    const { isDarkMode } = useTheme();
    const themeClass = isDarkMode ? styles.dark : styles.light;

    const abrirModalCadastro = () => {
        setPessoaParaEditar(null);
        setShowModal(true);
    };

    const fecharModal = () => {
        setShowModal(false);
    };

    const onPessoaAlterada = (pessoaEditada) => {
        setPessoaParaEditar(pessoaEditada || null);
        setShowModal(true);
    };

    return (
        <div className={`${styles.pessoasContainer} ${themeClass}`}>
            <div className={styles.header}>
                <h2>Pessoas</h2>
                <button className={styles.btnAdicionar} onClick={abrirModalCadastro}>
                    Adicionar Pessoa
                </button>
            </div>
            <ListaPessoas onPessoaEditar={onPessoaAlterada} />
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <span className={styles.closeButton} onClick={fecharModal}>
                            &times;
                        </span>
                        <CadastroPessoa
                            pessoaEditar={pessoaParaEditar}
                            onPessoaCadastrada={fecharModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pessoas;
