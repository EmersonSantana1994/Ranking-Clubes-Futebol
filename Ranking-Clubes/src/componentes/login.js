// PROJETO PARA DESAFIO DE TESTE

import React, { useState} from 'react';/*eslint-disable*/
import '../../src/css/login.css';
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel } from 'react-bootstrap';
import { apiC } from "../conexoes/api";
import BootstrapTable from 'react-bootstrap-table-next';
import { useNavigate } from 'react-router-dom';

export default function TelaLogin() {

    //VARIAVEIS
    const [mostrarRecuperarSenha, setMostrarRecuperarSenha] = useState('padrao');
    const [loginError, setLoginError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailCadastro, setEmailCadastro] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCadastro, setPasswordCadastro] = useState('');
    const [mostrarEsconder, setMostrarEsconder] = useState("password");
    const [mostrarUploadCsv, setMostrarUploadCsv] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erroAoCadastrar, setErroAoCadastrar] = useState(false);
    const [nomeArquivo, setNomeArquivo] = useState('');
    const [arquivo, setArquivo] = useState('');
    const [mostrarTabela, setMostrarTabela] = useState(false);
    const [itens, setItens] = useState([]);
    const [contMen, setContMen] = useState([]);
    const [contFem, setContFem] = useState([]);
    const [medIdade, setMedIdade] = useState([]);

    let totalItens = 0
    let contador = 0
    let itensVar = []
    let contadorMale = 0
    let contadorFemale = 0

    const navigate = useNavigate();
    const paraNavegar = () => {
        navigate('/ranking')
    }

    //FUNÇÃO DE ENFETUAR O LOGIN
    async function efetuarLogin(e) {
        setLoginError("");
        setCarregando(true)
        if (!email || !password) {
            setLoginError("Preencha e-mail e senha!");
        } else {
            setCarregando(true)
            await apiC.post('usuarios/logar', {
                usuario: email,
                senha: password
            })
                .then(async function (response) {
                    //AO REALIZAR O LOGIN AS MENSAGENS ABAIXO SE MODIFICAM
                    paraNavegar()
                    setCarregando(false)
                    setMostrarUploadCsv(true)
                    setLoginError(false)
                    setErroAoCadastrar(false)
                })
                .catch(function (error) {
                    //MENSAGENS DE ERRO APARECERAM CASO LOGIN DER ALGUM ERRO
                    setCarregando(false)
                    setLoginError(true)
                });
        }
    }

    //FUNÇÃO APOIADORA PARA CADASTRO E LOGIN
    function botaoPressionado(event) {
        if (event.key === "Enter") {
            efetuarLogin(event)
        } else if (event.key === "Cadastrar") {
            efetuarCadastro(event)
        }
    }

    //FUNÇÃO DE CADASTRO
    async function efetuarCadastro(e) {
        // API CADASTRO
        setCarregando(true)
        await apiC.post('usuarios/cadastrar', {
            usuario: emailCadastro,
            senha: passwordCadastro
        })
            .then(async function (response) {
                setCarregando(false)
                setErroAoCadastrar(false)
            })
            .catch(function (error) {
                // CASO ACONTEÇA ALGUM ERRO SERÁ APRESENTADA
                setCarregando(false)
                setErroAoCadastrar(true)
            });
    }

    // FUNÇÃO ENVIA ARQUIVO CSV AO BACK
    async function handleSalvar(e) {
        //LEITURA E ENVIO DE ARQUIVO CSV PARA O BACK
        e.preventDefault();
        setCarregando(true)
        let data = new FormData();
        data.append('file', arquivo);
        await apiC.post("api/csv/upload", data)
            .then(response => {
                if (response.status === 200) {
                    // CASO ENVIO ACONTEÇA A FUNÇÃO ABAIXO TEM O DEVER DE REALIZAR O GET PARA TRAZER OS ARQUIVOS
                    buscarArquivo()
                }
                setCarregando(false)
            })
            .catch((error) => {
                setCarregando(false)
            });
    }

