import React from 'react';
import './dados-abertos-sf.css';
import MateriaSF from './materiaSF';
import PesquisaSF from './pesquisaSF';
import { useRoutes } from 'hookrouter';

const routes = {
  '/': () => <PesquisaSF />,
  '/materia/:id': ({id}) => <MateriaSF id={id} />
};

function DadosAbertosSF() {
  return useRoutes(routes);
}

export default DadosAbertosSF;