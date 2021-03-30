import React, {useState} from 'react';
import './dados-abertos-sf.css';
import { Jumbotron, Button, Form, Col, Spinner, Alert, Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function DadosAbertosSF() {

  const FIXER_URL = 'https://legis.senado.leg.br/dadosabertos/materia/';

  const [valor,setValor] = useState('');
  const [exibirSpinner, setExibirSpinner] = useState(false);
  const [formValidado, setFormValidado] = useState(false);
  const [materia, setMateria] = useState('');
  const [tramitando,setTramitando] = useState('');
  const [ementa, setEmenta] = useState('');
  const [autor, setAutor] = useState('');
  const [urlFotoAutor, setUrlFotoAutor] = useState('');

  function handleValor(event){
    setValor(event.target.value.replace(/\D/,''));
  }

  function buscar(event){
    event.preventDefault();
    setFormValidado(true);
    if(event.currentTarget.checkValidity() === true){
      setExibirSpinner(true);
      axios({method: 'get', url: FIXER_URL + valor,responseType: 'json'})
        .then(res => {
          setMateria(res.data.DetalheMateria.Materia.IdentificacaoMateria.DescricaoIdentificacaoMateria);
          setTramitando(res.data.DetalheMateria.Materia.IdentificacaoMateria.IndicadorTramitando === "Sim" ? "Em tramitação" :"Tramitação encerrada");
          setEmenta(res.data.DetalheMateria.Materia.DadosBasicosMateria.EmentaMateria);
          setAutor(res.data.DetalheMateria.Materia.Autoria.Autor[0].NomeAutor);
          setUrlFotoAutor(res.data.DetalheMateria.Materia.Autoria.Autor[0].IdentificacaoParlamentar.UrlFotoParlamentar);
          setExibirSpinner(false);
          setValor('');
          setFormValidado(false);
        })
    }
  }

  return (
    <div>
      <h3>Dados abertos SF</h3>
      <Alert variant="danger" show={false}>
        Erro obtendo dados, tente novamente.
      </Alert>
        <Form onSubmit={buscar} noValidate validated={formValidado}>
          <Form.Row>
            <Col sm="5">
              <Form.Control placeholder=""
                            value={valor} 
                            onChange={handleValor} 
                            required />
            </Col>
            <Col sm="2" className="text-center" style={{paddingTop:'5px'}}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>
            <Col sm="5">
              <Button variant="success" type="submit">
                <span className={exibirSpinner ? null : 'hidden'}>
                  <Spinner animation="border" size="sm" />
                </span>
                <span className={exibirSpinner ? 'hidden': null}>
                  Buscar
                </span>
              </Button>
            </Col>
          </Form.Row>
        </Form>
      <div>
        <Card>
          <Card.Body>
            <Card.Title>
              <div class="row">
                <div class="col-sm-6 text-right">
                  <h3>{materia}</h3>
                </div>
                <div class="col-sm-6 text-right">
                  <span className={tramitando === "Em tramitação" ?
                    'bg-success badge text-white' : 'bg-danger badge text-white' }
                    style={{padding:'3px'}}>
                    {tramitando} 
                  </span> 
                </div>
              </div>
            </Card.Title>
            <Card.Text>
              <Jumbotron>
                <div class="row">
                  <div class="col-sm-10">
                    <h5 className="text-center">Ementa</h5>
                    {ementa}
                  </div>
                  <div class="col-sm-2 text-center">
                    <h5>Autor</h5>
                    <div class="row">
                      <div class="col-sm-4">
                      <Image src={urlFotoAutor} width="100%" rounded></Image>
                      </div>
                      <div class="col-sm-8 text-left">
                        {autor}
                      </div>
                    </div>
                  </div>
                </div>
              </Jumbotron>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default DadosAbertosSF;