// FUNÇÃO BUNCA ARQUIVO ENVIA DO BANCO DE DADOS
    async function buscarArquivo(e) {
        setCarregando(true)
        await apiC.get("api/csv/arquivos")
            .then(response => {
                if (response.status === 200) {

                    inserirData(response.data)
                    setMostrarTabela(true)
                }
                setCarregando(false)
            })
            .catch((error) => {
                setCarregando(false)
            });
    }

    const handleClickOutroBotao = (e) => {
        const importar = document.getElementById('importar-filtro-arquivo')
        importar.click();
    }

    // FUNÇÃO ABAIXO TEM O DEVER DE SALVAR OS DADOS TRAZIDOS DO BANCO PARA SEREM APRESENTADOS NA TABELA
    function inserirData(data) {
        const sexo = []
        let somaIdade = 0
        let mediaIdade = 0
        let newData = new Date()
        let ano = newData.getFullYear();
        let anoCorrigido


        for (let i = 0; i < data.length; i++) {
            if (contador == i) {
                let k = i
                for (let j = 0; j < data.length; j++) {
                    itensVar[k] = data[j]
                    sexo[k] = data[j].sexo
                    k++
                    somaIdade += parseInt(data[j].idade, 10)
                }

            }
 
            // ESTE FOR FAZ A CONTA DE QUANTOS HOMENS E MULHERES TEM NA TABELA 
            //E REALIZAR ACONTAGEM DA MÉDIA
            mediaIdade = somaIdade / data.length
            setMedIdade(mediaIdade)
            if (i == (data.length - 1)) {
                for (let i = 0; i < data.length; i++) {
                    if (sexo[i] == "Male") {
                        contadorMale++
                    } else if (sexo[i] == "Female") {
                        contadorFemale++
                    }
                }

                // ESTE FOR CORRIGE O ANO APRESENTADO INCORRETO NO ARQUIVO PARA A TABELA NO FRONT
                for (let i = 0; i < data.length; i++) {
                    anoCorrigido = ano - parseInt(itensVar[i].idade, 10)
                    let novoAno = anoCorrigido.toString()
                    let formatDate = itensVar[i].nascimento.split("/");
                    let formatar = formatDate[0] + "/" + formatDate[1].replace("0", "/") + "/" + novoAno
                    itensVar[i].nascimento = formatar
                }

                setContMen(contadorMale)
                setContFem(contadorFemale)

                // TUDO É SALVO PARA SER ENVIADO AO BOOTSTRAP
                setItens(JSON.parse(JSON.stringify(itensVar)))
            }


        }

    }

