import { Injectable } from '@angular/core'; 

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public log(message: string) {
    window.logger.save(`[${new Date().toISOString()}] ${message}`);
  }
}
