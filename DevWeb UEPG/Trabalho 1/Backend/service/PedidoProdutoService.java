package service;

import java.util.List;

import entity.PedidoProduto;

public interface PedidoProdutoService {

    void addPedidoProduto(PedidoProduto pedidoProduto);

    List<PedidoProduto> getPedidoProdutos();

    PedidoProduto getPedidoProduto(Long id_pedido_produto);

    void updatePedidoProduto(Long id_pedido_produto, PedidoProduto pedidoProduto);

    void deletePedidoProduto(Long id_pedido_produto);

}
