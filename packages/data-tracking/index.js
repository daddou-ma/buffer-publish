import attachToConsole from './attach-to-console';

// Add the console command to enable logging of tracked actions
// > showTracking();
attachToConsole();

export trackAction from './track-action';
export { logTrackingMiddleware, bufferMetricsMiddleware } from './middleware';
