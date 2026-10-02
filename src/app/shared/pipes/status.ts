import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(status: string | null | undefined): string {

    if (!status) {
      return 'Unknown';
    }

    switch (status.toLowerCase()) {

      case 'confirmed':
        return 'Confirmed';

      case 'onrequest':
      case 'on request':
        return 'On Request';

      case 'open':
        return 'Open';

      case 'closed':
        return 'Closed';

      default:
        return status;
    }
  }
}