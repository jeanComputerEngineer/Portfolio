import React, { useState } from 'react';
import CadastroTransacao from './CadastroTransacao';
import ListaTransacoes from './ListaTransacoes';
import { useTheme } from '../../../../ThemeContext';
import styles from './Transacoes.module.css';

function Transacoes() {
    const [showModal, setShowModal] = useState(false);
    const { isDarkMode } = useTheme();
    const themeClass = isDarkMode ? styles.dark : styles.light;

    const abrirModalCadastro = () => {
        setShowModal(true);
    };

    const fecharModal = () => {
        setShowModal(false);
    };

    return (
        <div className={`${styles.transacoesContainer} ${themeClass}`}>
            <div className={styles.header}>
                <h2>Transações</h2>
                <button className={styles.btnAdicionar} onClick={abrirModalCadastro}>
                    Adicionar Transação
                </button>
            </div>
            <ListaTransacoes />
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <span className={styles.closeButton} onClick={fecharModal}>
                            &times;
                        </span>
                        <CadastroTransacao onTransacaoCadastrada={fecharModal} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transacoes;
