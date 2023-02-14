import { Redis } from 'ioredis';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { PrometheusService } from '../../prometheus/prometheus.service';
import { HealthIndicator } from '../interfaces/health-indicator.interface';
import { BaseHealthIndicator } from './base-health.indicator';

export class RedisHealthIndicator extends BaseHealthIndicator implements HealthIndicator {
  public readonly name: string = 'redis';
  protected readonly help: string = `Status of ${this.name}`;

  constructor(private readonly client: Redis, protected readonly promClientService: PrometheusService) {
    super();
    this.promClientService = promClientService;
    // this.registerMetrics();
    this.registerGauges();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = !!(await this.client.ping());
    this.updatePrometheusData(isHealthy);
    return this.getStatus(this.name, isHealthy);
  }
}
