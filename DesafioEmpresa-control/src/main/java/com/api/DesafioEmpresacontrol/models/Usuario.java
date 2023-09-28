package com.api.DesafioEmpresacontrol.models;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.*;

@Entity
@Table(name = "tb_usuario")
public class Usuario {
    // ATRIBUTOS ------------------------------------------------------------
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @NotNull(message = "O atributo usuário é obrigatório")
    @NotBlank(message = "O atributo usuário não pode ser vazio")
    @Email(message = "O atributo usuário deve ser um email")
    private String usuario;

    @NotNull(message = "O atributo senha é obrigatório")
    @Size(min = 8, message = "O atributo senha deve ter no mínimo 8 caracteres")
    private String senha;


    // GETTERS E SETTERS ----------------------------------------------------

    // ID
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    // SENHA
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }

}
