import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './dados-abertos-sf.css';
import { Alert, Image } from 'react-bootstrap';
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
        <div className="row">
          <div className="col-sm-6 text-center">
            <h4>{materia}</h4>
          </div>
          <div className="col-sm-6 text-center">
            <span className={tramitando === "Em tramitação" ?
              'bg-success badge text-white mr-4' : 'bg-danger badge text-white' }
              style={{padding:'3px'}}>
              {tramitando} 
            </span> 
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9">
            <div className="row">
              <div className="col-sm-2 text-center">
                Ementa
              </div>
              <div className="col-sm-10">
                {ementa}
              </div>
            </div>
          </div>
          <div className="col-sm-3 text-center">
              <div className="text-center">
                Autor: {autor}
              </div>
              <div className="text-center">
                <Image src={urlFotoAutor} width="25%" rounded></Image>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MateriaSF;