import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../ThemeContext';
import styles from './Transacoes.module.css';

function ListaTransacoes() {
    const { transacoes } = useContext(DataContext);
    const { isDarkMode } = useTheme();
    const themeClass = isDarkMode ? styles.dark : styles.light;

    return (
        <div className={`${styles.listaTransacoes} ${themeClass}`}>
            <h3>Lista de Transações</h3>
            {transacoes.length === 0 ? (
                <p>Nenhuma transação cadastrada.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.pessoa}>Id Pessoa</th>

                            <th className={styles.descricao}>Descrição</th>
                            <th className={styles.tipo}>Tipo</th>
                            <th className={styles.valorTitulo}>Valor</th>

                        </tr>
                    </thead>
                    <tbody>
                        {transacoes.map(t => (
                            <tr key={t.id}>
                                <td className={styles.pessoa}>{t.pessoa}</td>

                                <td className={styles.descricao}>{t.descricao}</td>
                                <td className={styles.tipo}>{t.tipo}</td>
                                <td className={styles.valor}>{t.valor.toFixed(2)}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListaTransacoes;
