package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
