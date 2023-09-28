package com.api.DesafioEmpresacontrol.repositores;

import com.api.DesafioEmpresacontrol.models.RankingClubes;
import com.api.DesafioEmpresacontrol.models.UploadArquivos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RankingClubesRepository extends JpaRepository<RankingClubes, UUID> {
    public List<RankingClubes> findAllByNomeContainingIgnoreCase(String nome);

    public List<RankingClubes> findByOrderByPontosDesc();

    List<RankingClubes> findById(Long id);
}


