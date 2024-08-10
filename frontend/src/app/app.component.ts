import { Component } from '@angular/core';

export interface ExpandedDetails {
  description: string;
  start: Date;
  end: Date;
  duration: number;
  overlap?: boolean;
}
export interface ProcessedData {
  date: string;
  hoursWorkedInt: number;
  hoursWorked?: string;
  flags: string;
  entries: number;
  expandedDetails: ExpandedDetails[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  summaryData: ProcessedData[] = [];

  onNewSummaryData = (data: ProcessedData[]) => {
    this.summaryData = data;
  };
}
