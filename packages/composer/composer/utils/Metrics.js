/**
 * Thin wrapper around @bufferapp/buffer-js-metrics that automatically provides the app environment
 */

import AppStore from '../stores/AppStore';
import { AppEnvironments } from '../AppConstants';
import BufferMetrics, { AppEnvironments as BufferMetricsAppEnvironments }
  from '@bufferapp/buffer-js-metrics';

class Metrics extends BufferMetrics {
  static trackAction(...args) {
    const { appEnvironment, disableTelemetry } = AppStore.getMetaData();

    if (disableTelemetry) return undefined;

    // Map app env constants with BufferMetrics's internal app env constants
    const appEnvironmentsMap = new Map([
      [AppEnvironments.EXTENSION, BufferMetricsAppEnvironments.EXTENSION],
      [AppEnvironments.WEB_DASHBOARD, BufferMetricsAppEnvironments.WEB_DASHBOARD],
      [AppEnvironments.ONBOARDING, BufferMetricsAppEnvironments.ONBOARDING],
    ]);

    const bufferMetricsAppEnv = appEnvironmentsMap.get(appEnvironment);

    return BufferMetrics.trackAction(bufferMetricsAppEnv, ...args);
  }
}

export default Metrics;
