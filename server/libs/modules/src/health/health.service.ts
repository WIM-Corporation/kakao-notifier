import { Injectable, Logger } from '@nestjs/common';
import { HealthCheckResult, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { PrometheusService } from '../prometheus';
import { RedisClient } from '../redis';
import { HealthIndicator } from './interfaces/health-indicator.interface';
import { NestjsHealthIndicator, RedisHealthIndicator, TypeORMHealthIndicator } from './indicators';

@Injectable()
export class HealthService {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private promClientService: PrometheusService,
  ) // private redisClient: RedisClient,
  {
    this.listOfThingsToMonitor = [
      new NestjsHealthIndicator(this.http, 'https://1.1.1.1', this.promClientService),
      new TypeORMHealthIndicator(this.db, this.promClientService),
      // new RedisHealthIndicator(this.redisClient, this.promClientService),
    ];
  }

  async check(): Promise<HealthCheckResult | undefined> {
    return this.health.check(
      this.listOfThingsToMonitor.map((indicator: HealthIndicator) => async () => {
        try {
          return indicator.isHealthy();
        } catch (e) {
          Logger.warn(e);
          return indicator.reportUnhealthy();
        }
      }),
    );
  }
}
