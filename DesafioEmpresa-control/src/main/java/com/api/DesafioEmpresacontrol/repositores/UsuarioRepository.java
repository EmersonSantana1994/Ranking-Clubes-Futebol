package com.api.DesafioEmpresacontrol.repositores;

import java.util.List;
import java.util.Optional;

import com.api.DesafioEmpresacontrol.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    //FIND USUARIO
    public Optional<Usuario> findByUsuario(String usuario);

}
