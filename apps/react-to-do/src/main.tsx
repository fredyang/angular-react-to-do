import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { worker } from './app/fakeBackend';

const baseUrl = import.meta.env.BASE_URL;
const mockServiceWorkerUrl = new URL('mockServiceWorker.js', document.baseURI).toString();

worker
  .start({ serviceWorker: { url: mockServiceWorkerUrl } })
  .then(() => {
    console.log('MSW worker started');
  })
  .catch((error) => {
    console.error('MSW worker failed to start', error);
  });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
