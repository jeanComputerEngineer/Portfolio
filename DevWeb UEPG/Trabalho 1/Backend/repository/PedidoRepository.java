package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
