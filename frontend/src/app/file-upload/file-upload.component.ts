import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as Papa from 'papaparse';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatCardModule, FileUploadComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.less'
})
export class FileUploadComponent {
  csvData: any[] = [];
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    Papa.parse(file, {
      complete: (result) => {
        this.csvData = result.data;
      }
    });
  }

  processFile() {
    // Process the CSV data

    // Validate and summarize data
    // Display the summary table with expandable rows
  }
}
