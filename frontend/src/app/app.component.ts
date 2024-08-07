import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SummaryComponent } from './summary/summary.component';

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
  standalone: true,
  imports: [RouterOutlet, FileUploadComponent, SummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'angusheet';

  summaryData: ProcessedData[] = [];

  onNewSummaryData = (data: ProcessedData[]) => {
    this.summaryData = data;
  };
}
