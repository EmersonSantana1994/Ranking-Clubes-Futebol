package com.api.DesafioEmpresacontrol.models;


import javax.persistence.*;

@Entity
@Table(name = "ranking_clubes")
public class RankingClubes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column (name = "nome")
    private String nome;

    @Column (name = "pontos")
    private long pontos;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public long getPontos() {
        return pontos;
    }

    public void setPontos(long pontos) {
        this.pontos = pontos;
    }
}
