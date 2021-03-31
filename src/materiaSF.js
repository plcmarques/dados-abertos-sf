import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './dados-abertos-sf.css';
import { Alert, Card, Image } from 'react-bootstrap';
import axios from 'axios';

function MateriaSF(props) {

  const FIXER_URL = 'https://legis.senado.leg.br/dadosabertos/materia/';

  const [materia, setMateria] = useState('');
  const [tramitando,setTramitando] = useState('');
  const [ementa, setEmenta] = useState('');
  const [autor, setAutor] = useState('');
  const [urlFotoAutor, setUrlFotoAutor] = useState('');
  const [buscarDados, setBuscarDados] = useState(true);

  useEffect(() => {
    function buscar(id){
        axios({method: 'get', url: FIXER_URL + id,responseType: 'json'})
          .then(res => {
            setMateria(res.data.DetalheMateria.Materia.IdentificacaoMateria.DescricaoIdentificacaoMateria);
            setTramitando(res.data.DetalheMateria.Materia.IdentificacaoMateria.IndicadorTramitando === "Sim" ? "Em tramitação" :"Tramitação encerrada");
            setEmenta(res.data.DetalheMateria.Materia.DadosBasicosMateria.EmentaMateria);
            setAutor(res.data.DetalheMateria.Materia.Autoria.Autor[0].NomeAutor);
            setUrlFotoAutor(res.data.DetalheMateria.Materia.Autoria.Autor[0].IdentificacaoParlamentar.UrlFotoParlamentar);
          })
    }
    if(buscarDados){
      buscar(parseInt(props.id));
      setBuscarDados(false);
    }
  }, [buscarDados, props]);

  MateriaSF.propTypes = {
    id: PropTypes.number.isRequired
  }

  return (
    <div>
      <h3 className="text-center">Dados abertos Senado Federal</h3>
      <Alert variant="danger" show={false}>
        Erro obtendo dados, tente novamente.
      </Alert>
      <div>
        <Card>
          <Card.Body>
            <Card.Title>
              <div class="row">
                <div class="col-sm-6 text-right">
                  <h4>{materia}</h4>
                </div>
                <div class="col-sm-6 text-right">
                  <span className={tramitando === "Em tramitação" ?
                    'bg-success badge text-white' : 'bg-danger badge text-white' }
                    style={{padding:'3px', margin:'5px'}}>
                    {tramitando} 
                  </span> 
                </div>
              </div>
            </Card.Title>
            <Card.Text>
              <div class="row">
                <div class="col-sm-10">
                  <div class="row">
                    <div class="col-sm-2">
                      <h5 className="text-center">Ementa</h5>
                    </div>
                    <div class="col-sm-10">
                      {ementa}
                    </div>
                  </div>
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
            </Card.Text>
            <Card.Footer>
              
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default MateriaSF;