// ABAIXO SÃO AS COLUNAS DE ACORDO COM O ARQUIVO ENVIADO (A TAMBÉM OS ID DE CADA DADO)
    const colunas = [
        {
            dataField: 'id',
            headerClasses: 'nao-selecionavel',
            text: <p>
                id
            </p>,
            formatter: (cell, row) => {
                return <p>{cell === null ? '-' : cell}</p>;
            },
        },
        {
            dataField: 'nome',
            headerClasses: 'nao-selecionavel',
            sort: true,
            text: <p>
                Nome
            </p>,
            formatter: (cell, row) => {
                return <p>{cell === null ? '-' : cell}</p>;
            },
        },
        {
            dataField: 'email',
            headerClasses: 'nao-selecionavel',
            text: <p>
                E-MAil
            </p>,
            formatter: (cell, row) => {
                return <p>{cell === null ? '-' : cell}</p>;
            },
        },
        {
            dataField: 'ultimoNome',
            headerClasses: 'nao-selecionavel',
            text: <p>
                Ultimo Nome
            </p>,
            formatter: (cell, row) => {
                return <p>{cell === null ? '-' : cell}</p>;
            },
        },
        {
            dataField: 'sexo',
            headerClasses: 'nao-selecionavel',
            text: <p>
                Sexo
            </p>,
            formatter: (cell, row) => {
                return <p>{cell === null ? '-' : cell}</p>;
            },
        },
        {
            dataField: 'ipAcesso',
            headerClasses: 'nao-selecionavel',
            text: <p>
                Ip Acesoo
            </p>,
            formatter: (cell, row) => {
                return <p>{cell === null ? '-' : cell}</p>;
            },
        },
        {
            dataField: 'idade',
            headerClasses: 'nao-selecionavel',
            text: <p>
                Idade
            </p>,
            formatter: (cell, row) => {
                return <p>{cell === null ? '-' : cell}</p>;
            },
        },
        {
            dataField: 'nascimento',
            headerClasses: 'nao-selecionavel',
            text: <p>
                Nascimento
            </p>,
            formatter: (cell, row) => {
                return <p>{cell === null ? '-' : cell}</p>;
            },
        },
    ]

    // ESTA FUNÇÃO FAZ A LEITURA DO ARQUIVO EM CSV
    function handleLerArquivo(event) {
        let files = event.target.files[0];
        setNomeArquivo(files.name);
        setArquivo(files)
    };

    return (
        <>
            {carregando &&
                <h1>carregando..</h1>
            }
            {erroAoCadastrar &&
                <h4>Erro ao cadastrar</h4>
            }
            {loginError &&
                <h4> E-mail inválido ou senha incorreta </h4>
            }
            

            {mostrarRecuperarSenha === 'padrao' &&
                <>
                    <div>
                        <div>
                            <label>E-mail</label>
                            <Form.Control

                                type="email"
                                placeholder="E-mail"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                name="campoEmail"
                                id="campoEmail"
                            />
                        </div>
                        <div>
                            <div>
                                <label>Senha</label>
                                <FormControl

                                    placeholder="Senha"
                                    type={mostrarEsconder}
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    name="campoSenha"
                                    id="campoSenha"
                                    maxLength="20"
                                />
                            </div>
                           
                        </div>
                    </div>

                    <div>
                        <Button onClick={efetuarLogin} onKeyDown={e => botaoPressionado(e)}>Entrar</Button>
                    </div>
                    <div className="espaco" ></div>
                    <div className="campos-texto-login">
                        <div>
                            <label>Cadastrar e-mail</label>
                            <Form.Control

                                type="email"
                                placeholder="E-mail"
                                onChange={e => setEmailCadastro(e.target.value)}
                                value={emailCadastro}
                                name="cadastrarEmail"
                                id="cadastrarEmail"
                            />
                          
                        </div>

                        <div>
                            <div>
                                <label> Cadastrar senha</label>
                                <FormControl

                                    placeholder="Senha"
                                    type={mostrarEsconder}
                                    onChange={e => setPasswordCadastro(e.target.value)}
                                    value={passwordCadastro}
                                    name="cadastrarSenha"
                                    id="cadastrarSenha"
                                    maxLength="20"
                                />
                            </div>
                           
                        </div>
                    </div>

                    <div>
                        <Button onClick={efetuarCadastro} onKeyDown={e => botaoPressionado(e)}>Cadastrar</Button>
                    </div>

                    {mostrarUploadCsv &&
                        <input type="file" onChange={(e) => handleLerArquivo(e)} />
                    }
                    {mostrarUploadCsv &&
                        <Button className="btn-filtro-arquivo" onClick={(e) => handleSalvar(e)}>
                            <div>Enviar Arquivo</div>
                        </Button>
                    }


                    {mostrarUploadCsv &&
                        <label className="label-quanti-hom">Quantidades de Homens</label>
                    }

                    {mostrarUploadCsv &&
                        <Form.Control
                            className="lab-quant-home"
                            value={contMen}
                        />
                    }
                    {mostrarUploadCsv &&
                        <label className="label-quanti-mul">Quantidades de Mulheres </label>
                    }

                    {mostrarUploadCsv &&
                        <Form.Control
                            className="lab-quant-mul"
                            value={contFem}
                        />
                    }
                    {mostrarUploadCsv &&
                        <label className="label-media-idad">Media de idade</label>
                    }

                    {mostrarUploadCsv &&
                        <Form.Control
                            className="lab-media-idade"
                            value={medIdade}
                        />
                    }
                    {mostrarTabela &&
                        <div>
                            <BootstrapTable
                                hover={true}
                                classes="tabela"
                                condensed={true}
                                keyField='id'
                                data={itens}
                                columns={colunas}
                                bootstrap4={true}
                                bordered={false}
                            />
                        </div>
                    }

                </>

            }
        </>

    )
}