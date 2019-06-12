import React from 'react'; // Necessário para utilizar o JSX no caso entender o componente app e renderizar todo app dentro da div root
import ReactDOM from 'react-dom'; // Necessário para utilizar o render ( toda interação e funcionalidade do js precisa ser compativel com os browsers, o react Dom é isso )
import App from './App'; // importação do componente app 

import './global.css';

ReactDOM.render(<App />, document.getElementById('root'));