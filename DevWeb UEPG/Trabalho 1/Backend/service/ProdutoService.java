package service;

import java.util.List;

import entity.Produto;

public interface ProdutoService {

    void addProduto(Produto produto);

    List<Produto> getProdutos();

    Produto getProduto(Long id_produto);

    void updateProduto(Long id_produto, Produto produto);

    void deleteProduto(Long id_produto);

}