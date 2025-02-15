import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../DataContext';
import { useTheme } from '../../../../ThemeContext';
import styles from './Pessoas.module.css';

function CadastroPessoa({ pessoaEditar, onPessoaCadastrada }) {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const { addPessoa, updatePessoa } = useContext(DataContext);
    const { isDarkMode } = useTheme();
    const themeClass = isDarkMode ? styles.dark : styles.light;

    useEffect(() => {
        if (pessoaEditar) {
            setNome(pessoaEditar.nome);
            setIdade(pessoaEditar.idade);
        }
    }, [pessoaEditar]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const nomeTrimmed = nome.trim();
        if (!nomeTrimmed) {
            alert('O campo Nome é obrigatório.');
            return;
        }
        if (nomeTrimmed.length < 2) {
            alert('O nome deve ter pelo menos 2 caracteres.');
            return;
        }
        if (nomeTrimmed.length > 50) {
            alert('O nome deve ter no máximo 50 caracteres.');
            return;
        }

        const idadeNum = parseInt(idade, 10);
        if (isNaN(idadeNum)) {
            alert('Por favor, informe um valor numérico válido para a idade.');
            return;
        }
        if (idadeNum <= -1) {
            alert('A idade deve ser um número igual ou maior que zero.');
            return;
        }
        if (idadeNum > 120) {
            alert('Por favor, informe uma idade válida (120 ou menos).');
            return;
        }

        if (pessoaEditar) {
            updatePessoa({ id: pessoaEditar.id, nome: nomeTrimmed, idade: idadeNum });
        } else {
            addPessoa({ nome: nomeTrimmed, idade: idadeNum });
        }

        setNome('');
        setIdade('');
        if (onPessoaCadastrada) onPessoaCadastrada();
    };

    return (
        <div className={`${styles.cadastroPessoa} ${themeClass}`}>
            <h3>{pessoaEditar ? 'Editar Pessoa' : 'Cadastrar Pessoa'}</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        placeholder="Digite o nome (3-50 caracteres)"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Idade:</label>
                    <input
                        type="number"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                        required
                        placeholder="Digite a idade"
                        min="0"
                        max="120"
                    />
                </div>
                <button type="submit" className={styles.btnSalvar}>
                    {pessoaEditar ? 'Atualizar' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}

export default CadastroPessoa;
