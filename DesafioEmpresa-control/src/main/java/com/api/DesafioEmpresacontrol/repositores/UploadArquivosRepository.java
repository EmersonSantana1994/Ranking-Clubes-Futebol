package com.api.DesafioEmpresacontrol.repositores;

import com.api.DesafioEmpresacontrol.models.UploadArquivos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UploadArquivosRepository extends JpaRepository<UploadArquivos, UUID> {

    public List<UploadArquivos> findByOrderByNome();

}
