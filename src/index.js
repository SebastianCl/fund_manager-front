import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './adapters/ui/containers/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import userRepository from './ports/userRepository';
import userRepositoryAPI from './adapters/api/userRepositoryAPI';
import transactionRepository from './ports/transactionRepository';
import transactionRepositoryAPI from './adapters/api/transactionRepositoryAPI';
import fundRepository from './ports/fundRepository';
import fundRepositoryAPI from './adapters/api/fundRepositoryAPI';


// Inyectar la implementación del repositorio
userRepository.getUserById = userRepositoryAPI.getUserById;
transactionRepository.getTransactions = transactionRepositoryAPI.getTransactions;
transactionRepository.postTransactionJoin = transactionRepositoryAPI.postTransactionJoin;
transactionRepository.postTransactionCancel = transactionRepositoryAPI.postTransactionCancel;
fundRepository.getAllFunds = fundRepositoryAPI.getAllFunds;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();