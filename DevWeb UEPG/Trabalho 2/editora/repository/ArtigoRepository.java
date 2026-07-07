package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Artigo;

public interface ArtigoRepository extends JpaRepository<Artigo, Long>{
    
    List<Artigo> findByPublicado(boolean publicado);

    List<Artigo> findByTituloContaining(String titulo);
}
