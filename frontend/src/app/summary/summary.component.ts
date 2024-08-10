import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProcessedData } from '../app.component';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    MatTableModule,
    MatIcon,
    MatCard,
    MatCardContent,
    MatExpansionModule,
    NgIf,
    CommonModule,
    BrowserAnimationsModule,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.less',
  animations: [
    trigger('detailsExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SummaryComponent {
  @Input() summaryData: ProcessedData[] = [];

  columns = {
    date: 'Date',
    hoursWorked: 'Hours Worked',
    entries: 'Entries',
    flags: 'Flags',
  } as { [key: string]: string };
  columnsArray = Object.keys(this.columns);
  expandedElement?: ProcessedData = undefined;

  detailsColumnsArray = ['description', 'start', 'end', 'duration'];
  formatDuration(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (!hours) {
      return `${minutes}m`;
    }

    if (!minutes) {
      return `${hours}h`;
    }

    return `${hours}h:${minutes}m`;
  }
}
