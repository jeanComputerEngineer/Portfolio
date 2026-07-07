/* 
- Exibe todas as transações cadastradas em uma tabela
- Mostra dados como id da pessoa, descrição, tipo e valor (formatado com vírgula como separador decimal)
- Permite editar ou excluir cada transação
- Ao clicar em editar, abre um modal com os dados da transação, convertendo o valor para string com vírgula
- No update, converte o valor, de vírgula para ponto, para voltar a ser número e então atualiza a transação
- Valores alinhados á direita, com a moeda usada (R$)
*/


import React, { useContext, useState } from 'react';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../ThemeContext';
import styles from './Transacoes.module.css';

function ListaTransacoes() {
    const { transacoes, deleteTransacao, updateTransacao } = useContext(DataContext);
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? styles.dark : styles.light;
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [transacaoToEdit, setTransacaoToEdit] = useState(null);
    const [editDescricao, setEditDescricao] = useState('');
    const [editValor, setEditValor] = useState('');
    const [editTipo, setEditTipo] = useState('');

    const openEditModal = (transacao) => {
        setTransacaoToEdit(transacao);
        setEditDescricao(transacao.descricao);
        setEditValor(transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setEditTipo(transacao.tipo);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setTransacaoToEdit(null);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!editDescricao.trim()) {
            alert("A descrição é obrigatória.");
            return;
        }
        const novoValor = parseFloat(editValor.replace(',', '.'));
        if (isNaN(novoValor) || novoValor < 0) {
            alert("Informe um valor numérico positivo.");
            return;
        }
        const updatedTransacao = {
            ...transacaoToEdit,
            descricao: editDescricao.trim(),
            valor: novoValor,
            tipo: editTipo,
        };
        updateTransacao(updatedTransacao);
        closeEditModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza de que deseja excluir esta transação?")) {
            deleteTransacao(id);
        }
    };

    return (
        <div className={theme}>
            <div className={styles.listaTransacoes}>
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
                                <th className={styles.valorTitulo}>Valor(R$)</th>
                                <th className={styles.acoes}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacoes.map(t => (
                                <tr key={t.id}>
                                    <td className={styles.pessoa}>{t.pessoa}</td>
                                    <td className={styles.descricao}>{t.descricao}</td>
                                    <td className={styles.tipo}>{t.tipo}</td>
                                    <td className={styles.valor}>
                                        {t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className={styles.acoes}>
                                        <button className={styles.btnEditar} onClick={() => openEditModal(t)}>Editar</button>
                                        <button className={styles.btnExcluir} onClick={() => handleDelete(t.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {editModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <span className={styles.closeButton} onClick={closeEditModal}>&times;</span>
                            <h3>Editar Transação</h3>
                            <form onSubmit={handleUpdate}>
                                <div className={styles.formGroup}>
                                    <label>Descrição:</label>
                                    <input
                                        type="text"
                                        value={editDescricao}
                                        onChange={(e) => setEditDescricao(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={styles.sameRow}>
                                    <div className={styles.formGroup}>
                                        <label>Valor:</label>
                                        <input
                                            type="text"
                                            value={editValor}
                                            onChange={(e) => setEditValor(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroupTipo}>
                                        <label>Tipo:</label>
                                        <select value={editTipo} onChange={(e) => setEditTipo(e.target.value)}>
                                            <option value="receita">Receita</option>
                                            <option value="despesa">Despesa</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className={styles.btnSalvar}>Salvar Alterações</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListaTransacoes;
