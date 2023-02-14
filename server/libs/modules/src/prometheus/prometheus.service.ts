import { Injectable } from '@nestjs/common';
import { Registry, collectDefaultMetrics, Histogram, Gauge, Counter } from 'prom-client';

export type PrometheusHistogram = Histogram<string>;

type MapCounter = {
  [key: string]: Counter<string>;
};

type MapGauge = {
  [key: string]: Gauge<string>;
};

type MapHistogram = {
  [key: string]: Histogram<string>;
};

@Injectable()
export class PrometheusService {
  private readonly serviceTitle: string = 'MathTutorApi';
  private readonly servicePrefix: string = '';

  private registeredCounter: MapCounter = {};
  private registeredGauges: MapGauge = {};
  private registeredMetrics: MapHistogram = {};
  private readonly registry: Registry;

  constructor() {
    this.registry = new Registry();
    this.registry.setDefaultLabels({
      app: this.serviceTitle,
    });
    collectDefaultMetrics({ register: this.registry, prefix: this.servicePrefix });
  }

  get metrics(): Promise<string> {
    return this.registry.metrics();
  }

  registerCounter(name: string, help: string): Counter<string> {
    if (this.registeredCounter[name] === undefined) {
      const counter = new Counter({ name: this.servicePrefix + name, help });
      this.registry.registerMetric(counter);
      this.registeredCounter[name] = counter;
    }
    return this.registeredCounter[name];
  }

  registerGauge(name: string, help: string): Gauge<string> {
    if (this.registeredGauges[name] === undefined) {
      const gauge = new Gauge({ name: this.servicePrefix + name, help });
      this.registry.registerMetric(gauge);
      this.registeredGauges[name] = gauge;
    }
    return this.registeredGauges[name];
  }

  registerMetrics(name: string, help: string, labelNames: string[], buckets: number[]): Histogram<string> {
    if (this.registeredMetrics[name] === undefined) {
      const histogram = new Histogram({ name, help, labelNames, buckets });
      this.registry.registerMetric(histogram);
      this.registeredMetrics[name] = histogram;
    }
    return this.registeredMetrics[name];
  }

  removeSingleMetric(name: string): void {
    return this.registry.removeSingleMetric(name);
  }

  clearMetrics(): void {
    this.registry.resetMetrics();
    return this.registry.clear();
  }
}
