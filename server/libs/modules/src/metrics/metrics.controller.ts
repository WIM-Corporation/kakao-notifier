import { Controller, Get, Res } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Get()
  async metrics(): Promise<string> {
    return this.metricsService.metrics();
  }
}
