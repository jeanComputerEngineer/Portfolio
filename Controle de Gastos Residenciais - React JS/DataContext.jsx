import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [pessoas, setPessoas] = useState([]);
    const [transacoes, setTransacoes] = useState([]);
    const [lastPessoaId, setLastPessoaId] = useState(0);

    useEffect(() => {
        const pessoasSalvas = JSON.parse(localStorage.getItem('pessoas')) || [];
        const transacoesSalvas = JSON.parse(localStorage.getItem('transacoes')) || [];
        const ultimoId = parseInt(localStorage.getItem('lastPessoaId')) || 0;
        setPessoas(pessoasSalvas);
        setTransacoes(transacoesSalvas);
        setLastPessoaId(ultimoId);
    }, []);

    const addPessoa = (novaPessoa) => {
        const novoId = lastPessoaId + 1;
        const pessoaComId = { ...novaPessoa, id: novoId };
        const updatedPessoas = [...pessoas, pessoaComId];
        setPessoas(updatedPessoas);
        setLastPessoaId(novoId);
        localStorage.setItem('pessoas', JSON.stringify(updatedPessoas));
        localStorage.setItem('lastPessoaId', novoId);
    };

    const updatePessoa = (pessoaAtualizada) => {
        const updatedPessoas = pessoas.map(p => p.id === pessoaAtualizada.id ? pessoaAtualizada : p);
        setPessoas(updatedPessoas);
        localStorage.setItem('pessoas', JSON.stringify(updatedPessoas));
    };

    const deletePessoa = (id) => {
        const updatedPessoas = pessoas.filter(p => p.id !== id);
        setPessoas(updatedPessoas);
        localStorage.setItem('pessoas', JSON.stringify(updatedPessoas));

        const updatedTransacoes = transacoes.filter(t => t.pessoa !== id);
        setTransacoes(updatedTransacoes);
        localStorage.setItem('transacoes', JSON.stringify(updatedTransacoes));
    };

    const addTransacao = (novaTransacao) => {
        const updatedTransacoes = [...transacoes, novaTransacao];
        setTransacoes(updatedTransacoes);
        localStorage.setItem('transacoes', JSON.stringify(updatedTransacoes));
    };

    return (
        <DataContext.Provider value={{
            pessoas,
            transacoes,
            addPessoa,
            updatePessoa,
            deletePessoa,
            addTransacao
        }}>
            {children}
        </DataContext.Provider>
    );
};
