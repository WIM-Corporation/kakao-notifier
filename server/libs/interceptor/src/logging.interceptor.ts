import { CustomLogger } from '@libs/middleware';
import { PrometheusService } from '@libs/modules/prometheus';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly slowExecute: number = 1000 as const;

  constructor(private readonly logger: CustomLogger, private readonly prometheusService: PrometheusService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const executeTime = Date.now() - now;
        this.isSlow(executeTime) ? this.logger.warn(`Execute time: ${executeTime}ms`, 'SLOW') : this.logger.log(`Execute time: ${executeTime}ms`);
      }),
      catchError((error) => {
        const executeTime = Date.now() - now;
        this.isSlow(executeTime) ? this.logger.error(`Execute time: ${executeTime}ms`, 'SLOW') : this.logger.error(`Execute time: ${executeTime}ms`);
        return throwError(() => error);
      }),
    );
  }

  private isSlow(executeTime: number): boolean {
    return executeTime > this.slowExecute;
  }
}
