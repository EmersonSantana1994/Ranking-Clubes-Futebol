package com.api.DesafioEmpresacontrol.controllers;

import java.util.List;
import java.util.Optional;

import com.api.DesafioEmpresacontrol.models.UserLogin;
import com.api.DesafioEmpresacontrol.models.Usuario;
import com.api.DesafioEmpresacontrol.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(value = "*", allowedHeaders = "*")
@RequestMapping("/usuarios")
public class UsuarioController {
    //SERVICE
    @Autowired
    private UsuarioService usuarioService;

    //SHOW ALL
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/all")
    public ResponseEntity <List<Usuario>> getAll(){
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

    //GET BY ID
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getById(@PathVariable long id){
        return usuarioService.getById(id)
                .map(resp -> ResponseEntity.ok(resp))
                .orElse(ResponseEntity.notFound().build());
    }

    //LOGAR
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/logar")

    public ResponseEntity<UserLogin> Autentication(@RequestBody Optional<UserLogin> user){
        return usuarioService.Logar(user).map(resp -> ResponseEntity.ok(resp))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    //CADASTRAR
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/cadastrar")
    public ResponseEntity<Usuario> Post(@RequestBody Usuario usuario){
        return usuarioService.CadastrarUsuario(usuario).map(resp -> ResponseEntity.status(HttpStatus.CREATED).body(resp))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    //ATUALIZAR
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/atualizar")
    public ResponseEntity<Usuario> putUsuario(@RequestBody Usuario usuario){

        return usuarioService.atualizarUsuario(usuario)
                .map(resp -> ResponseEntity.status(HttpStatus.OK).body(resp))
                .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }

}