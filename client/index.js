import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';

const root = document.getElementById('react-container');

hydrate(<App />, root);
