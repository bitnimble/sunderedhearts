import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createApp } from './create';
import './defaults.css';
import { PrismicProvider, PrismicToolbar } from '@prismicio/react';
import { prismicClient, prismicRepo } from 'pages/sundered_hearts/prismic/install';

const App = createApp();

ReactDOM.render((
  <PrismicProvider client={prismicClient}>
    <App />
    <PrismicToolbar repositoryName={prismicRepo} />
  </PrismicProvider>
), document.getElementById('app'));
