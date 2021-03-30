import React from 'react';
import ReactDOM from 'react-dom';
import DadosAbertosSF from './dados-abertos-sf';

it('renderizar sem erro', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DadosAbertosSF />, div);
  ReactDOM.unmountComponentAtNode(div);
});