package com.api.DesafioEmpresacontrol.models;

public class UserLogin {
    // ATRIBUTOS ------------------------------------------------------------
    private long id;

    private String usuario;
    private String senha;
    private String token;


    // GETTERS E SETTERS ----------------------------------------------------

    // ID
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    // USUARIO
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

    // TOKEN
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }


}
