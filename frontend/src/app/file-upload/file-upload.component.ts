import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import * as Papa from 'papaparse';
import { ExpandedDetails, ProcessedData } from '../app.component';
import moment from 'moment';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatProgressBar, FileUploadComponent, NgIf],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.less',
})
export class FileUploadComponent {
  @Input()
  requiredFileType?: string = undefined;

  @Output()
  summaryData: ProcessedData[] = [];

  @Output()
  newSummaryDataEvent = new EventEmitter<ProcessedData[]>();

  fileName = '';
  file?: File = undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.file = file;
    }
  }

  parseCSVData(data: string[][]): ExpandedDetails[] {
    return data.map((row) => {
      // CSV format: description, start, end
      const [description, start, end] = row;
      const startDate = new Date(start);
      const endDate = new Date(end);

      return {
        description,
        start: startDate,
        end: endDate,
        duration: (endDate.getTime() - startDate.getTime()) / (60 * 60 * 1000), // duration in hours
      };
    });
  }

  validateAndSummarize(data: string[][]): ProcessedData[] {
    const dataEntries = this.parseCSVData(data);
    const summaryMap = new Map<string, ProcessedData>();

    dataEntries.forEach((entry) => {
      const date = entry.start.toISOString().split('T')[0];
      if (!summaryMap.has(date)) {
        summaryMap.set(date, {
          date: moment(date).format('DD-MM-YYYY'),
          hoursWorkedInt: 0,
          entries: 0,
          flags: '',
          expandedDetails: [],
        });
      }

      const summary = summaryMap.get(date);
      if (summary) {
        summary.hoursWorkedInt += entry.duration;
        summary.entries += 1;
        summary.expandedDetails.push(entry);
      }
    });

    const summaryData = Array.from(summaryMap.values());

    summaryData.forEach((summary) => {
      summary.hoursWorked = this.formatDuration(summary.hoursWorkedInt);
      summary.flags = this.getFlags(
        summary.expandedDetails,
        summary.hoursWorkedInt
      );
    });

    return summaryData;
  }

  formatDuration(hours: number): string {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);

    return `${h}h${m > 0 ? `${m}m` : ''}`;
  }

  getFlags(
    entries: ProcessedData['expandedDetails'],
    hoursWorkedInt: number
  ): string {
    let flags: string[] = [];
    let hasOverlap = false;
    const hasOvertime = hoursWorkedInt > 8;

    entries.forEach((entry) => {
      if (this.checkOverlap(entry, entries)) {
        hasOverlap = true;
      }
    });

    if (hasOverlap) {
      flags.push('Overlapping');
    }

    if (hasOvertime) {
      flags.push('More than 8 hours');
    }

    return flags.join(', ');
  }

  checkOverlap(entry: ExpandedDetails, entries: ExpandedDetails[]): boolean {
    let overlapFound = false;

    entries.forEach((otherEntry) => {
      if (otherEntry !== entry && this.entriesOverlap(entry, otherEntry)) {
        overlapFound = true;
      }
    });

    return overlapFound;
  }

  checkOvertime(entry: ExpandedDetails): boolean {
    const start = moment(entry.start).unix();
    const end = moment(entry.end).unix();
    const duration = (end - start) / (60 * 60); // Convert milliseconds to hours

    return duration > 8;
  }

  entriesOverlap(entry1: ExpandedDetails, entry2: ExpandedDetails): boolean {
    const start1 = moment(entry1.start).unix();
    const end1 = moment(entry1.end).unix();
    const start2 = moment(entry2.start).unix();
    const end2 = moment(entry2.end).unix();

    // Checks if entry1 starts before entry2 ends and entry1 ends after entry2 starts
    return start1 < end2 && end1 > start2;
  }

  onProcessFile() {
    if (this.file) {
      Papa.parse(this.file, {
        complete: (result: { data: string[][] }) => {
          // Process the CSV data
          const data = this.validateAndSummarize(result.data);
          this.newSummaryDataEvent.emit(data);
        },
      });
    }
  }
}
