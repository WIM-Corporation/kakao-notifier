import { HealthIndicatorResult, HttpHealthIndicator } from '@nestjs/terminus';
import { PrometheusService } from '../../prometheus/prometheus.service';
import { HealthIndicator } from '../interfaces/health-indicator.interface';
import { BaseHealthIndicator } from './base-health.indicator';

export class NestjsHealthIndicator extends BaseHealthIndicator implements HealthIndicator {
  public readonly name: string = 'nestjs';
  protected readonly help: string = `Status of ${this.name}`;
  protected readonly promClientService: PrometheusService;

  private readonly url: string;
  private readonly httpHealthIndicator: HttpHealthIndicator;

  constructor(httpHealthIndicator: HttpHealthIndicator, url: string, promClientService: PrometheusService) {
    super();
    this.httpHealthIndicator = httpHealthIndicator;
    this.promClientService = promClientService;
    this.url = url;
    // this.registerMetrics();
    this.registerGauges();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    const result: Promise<HealthIndicatorResult> = this.httpHealthIndicator.pingCheck(this.name, this.url);
    this.updatePrometheusData(true);
    return result;
  }
}
