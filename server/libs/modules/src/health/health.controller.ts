import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { Public } from '@libs/decorator';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Public()
  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult | undefined> {
    const healthCheckResult: HealthCheckResult | undefined = await this.healthService.check();
    const infos = { ...healthCheckResult?.info };
    Object.keys(infos).forEach((key) => {
      if (infos[key].status === 'down') {
        throw new ServiceUnavailableException(healthCheckResult);
      }
    });
    return healthCheckResult;
  }
}
