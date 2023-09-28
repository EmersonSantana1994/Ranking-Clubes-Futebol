package com.api.DesafioEmpresacontrol.models;


import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Table(name = "arquivos_salvos")
public class UploadArquivos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column (name = "nome")
    private String nome;

    @Column (name = "UltimoNome")
    private String UltimoNome;

    @Email(message = "O atributo usuário deve ser um email")
    @Column (name = "Email")
    private String Email;

    @Column (name = "Sexo")
    private String Sexo;

    @Column (name = "IpAcesso")
    private String IpAcesso;

    @Column (name = "Idade")
    private String Idade;

    @Column (name = "Nascimento")
    private String Nascimento;




    public UploadArquivos(String Nome, String UltimoNome,
                          String Email, String Sexo, String IpAcesso,
                          String Idade, String Nascimento ) {
        this.nome = Nome;
        this.UltimoNome = UltimoNome;
        this.Email = Email;
        this.Sexo = Sexo;
        this.IpAcesso = IpAcesso;
        this.Idade = Idade;
        this.Nascimento = Nascimento;
    }

    public UploadArquivos() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }

    public void setNome(String Nome) {
        this.nome = Nome;
    }

    public String getUltimoNome() {
        return UltimoNome;
    }

    public void setUltimoNome(String UltimoNome) {
        this.UltimoNome = UltimoNome;
    }
    public String getEmail() {
        return Email;
    }

    public void setEmail(String Email) {
        this.Email = Email;
    }

    public String getSexo() {
        return Sexo;
    }

    public void setSexo(String Sexo) {
        this.Sexo = Sexo;
    }

    public String getIpAcesso() {
        return IpAcesso;
    }

    public void setIpAcesso(String IpAcesso) {
        this.IpAcesso = IpAcesso;
    }

    public String getIdade() {
        return Idade;
    }

    public void setIdade(String Idade) {
        this.Idade = Idade;
    }

    public String getNascimento() {
        return Nascimento;
    }

    public void setNascimento(String Nascimento) {
        this.Nascimento = Nascimento;
    }

}
