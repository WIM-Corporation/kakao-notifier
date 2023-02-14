import { Module } from '@nestjs/common';
import { PrometheusModule } from '@libs/modules/prometheus';
import { HealthModule } from '@libs/modules/health';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [PrometheusModule, HealthModule],
  providers: [MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}
