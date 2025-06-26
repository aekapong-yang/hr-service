import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import dayjs from 'dayjs';

@Injectable()
export class TransformDateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.formatDates(data)),
    );
  }

  private formatDates(value: any): any {
    if (value instanceof Date) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    }
    
    if (Array.isArray(value)) {
      return value.map((item) => this.formatDates(item));
    }
    
    if (value !== null && typeof value === 'object') {
      for (const key in value) {
        value[key] = this.formatDates(value[key]);
      }
    }
    
    return value;
  }
}
