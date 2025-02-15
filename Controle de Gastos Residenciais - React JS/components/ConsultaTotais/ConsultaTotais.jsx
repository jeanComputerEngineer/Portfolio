import React, { useContext } from 'react';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../ThemeContext';
import styles from './ConsultaTotais.module.css';

function ConsultaTotais() {
    const { pessoas, transacoes } = useContext(DataContext);
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;

    const calcularTotais = (pessoaId) => {
        const trans = transacoes.filter(t => t.pessoa === pessoaId);
        const totalReceitas = trans
            .filter(t => t.tipo === 'receita')
            .reduce((acc, t) => acc + t.valor, 0);
        const totalDespesas = trans
            .filter(t => t.tipo === 'despesa')
            .reduce((acc, t) => acc + t.valor, 0);
        return { totalReceitas, totalDespesas, saldo: totalReceitas - totalDespesas };
    };

    const totaisGerais = pessoas.reduce((acc, p) => {
        const { totalReceitas, totalDespesas, saldo } = calcularTotais(p.id);
        return {
            totalReceitas: acc.totalReceitas + totalReceitas,
            totalDespesas: acc.totalDespesas + totalDespesas,
            saldo: acc.saldo + saldo,
        };
    }, { totalReceitas: 0, totalDespesas: 0, saldo: 0 });

    return (
        <div className={theme}>

            <div className={styles.Container}>
                <div className={styles.header}>
                    <h2>Consulta de Totais</h2>
                </div>
                <div className={styles.ConsultaTotais}>

                    <h3>Totais por Pessoa</h3>
                    {pessoas.length === 0 ? (
                        <p>Nenhuma pessoa cadastrada.</p>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.pessoa}>Nome</th>
                                    <th className={styles.valor}>Total Receitas</th>
                                    <th className={styles.valor}>Total Despesas</th>
                                    <th className={styles.valor}>Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pessoas.map(p => {
                                    const { totalReceitas, totalDespesas, saldo } = calcularTotais(p.id);
                                    return (
                                        <tr key={p.id}>
                                            <td className={styles.pessoa}>{p.nome}</td>
                                            <td className={styles.valor}>{totalReceitas.toFixed(2)}</td>
                                            <td className={styles.valor}>{totalDespesas.toFixed(2)}</td>
                                            <td className={styles.valor}>{saldo.toFixed(2)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    <h3>Totais Gerais</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.valor}>Total Receitas</th>
                                <th className={styles.valor}> Total Despesas</th>
                                <th className={styles.valor}> Saldo Geral</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.valor}>{totaisGerais.totalReceitas.toFixed(2)}</td>
                                <td className={styles.valor}>{totaisGerais.totalDespesas.toFixed(2)}</td>
                                <td className={styles.valor}>{totaisGerais.saldo.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ConsultaTotais;
