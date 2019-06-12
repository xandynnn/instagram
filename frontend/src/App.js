import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Header from './Components/Header';

// Componente pode ser escrito com classe ou como função ... nesse caso é uma função
export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes />
		</BrowserRouter>
	);
}