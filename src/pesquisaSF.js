import React, {useState} from 'react';
import { Button, Form, Jumbotron, Spinner, Alert } from 'react-bootstrap';
import {quebraTexto} from './utilitarios';
import axios from 'axios';
import { navigate } from 'hookrouter';


function PesquisaSF(){

    const FIXER_URL = "https://legis.senado.leg.br/dadosabertos/materia/pesquisa/lista?";
    const [textoPesquisa, setTextoPesquisa] = useState('');
    const [formValidado, setFormValidado] = useState(false);
    const [exibirSpinner, setExibirSpinner] = useState(false);
    const [exibirMsgErro, setExibirMsgErro] = useState(false);

    function pesquisar(event){
        event.preventDefault();
        setFormValidado(true);
        if (event.currentTarget.checkValidity() === true){
            setExibirSpinner(true);
            let materiaPesquisa = quebraTexto(textoPesquisa);
            if(materiaPesquisa.length === 3){
                let url = FIXER_URL + "sigla=" + materiaPesquisa[0] + "&numero=" + materiaPesquisa[1] + "&ano=" + materiaPesquisa[2];
                axios({method: 'get', url: url,responseType: 'json'})
                    .then(res => {
                        navigate('/materia/'+ res.data.PesquisaBasicaMateria.Materias.Materia.IdentificacaoMateria.CodigoMateria);
                }).catch(err => exibirErro());
            }
        }
    }

    function handlePesquisa(event){
        setTextoPesquisa(event.target.value);
    }

    function exibirErro(){
        setExibirMsgErro(true);
        setExibirSpinner(false);
    }

    return(
        <div>
            <h3 className="text-center">Dados abertos do Senado Federal</h3>
            <Alert variant="danger" show={exibirMsgErro}>
                Matéria não encontrada
            </Alert>
            <Jumbotron>
                <Form
                    className="form-inline"
                    validated={formValidado}
                    noValidate
                    onSubmit={pesquisar}>
                    <Form.Group>
                        <Form.Label className="mr-sm-2 mb-2">Pesquisa matérias</Form.Label>
                        <Form.Control
                            className="mr-sm-2 mb-2"
                            type="text"
                            minLength="3"
                            maxLength="120"
                            placeholder="sigla número/ano"
                            required
                            value={textoPesquisa}
                            onChange={handlePesquisa}
                            data-testid="txt-pesquisa" />
                        <Button variant="success mb-2" type="submit" data-testid="btn-pesquisar">
                            <span className={exibirSpinner ? null : 'hidden'}>
                            <Spinner animation="border" size="sm" />
                            </span>
                            <span className={exibirSpinner ? 'hidden' : null}>
                                Pesquisar
                            </span>
                        </Button>
                        <div className="invalid-feedback">Preencha com pelo menos 3 caracteres</div>
                    </Form.Group>
                </Form>
            </Jumbotron>
        </div>
    );
};

export default PesquisaSF;