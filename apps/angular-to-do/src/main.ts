import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { worker } from './app/msw-worker';

worker.start().then(() => {
	console.log('MSW worker started');
	bootstrapApplication(App, appConfig).catch((err) => console.error(err));
});
