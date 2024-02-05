// ANGULAR
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// PRIMENG
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

// INTERFACES
import { Language } from '@language/language.interface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    // ANGULAR
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // PRIME NG
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public formData: FormGroup;
  public languages: Language = <Language>{};
  public key = '';

  constructor(
    private dynamicDialogConfig: DynamicDialogConfig,
    private dynamicDialogRef: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {
    this.formData = this.formBuilder.group({});
  }

  ngOnInit(): void {
    const data = this.dynamicDialogConfig?.data;
    this.languages = data?.languages || <Language>{};
    this.key = data?.key || '';
    this.formData.addControl(
      'key',
      new FormControl(
        {
          value: this.key,
          disabled: this.key ? true : false,
        },
        Validators.required
      )
    );
    this.languages.codes.forEach(code => {
      let val = '';
      const key = this.languages?.keys?.get(this.key);
      if (key && key.has(code)) {
        val = key.get(code) || '';
      }
      this.formData.addControl(
        code,
        new FormControl(
          {
            value: val,
            disabled: false,
          },
          Validators.nullValidator
        )
      );
    });
  }

  confirm(): void {
    if (this.languages?.keys?.has(this.key)) {
      const key = this.languages.keys.get(this.key);
      this.languages.codes.forEach(code => {
        const val = this.formData.value[code];
        key?.set(code, val);
      });
    } else {
      const key = this.formData.value['key'];
      const keyCode = new Map();
      this.languages.codes.forEach(code => {
        const val = this.formData.value[code];
        if (val) {
          keyCode.set(code, val);
        }
      });
      if (!this.languages.keys) {
        this.languages.keys = new Map();
      }
      this.languages.keys.set(key, keyCode);
    }
    this.languages.modify = true;
    this.dynamicDialogRef.close(this.languages);
  }
  cancel(): void {
    this.dynamicDialogRef.close(this.languages);
  }
}
