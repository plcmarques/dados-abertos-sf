import React, {useState} from 'react';
import { Button, Form, Jumbotron } from 'react-bootstrap';
import {quebraTexto} from './utilitarios';

function PesquisaSF(){

    const [textoPesquisa, setTextoPesquisa] = useState('');
    const [formValidado, setFormValidado] = useState(false);

    function pesquisar(event){
        event.preventDefault();
        setFormValidado(true);
        if (event.currentTarget.checkValidity() === true){
            console.log(quebraTexto(textoPesquisa));
            console.log(textoPesquisa);
        }
    }

    function handlePesquisa(event){
        setTextoPesquisa(event.target.value);
    }

    return(
        <div>
            <h3 className="text-center">Dados abertos do Senado Federal</h3>
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
                            required
                            value={textoPesquisa}
                            onChange={handlePesquisa}
                            data-testid="txt-pesquisa" />
                        <Button
                            className="mr-sm-2 mb-2"
                            variant="success"
                            type="submit"
                            data-testid="btn-cadastrar">
                            Pesquisar
                        </Button>
                        <div className="invalid-feedback">Preencha com pelo menos 3 caracteres</div>
                    </Form.Group>
                </Form>
            </Jumbotron>
        </div>
    );
};

export default PesquisaSF;