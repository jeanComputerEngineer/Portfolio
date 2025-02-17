/* 
- Usado para cadastrar uma nova transação
- Possui campos para descrição, valor, tipo (receita ou despesa) e pessoa
- Faz validações simples: verifica se todos os campos foram preenchidos, se a descrição tem no máximo 100 caracteres, se o valor é numérico e positivo, se a pessoa existe e se menores de 18 só podem registrar despesas
- Após validar, cria uma transação e chama addTransacao (do DataContext) para salvar
- Reseta os campos e chama onTransacaoCadastrada (se houver) para fechar o modal
*/


import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../ThemeContext';
import styles from './Transacoes.module.css';

function CadastroTransacao({ onTransacaoCadastrada }) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('receita');
    const [pessoa, setPessoa] = useState('');
    const [pessoasList, setPessoasList] = useState([]);

    const { pessoas, addTransacao } = useContext(DataContext);
    const { isDarkMode } = useTheme();
    const themeClass = isDarkMode ? styles.dark : styles.light;

    useEffect(() => {
        setPessoasList(pessoas);
    }, [pessoas]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!descricao.trim() || !valor || !tipo || !pessoa) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (descricao.length > 100) {
            alert('A descrição deve ter no máximo 100 caracteres.');
            return;
        }

        const valorNum = parseFloat(valor);
        if (isNaN(valorNum) || valorNum < 0) {
            alert('Por favor, informe um valor numérico positivo.');
            return;
        }

        const pessoaEncontrada = pessoasList.find(p => p.id === parseInt(pessoa, 10));
        if (!pessoaEncontrada) {
            alert('Pessoa não encontrada!');
            return;
        }

        if (pessoaEncontrada.idade < 18 && tipo !== 'despesa') {
            alert('Menores de 18 anos só podem registrar despesas.');
            return;
        }

        const novaTransacao = {
            id: Date.now(),
            descricao: descricao.trim(),
            valor: valorNum,
            tipo,
            pessoa: pessoaEncontrada.id,
        };

        addTransacao(novaTransacao);
        setDescricao('');
        setValor('');
        setTipo('receita');
        setPessoa('');
        if (onTransacaoCadastrada) onTransacaoCadastrada();
    };

    return (
        <div className={`${styles.cadastroTransacao} ${themeClass}`}>
            <h3>Cadastrar Transação</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                        maxLength={100}
                        placeholder="Digite a descrição (máx 100 caracteres)"
                    />
                </div>
                <div className={styles.sameRow}>
                    <div className={styles.formGroup}>
                        <label>Valor:</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            required
                            placeholder="Informe um valor positivo"
                        />
                    </div>
                    <div className={styles.formGroupTipo}>
                        <label>Tipo:</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option value="receita">Receita</option>
                            <option value="despesa">Despesa</option>
                        </select>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label>Pessoa:</label>
                    <select
                        value={pessoa}
                        onChange={(e) => setPessoa(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma pessoa</option>
                        {pessoasList.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.nome} (ID: {p.id})
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className={styles.btnSalvar}>Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastroTransacao;
