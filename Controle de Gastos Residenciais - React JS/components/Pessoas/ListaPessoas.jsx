import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../ThemeContext';
import styles from './Pessoas.module.css';

function ListaPessoas({ onPessoaEditar }) {
    const { pessoas, deletePessoa } = useContext(DataContext);
    const { isDarkMode } = useTheme();
    const themeClass = isDarkMode ? styles.dark : styles.light;

    return (
        <div className={`${styles.listaPessoas} ${themeClass}`}>
            <h3>Lista de Pessoas</h3>
            {pessoas.length === 0 ? (
                <p>Nenhuma pessoa cadastrada.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.id}>ID</th>
                            <th className={styles.nome}>Nome</th>
                            <th className={styles.idade}>Idade</th>
                            <th className={styles.acao}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoas.map(pessoa => (
                            <tr key={pessoa.id}>
                                <td className={styles.id1}>{pessoa.id}</td>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.idade}</td>
                                <td className={styles.acao}>
                                    <button
                                        onClick={() => onPessoaEditar(pessoa)}
                                        className={styles.btnEditar}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deletePessoa(pessoa.id)}
                                        className={styles.btnExcluir}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListaPessoas;
