package com.api.DesafioEmpresacontrol.services;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Optional;

import java.util.Base64;
import com.api.DesafioEmpresacontrol.models.UserLogin;
import com.api.DesafioEmpresacontrol.models.Usuario;
import com.api.DesafioEmpresacontrol.repositores.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UsuarioService {

    //REPOSITORY
    @Autowired
    private UsuarioRepository repository;

    //SHOW ALL
    public List<Usuario> listarUsuarios(){
        return repository.findAll();
    }

    //GET BY ID
    public Optional<Usuario> getById(long id) {
        return repository.findById(id);
    }

    //CADASTRAR
    public Optional<Usuario> CadastrarUsuario(Usuario usuario) {
        System.out.println("emeeeeeeeeeeeeeeeeeeee");
        Optional<Usuario> user = repository.findByUsuario(usuario.getUsuario());
        if(user.isPresent()) {
            return Optional.ofNullable(null);
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String senhaEncoder = encoder.encode(usuario.getSenha());
        usuario.setSenha(senhaEncoder);

        return Optional.of(repository.save(usuario));
    }


    //LOGAR
    public Optional<UserLogin> Logar(Optional<UserLogin> user){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Optional<Usuario> usuario = repository.findByUsuario(user.get().getUsuario());

        if(usuario.isPresent()) {
            if(encoder.matches(user.get().getSenha(), usuario.get().getSenha())) {
                String auth = user.get().getUsuario() + ":" + user.get().getSenha();
                byte[] encodeAuth = Base64.getEncoder().encode(auth.getBytes(Charset.forName("US-ASCII")));
                String authHeader = "Basic " + new String(encodeAuth);

                user.get().setToken(authHeader);
                user.get().setId(usuario.get().getId());

                return user;
            }
        }

        return null;
    }

    //ATUALIZAR
    public Optional<Usuario> atualizarUsuario(Usuario usuario) {
        if (repository.findById(usuario.getId()).isPresent()) {

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            String senhaEncoder = encoder.encode(usuario.getSenha());
            usuario.setSenha(senhaEncoder);

            return Optional.of(repository.save(usuario));
        }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado!", null);
        }
    }

}