import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header/Header';
import routes from './routes';
import store from './redux/store';
import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Header />
						{routes}
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
