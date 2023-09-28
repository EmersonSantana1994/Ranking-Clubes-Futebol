// PROJETO PARA DESAFIO DE TESTE

import React, { useState, useEffect } from 'react';/*eslint-disable*/
import '../../src/css/login.css';
import { Button, Image, Form, InputGroup, FormControl, Col, Carousel } from 'react-bootstrap';
import { apiC } from "../conexoes/api";
import BootstrapTable from 'react-bootstrap-table-next';

export default function MeuCampeonato() {

    //VARIAVEIS
    const [mostrarRecuperarSenha, setMostrarRecuperarSenha] = useState('padrao');
    const [loginError, setLoginError] = useState(false);
    const [priLugLiga, setPriLugLiga] = useState('');
    const [valorPriLiga, setValorPriLiga] = useState(0);
    const [segLugLiga, setSegLugLiga] = useState('');
    const [valorSegLiga, setValorSegLiga] = useState(0);
    const [terLugLiga, seTerLugLiga] = useState('');
    const [valorTerLiga, setValorTerLiga] = useState(0);
    const [priLugMund, setPriLugMund] = useState('');
    const [valorPriMund, setValorPriMund] = useState(0);
    const [segLugMund, setSegLugMund] = useState('');
    const [valorSegMund, setValorSegMund] = useState(0);
    const [terLugMund, setTerLugMund] = useState('');
    const [valorTerMund, setValorTerMund] = useState(0);
    const [quarLugMund, setQuarLugMund] = useState('');
    const [valorQuarMund, setValorQuratMund] = useState(0);
    const [quinLugMund, setQuinLugMund] = useState('');
    const [valorQuinMund, setValorQuinMund] = useState(0);
    const [sextLugMund, setSextLugMund] = useState('');
    const [valorSexMund, setValorSexMund] = useState(0);
    const [setiLugMund, setSetiLugMund] = useState('');
    const [valorSetMund, setValorSetMund] = useState(0);
    const [priLugSub, setPriLugSub] = useState('');
    const [valorPriLugSub, setValorPriLugSub] = useState(0);
    const [segLugSub, setSegLugSub] = useState('');
    const [valorSegLugSub, setValorSegLugSub] = useState(0);
    const [terLugSub, setTerLugSub] = useState('');
    const [valorTerLugSub, setValorTerLugSub] = useState(0);
    const [priLugCopa, setPriLugCopa] = useState('');
    const [valorPriLugCopa, setValorPriLugCopa] = useState(0);
    const [segLugCopa, setSegLugCopa] = useState('');
    const [valorSegLugCopa, setValorSegLugCopa] = useState(0);
    const [tercLugCopa, setTercLugCopa] = useState('');
    const [valorTercLugCopa, setValorTercLugCopa] = useState(0);
    const [priLugSuper, setPriLugSuper] = useState('');
    const [valorPriLugSuper, setValorPriLugSuper] = useState(0);
    const [segLugSuper, setSegLugSuper] = useState('');
    const [valorSegLugSuper, setValorSegLugSuper] = useState(0);
    const [terLugSuper, setTerLugSuper] = useState('');
    const [valorTerLugSuper, setValorTerLugSuper] = useState(0);
    const [quarLugSuper, setQuarLugSuper] = useState('');
    const [valorQuarLugSuper, setValorQuarLugSuper] = useState(0);
    const [priLugRecopa, setPriLugRecopa] = useState('');
    const [valorPriLugRecopa, setValorPriLugRecopar] = useState(0);
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
    const [podeCarregar, setPodeCarregar] = useState(false);

    let totalItens = 0
    let contador = 0
    let itensVar = []
    let contadorMale = 0
    let contadorFemale = 0

   useEffect(() => {
        async function iniciarTabela() {
        setCarregando(true)
        await apiC.get("ranking/buscar")
            .then(response => {
                if (response.status === 200) {
                    for (let i = 0; i < response.data.length; i++) {
                        if (contador === i) {
                            let k = i
                            for (let j = 0; j < response.data.length; j++) {
                                itensVar[k] = response.data[j]
                                k++
                            }
                        }
                            setItens(JSON.parse(JSON.stringify(itensVar)))
                    }
                    setMostrarTabela(true)
                }
                setCarregando(false)
            })
            .catch((error) => {
                setCarregando(false)
            });
        }
        iniciarTabela()
    }, [])


    //FUNÇÃO DE ENFETUAR O LOGIN
    async function efetuarLogin(e) {
        setLoginError("");
        setCarregando(true)
        if (!priLugLiga) {
            setLoginError("Preencha o nome do primeiro lugar da liga");
        } else if (!password) {
            setLoginError("Preencha o nome do segundo lugar da liga");
        } else {
            setCarregando(true)
            await apiC.post('usuarios/logar', {
                usuario: priLugLiga,
                senha: password
            })
                .then(async function (response) {
                    //AO REALIZAR O LOGIN AS MENSAGENS ABAIXO SE MODIFICAM
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
    async function handleSalvar(torneio) {
            let liga = []
            if(torneio == "Liga"){
                liga.push(priLugLiga, segLugLiga, terLugLiga)
            }   
            if(torneio == "SubLiga"){
                liga.push(priLugSub, segLugSub, terLugSub)
            }  
            if(torneio == "Mundial"){
                liga.push(priLugMund, segLugMund, terLugMund, quarLugMund, quinLugMund, 
                    sextLugMund, setiLugMund)
            }  
            if(torneio == "Recopa"){
                liga.push(priLugRecopa)
            }  
            if(torneio == "Copa"){
                liga.push(priLugCopa, segLugCopa, tercLugCopa)
            }   
            if(torneio == "SuperCopa"){
                liga.push(priLugSuper, segLugSuper, terLugSuper, quarLugSuper)
            }   
            for (let i = 0; i < liga.length; i++) {
console.log("ffffffff", liga[i])
                await apiC.post("ranking/encontrar/nome", {
                    "nome": liga[i]
                })
                    .then(response => {
                        if (response.status === 200) {
                            if (response.data.length > 0) {
                                atualizaArquivo(response.data, i, torneio )
                            }else{
                                inserirNovoTime(liga[i], i, torneio)
                            }
                            // CASO ENVIO ACONTEÇA A FUNÇÃO ABAIXO TEM O DEVER DE REALIZAR O GET PARA TRAZER OS ARQUIVOS

                        }
                        setCarregando(false)
                    })
                    .catch((error) => {
                        setCarregando(false)
                    });
            }

    }

    // FUNÇÃO BUNCA ARQUIVO ENVIA DO BANCO DE DADOS
    async function atualizaArquivo(item, i, torneio) {
        setCarregando(true)
        console.log("item", item[0].nome)
        console.log("i", i)
        if(torneio == "Liga"){
            await apiC.put("ranking/atualiza", {
                "id": item[0].id,
                "nome": item[0].nome,
                "pontos": i == 0 ? item[0].pontos + valorPriLiga : i == 1 ? 
                item[0].pontos + valorSegLiga : i == 2 ?  item[0].pontos + valorTerLiga : ""
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log("atualizado ", response)
                        inserirData()
                    }
                    setCarregando(false)
                })
                .catch((error) => {
                    setCarregando(false)
                });
        }if(torneio == "SubLiga"){
            await apiC.put("ranking/atualiza", {
                "id": item[0].id,
                "nome": item[0].nome,
                "pontos": i == 0 ? item[0].pontos + valorPriLugSub : i == 1 ? 
                item[0].pontos + valorSegLugSub : i == 2 ?  item[0].pontos + valorTerLugSub : ""
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log("atualizado ", response)
                        inserirData()
                    }
                    setCarregando(false)
                })
                .catch((error) => {
                    setCarregando(false)
                });
        }if(torneio == "Mundial"){
            console.log("valorSexMund", valorSexMund)
            console.log("dddddd", i)
            console.log("item[0].pontos", item[0].pontos)
            await apiC.put("ranking/atualiza", {
                "id": item[0].id,
                "nome": item[0].nome,
                "pontos": i == 0 ? item[0].pontos + valorPriMund : i == 1 ? 
                item[0].pontos + valorSegMund : i == 2 ?  item[0].pontos + valorTerMund : i == 3 ? 
                item[0].pontos + valorQuarMund : i == 4 ? item[0].pontos + valorQuinMund : i == 5 ? 
                item[0].pontos + valorSexMund : i == 6 ? item[0].pontos + valorSetMund : ""
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log("atualizado ", response)
                        inserirData()
                    }
                    setCarregando(false)
                })
                .catch((error) => {
                    setCarregando(false)
                });
        }if(torneio == "Recopa"){
            await apiC.put("ranking/atualiza", {
                "id": item[0].id,
                "nome": item[0].nome,
                "pontos": i == 0 ? item[0].pontos + valorPriLugRecopa : ""
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log("atualizado ", response)
                        inserirData()
                    }
                    setCarregando(false)
                })
                .catch((error) => {
                    setCarregando(false)
                });
        }if(torneio == "Copa"){
            await apiC.put("ranking/atualiza", {
                "id": item[0].id,
                "nome": item[0].nome,
                "pontos": i == 0 ? item[0].pontos + valorPriLugCopa : i == 1 ? 
                item[0].pontos + valorSegLugCopa : i == 2 ?  item[0].pontos + valorTercLugCopa : ""
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log("atualizado ", response)
                        inserirData()
                    }
                    setCarregando(false)
                })
                .catch((error) => {
                    setCarregando(false)
                }); 
        }if(torneio == "SuperCopa"){
            await apiC.put("ranking/atualiza", {
                "id": item[0].id,
                "nome": item[0].nome,
                "pontos": i == 0 ? item[0].pontos + valorPriLugSuper : i == 1 ? 
                item[0].pontos + valorSegLugSuper : i == 2 ?  item[0].pontos + valorTerLugSuper :  i == 3 ? 
                item[0].pontos + valorQuarLugSuper: ""
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log("atualizado ", response)
                        inserirData()
                    }
                    setCarregando(false)
                })
                .catch((error) => {
                    setCarregando(false)
                });
        }
    }

    async function inserirNovoTime(nome, i, torneio) {
        if(torneio == "Liga"){
            await apiC.post("ranking/inserir", {
                "nome": nome,
                "pontos": i == 0 ? valorPriLiga : i == 1 ? 
                valorSegLiga : i == 2 ?  valorTerLiga : ""
            })
            inserirData() 
        } if(torneio == "SubLiga"){
            await apiC.post("ranking/inserir", {
                "nome": nome,
                "pontos": i == 0 ? valorPriLugSub : i == 1 ? 
                valorSegLugSub : i == 2 ?  valorTerLugSub : ""
            })
            inserirData()
        } if(torneio == "Mundial"){
            console.log("valorSegMund", valorSegMund)
            console.log("iiii", i)
            await apiC.post("ranking/inserir", {
                "nome": nome,
                "pontos": i == 0 ? valorPriMund : i == 1 ? 
                valorSegMund : i == 2 ?  valorTerMund : i == 3 ? 
                valorQuarMund : i == 4 ? valorQuinMund : i == 5 ? 
                valorSexMund : i == 6 ? valorSetMund : ""
            })
            inserirData()
        } if(torneio == "Recopa"){
            await apiC.post("ranking/inserir", {
                "nome": nome,
                "pontos": i == 0 ? valorPriLugRecopa : ""
            })
            inserirData()
        } if(torneio == "Copa"){
            await apiC.post("ranking/inserir", {
                "nome": nome,
                "pontos": i == 0 ? valorPriLugCopa : i == 1 ? 
                valorSegLugCopa : i == 2 ? valorTercLugCopa : ""
            })
            inserirData()
        } if(torneio == "SuperCopa"){
            await apiC.post("ranking/inserir", {
                "nome": nome,
                "pontos": i == 0 ? valorPriLugSuper : i == 1 ? 
                valorSegLugSuper : i == 2 ?  valorTerLugSuper :  i == 3 ? 
                valorQuarLugSuper: ""
            })
            inserirData()
        }
    }

    const handleClickOutroBotao = (e) => {
        const importar = document.getElementById('importar-filtro-arquivo')
        importar.click();
    }

    // FUNÇÃO ABAIXO TEM O DEVER DE SALVAR OS DADOS TRAZIDOS DO BANCO PARA SEREM APRESENTADOS NA TABELA
   async function inserirData() {
    console.log("veio aqui?????")
        setCarregando(true)
        await apiC.get("ranking/buscar")
            .then(response => {
                if (response.status === 200) {
                    for (let i = 0; i < response.data.length; i++) {
                        if (contador === i) {
                            let k = i
                            for (let j = 0; j < response.data.length; j++) {
                                itensVar[k] = response.data[j]
                                k++
                            }
                        }
                        console.log("itensVar 2", itensVar)
                            console.log("itensVar", itensVar)
                            setItens(JSON.parse(JSON.stringify(itensVar)))

                    }
                    setMostrarTabela(true)
                }
                setCarregando(false)
            })
            .catch((error) => {
                console.log("deu erro????")
                setCarregando(false)
            });

    }

    // ABAIXO SÃO AS COLUNAS DE ACORDO COM O ARQUIVO ENVIADO (A TAMBÉM OS ID DE CADA DADO)
    const colunas = [
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
            dataField: 'pontos',
            headerClasses: 'nao-selecionavel',
            text: <p>
                Pontos
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



            <>
                <div>
                    <div>
                        <label>Quem foi o primeiro lugar na liga?</label>
                        <Form.Control
                            onChange={e => { setPriLugLiga(e.target.value); setValorPriLiga(22) }}
                            value={priLugLiga}
                        />
                    </div>
                    <div>
                        <label>Quem foi o segundo lugar na liga?</label>
                        <Form.Control
                            onChange={e => { setSegLugLiga(e.target.value); setValorSegLiga(12) }}
                            value={segLugLiga}
                        />
                    </div>
                    <div>
                        <label>Quem foi o tercero lugar na liga?</label>
                        <Form.Control
                            onChange={e => { seTerLugLiga(e.target.value); setValorTerLiga(5) }}
                            value={terLugLiga}
                        />
                    </div>
                    <Button className="btn-filtro-arquivo" onClick={(e) => handleSalvar("Liga")}>
                        <div>Enviar Arquivo</div>
                    </Button>
                    <div>
                        <label>Quem foi o primeiro lugar na Sub-Liga?</label>
                        <Form.Control
                            onChange={e => { setPriLugSub(e.target.value); setValorPriLugSub(20) }}
                            value={priLugSub}
                        />
                    </div>
                    <div>
                        <label>Quem foi o segundo lugar na Sub-Liga?</label>
                        <Form.Control
                            onChange={e => { setSegLugSub(e.target.value); setValorSegLugSub(12) }}
                            value={segLugSub}
                        />
                    </div>
                    <div>
                        <label>Quem foi o terceiro lugar na Sub-Liga?</label>
                        <Form.Control
                            onChange={e => { setTerLugSub(e.target.value); setValorTerLugSub(5) }}
                            value={terLugSub}
                        />
                    </div>
                    <Button className="btn-filtro-arquivo" onClick={(e) => handleSalvar("SubLiga")}>
                        <div>Enviar Arquivo</div>
                    </Button>
                    <div>
                        <label>Quem foi o primeiro lugar no Campeonato Mundial?</label>
                        <Form.Control
                            onChange={e => { setPriLugMund(e.target.value); setValorPriMund(68) }}
                            value={priLugMund}
                        />
                    </div>
                    <div>
                        <label>Quem foi o segundo lugar no Campeonato Mundial?</label>
                        <Form.Control
                            onChange={e => { setSegLugMund(e.target.value); setValorSegMund(50) }}
                            value={segLugMund}
                        />
                    </div>
                    <div>
                        <label>Quem foi o terceiro lugar no Campeonato Mundial?</label>
                        <Form.Control
                            onChange={e => { setTerLugMund(e.target.value); setValorTerMund(38) }}
                            value={terLugMund}
                        />
                    </div>
                    <div>
                        <label>Quem foi o quarto lugar no Campeonato Mundial?</label>
                        <Form.Control
                            onChange={e => { setQuarLugMund(e.target.value); setValorQuratMund(26) }}
                            value={quarLugMund}
                        />
                    </div>
                    <div>
                        <label>Quem foi o quinto lugar no Campeonato Mundial?</label>
                        <Form.Control
                            onChange={e => { setQuinLugMund(e.target.value); setValorQuinMund(19) }}
                            value={quinLugMund}
                        />
                    </div>
                    <div>
                        <label>Quem foi o sexto lugar no Campeonato Mundial?</label>
                        <Form.Control
                            onChange={e => { setSextLugMund(e.target.value); setValorSexMund(14) }}
                            value={sextLugMund}
                        />
                    </div>
                    <div>
                        <label>Quem foi o setimo lugar no Campeonato Mundial?</label>
                        <Form.Control
                            onChange={e => { setSetiLugMund(e.target.value); setValorSetMund(9) }}
                            value={setiLugMund}
                        />
                    </div>
                    <Button className="btn-filtro-arquivo" onClick={(e) => handleSalvar("Mundial")}>
                        <div>Enviar Arquivo</div>
                    </Button>
                    <div>
                        <label>Quem foi o primeiro lugar na Recopa?</label>
                        <Form.Control
                            onChange={e => { setPriLugRecopa(e.target.value); setValorPriLugRecopar(2) }}
                            value={priLugRecopa}
                        />
                    </div>
                    <Button className="btn-filtro-arquivo" onClick={(e) => handleSalvar("Recopa")}>
                        <div>Enviar Arquivo</div>
                    </Button>
                    <div>
                        <label>Quem foi o primeiro lugar na Copa?</label>
                        <Form.Control
                            onChange={e => { setPriLugCopa(e.target.value); setValorPriLugCopa(22) }}
                            value={priLugCopa}
                        />
                    </div>
                    <div>
                        <label>Quem foi o segundo lugar na Copa?</label>
                        <Form.Control
                            onChange={e => { setSegLugCopa(e.target.value); setValorSegLugCopa(12) }}
                            value={segLugCopa}
                        />
                    </div>
                    <div>
                        <label>Quem foi o terceiro lugar na Copa?</label>
                        <Form.Control
                            onChange={e => { setTercLugCopa(e.target.value); setValorTercLugCopa(5) }}
                            value={tercLugCopa}
                        />
                    </div>
                    <Button className="btn-filtro-arquivo" onClick={(e) => { handleSalvar("Copa") }}>
                        <div>Enviar Arquivo</div>
                    </Button>
                    <div>
                        <label>Quem foi o primeiro lugar na Super Copa?</label>
                        <Form.Control
                            onChange={e => { setPriLugSuper(e.target.value); setValorPriLugSuper(62) }}
                            value={priLugSuper}
                        />
                    </div>
                    <div>
                        <label>Quem foi o segundo lugar na Super Copa?</label>
                        <Form.Control
                            onChange={e => { setSegLugSuper(e.target.value); setValorSegLugSuper(44) }}
                            value={segLugSuper}
                        />
                    </div>
                    <div>
                        <label>Quem foi o terceiro lugar na Super Copa?</label>
                        <Form.Control
                            onChange={e => { setTerLugSuper(e.target.value); setValorTerLugSuper(32) }}
                            value={terLugSuper}
                        />
                    </div>
                    <div>
                        <label>Quem foi o quarto lugar na Super Copa?</label>
                        <Form.Control
                            onChange={e => { setQuarLugSuper(e.target.value); setValorQuarLugSuper(22) }}
                            value={quarLugSuper}
                        />
                    </div>
                    <Button className="btn-filtro-arquivo" onClick={(e) => handleSalvar("SuperCopa")}>
                        <div>Enviar Arquivo</div>
                    </Button>
                   
                </div>

                <div className="espaco" ></div>
                <div className="campos-texto-login">
                  
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
                {console.log("cadeeeee????", itens )}
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


        </>

    )
}