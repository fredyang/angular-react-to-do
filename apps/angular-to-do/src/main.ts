import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { worker } from './app/fakeBackend';

const mockServiceWorkerUrl = new URL('mockServiceWorker.js', document.baseURI).toString();

worker.start({ serviceWorker: { url: mockServiceWorkerUrl } }).then(() => {
  console.log('MSW worker started');
  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
});
