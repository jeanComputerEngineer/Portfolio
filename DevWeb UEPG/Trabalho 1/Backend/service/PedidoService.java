package service;

import java.util.List;

import entity.Pedido;

public interface PedidoService {

    void addPedido(Pedido pedido);

    List<Pedido> getPedidos();

    Pedido getPedido(Long id_pedido);

    void updatePedido(Long id_pedido, Pedido pedido);

    void deletePedido(Long id_pedido);

}
