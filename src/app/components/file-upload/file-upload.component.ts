import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ProcessedData } from '../app/app.component';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

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

  file?: File = undefined;
  uploadResult = '';

  constructor(private fileUploadService: FileUploadService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }

  onUpload(): void {
    if (this.file) {
      this.fileUploadService.uploadFile(this.file).subscribe({
        next: (response: ProcessedData[]) => {
          this.newSummaryDataEvent.emit(response);
          this.uploadResult = 'Upload successful!';
        },
        error: (error) => {
          this.uploadResult = `Upload failed: ${error}`;
        },
      });
    } else {
      this.uploadResult = 'No file selected.';
    }
  }
}
