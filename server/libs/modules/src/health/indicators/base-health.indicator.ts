import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { Logger } from '@nestjs/common';
import { Gauge } from 'prom-client';
import { PrometheusHistogram, PrometheusService } from '../../prometheus/prometheus.service';

// Design Pattern: Template Method

const TAG = 'HealthCheck';

export abstract class BaseHealthIndicator extends HealthIndicator {
  abstract name: string;
  callMetrics: any;

  protected abstract help: string;
  protected abstract readonly promClientService: PrometheusService | undefined;
  protected readonly labelNames: string[] = ['status'];
  protected readonly buckets: number[] = [1];
  protected stateIsConnected: boolean = false;

  private metricsRegistered: boolean = false;
  private gaugesRegistered: boolean = false;
  private gauge: Gauge<string> | undefined;

  protected registerMetrics(): void {
    if (this.promClientService) {
      Logger.log(`Register metrics histogram for: ${this.name}`, TAG, true);
      this.metricsRegistered = true;
      const histogram: PrometheusHistogram = this.promClientService.registerMetrics(this.name, this.help, this.labelNames, this.buckets);
      this.callMetrics = histogram.startTimer();
    }
  }

  protected registerGauges(): void {
    if (this.promClientService) {
      Logger.log(`Register metrics gauge for: ${this.name}`, TAG, true);
      this.gaugesRegistered = true;
      this.gauge = this.promClientService.registerGauge(this.name, this.help);
    }
  }

  protected isDefined(value: string | undefined): boolean {
    return !!value;
  }

  updatePrometheusData(isConnected: boolean): void {
    if (this.stateIsConnected !== isConnected) {
      if (isConnected) {
        Logger.log(`${this.name} is available`, TAG, true);
      }

      this.stateIsConnected = isConnected;

      if (this.metricsRegistered) {
        this.callMetrics({ status: this.stateIsConnected ? 1 : 0 });
      }

      if (this.gaugesRegistered) {
        this.gauge?.set(this.stateIsConnected ? 1 : 0);
      }
    }
  }

  abstract isHealthy(): Promise<HealthIndicatorResult>;

  reportUnhealthy(): HealthIndicatorResult {
    this.updatePrometheusData(false);
    return this.getStatus(this.name, false);
  }

  get customMetricsRegistered(): boolean {
    return this.metricsRegistered;
  }

  get customGaugesRegistered(): boolean {
    return this.gaugesRegistered;
  }
}
