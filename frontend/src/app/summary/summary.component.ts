import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableModule } from '@angular/material/table';


export interface DataEntry {
  date: string;
  hoursWorked: number;
  noOfEntries: number;
  flags: string;
}

const MOCK_DATA: DataEntry[] = [
  {date: '2023-01-20', hoursWorked: 1, noOfEntries: 1, flags: ''},
  {date: '2023-01-21', hoursWorked: 2, noOfEntries: 2, flags: ''},
  {date: '2023-01-22', hoursWorked: 3, noOfEntries: 3, flags: ''},
  {date: '2023-01-23', hoursWorked: 4, noOfEntries: 4, flags: ''},
  {date: '2023-01-24', hoursWorked: 5, noOfEntries: 5, flags: ''},
  {date: '2023-01-25', hoursWorked: 6, noOfEntries: 6, flags: ''},
  {date: '2023-01-26', hoursWorked: 7, noOfEntries: 7, flags: ''},
  {date: '2023-01-27', hoursWorked: 8, noOfEntries: 8, flags: ''},
  {date: '2023-01-28', hoursWorked: 9, noOfEntries: 9, flags: ''},
  {date: '2023-01-29', hoursWorked: 10, noOfEntries: 10, flags: ''},
];

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.less'
})
export class SummaryComponent {
  dataSource = MOCK_DATA;
  displayedColumns: string[] = ['date', 'hoursWorked', 'noOfEntries', 'flags'];
}
