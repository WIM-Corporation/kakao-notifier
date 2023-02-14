import { HealthIndicatorResult, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { PrometheusService } from '../../prometheus/prometheus.service';
import { HealthIndicator } from '../interfaces/health-indicator.interface';
import { BaseHealthIndicator } from './base-health.indicator';

export class TypeORMHealthIndicator extends BaseHealthIndicator implements HealthIndicator {
  public readonly name: string = 'TypeORM';
  protected readonly help: string = `Status of ${this.name}`;
  protected readonly promClientService: PrometheusService;

  private readonly dbHealthIndicator: TypeOrmHealthIndicator;

  constructor(dbHealthIndicator: TypeOrmHealthIndicator, promClientService: PrometheusService) {
    super();
    this.dbHealthIndicator = dbHealthIndicator;
    this.promClientService = promClientService;
    // this.registerMetrics();
    this.registerGauges();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    const result: Promise<HealthIndicatorResult> = this.dbHealthIndicator.pingCheck('database');
    this.updatePrometheusData(true);
    return result;
  }
}
