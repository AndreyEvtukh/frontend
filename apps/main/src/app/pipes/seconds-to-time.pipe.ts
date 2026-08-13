import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'secondsToTime',
    standalone: true,
})
export class SecondsToTimePipe implements PipeTransform {

    transform(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    }
}
