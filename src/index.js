import React from 'react';
import ReactDOM from 'react-dom';
import App from './adapters/ui/containers/App';
import userRepository from './ports/userRepository';
import userRepositoryAPI from './adapters/api/userRepositoryAPI';
import transactionRepository from './ports/transactionRepository';
import transactionRepositoryAPI from './adapters/api/transactionRepositoryAPI';
import './index.css';

// Inyectar la implementación del repositorio
userRepository.getUserById = userRepositoryAPI.getUserById;
transactionRepository.getTransactions = transactionRepositoryAPI.getTransactions;

ReactDOM.render(<App />, document.getElementById('root'));
