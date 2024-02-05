// ANGULAR
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

//PRIMENG
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';

// CONSTANTS
import { CODES } from '@language/codes.constants';

@Component({
  selector: 'app-add-code',
  standalone: true,
  imports: [
    // ANGULAR
    CommonModule,
    FormsModule,
    DragDropModule,
    // PRIME NG
    ButtonModule,
    PickListModule,
  ],
  templateUrl: './add-code.component.html',
  styleUrls: ['./add-code.component.scss'],
})
export class AddCodeComponent implements OnInit {
  public listCodes: Array<string> = [];
  public selectedCodes: Array<string> = [];

  constructor(
    private dynamicDialogConfig: DynamicDialogConfig,
    private dynamicDialogRef: DynamicDialogRef
  ) {}
  ngOnInit(): void {
    this.listCodes = CODES;
    this.selectedCodes = Object.assign([], this.dynamicDialogConfig?.data?.languages?.codes) || [];
  }

  confirm() {
    const languages = this.dynamicDialogConfig?.data?.languages;
    languages.codes = Object.assign([], this.selectedCodes);
    this.dynamicDialogRef.close(languages);
  }

  cancel() {
    this.dynamicDialogRef.close(this.dynamicDialogConfig?.data?.languages);
  }
}
