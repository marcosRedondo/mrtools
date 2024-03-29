// ANGULAR
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// PRIMENG
import { FileUploadModule } from 'primeng/fileupload';
import { DynamicDialogModule, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

// INTERFACES
import { Language } from '@language/language.interface';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FileUploadModule, DynamicDialogModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  public languages: Language = <Language>{};
  public files: File[] = [];
  private codes: string[] = [];
  private keys: Map<string, Map<string, string>> = new Map();

  constructor(
    private dynamicDialogConfig: DynamicDialogConfig,
    private dynamicDialogRef: DynamicDialogRef
  ) {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.languages = this.dynamicDialogConfig?.data || <Language>{};
    this.files = this.languages?.files || [];
    this.codes = this.languages?.codes || [];
  }

  /**
   * Upload files
   * @param event event with files
   */
  uploadFiles(event: any): void {
    this.files = event?.currentFiles || [];
    this.files.forEach((file: File) => {
      this.readFiles(file);
    });
  }

  /**
   * Load files
   * @param file data for load
   */
  readFiles(file: File) {
    const fr = new FileReader();
    let lang: string = file?.name;
    lang = lang.toLocaleLowerCase();
    lang = lang.replace('.json', '');
    if (!this.codes.includes(lang)) {
      this.codes.push(lang);
    }
    fr.addEventListener('load', e => {
      if (e?.target?.result) {
        this.mapFileToArray(JSON.parse(e?.target?.result.toString()), lang);
      }
    });
    fr.readAsText(file);
  }

  /**
   * Clean data on remove file
   * @param event remove
   */
  removeFiles(event: any): void {
    let code: string = event?.file.name;
    code = code.toLocaleLowerCase();
    code = code.replace('.json', '');
    this.codes = this.codes.filter(item => item != code);
    this.files = this.files.filter(item => item.name !== event?.file?.name);
    this.keys.forEach(key => {
      if (key.has(code)) {
        key.delete(code);
      }
    });
  }

  /**
   * map file for array
   * @param file to map
   * @param code language
   */
  mapFileToArray(file: any, code: string) {
    Object.keys(file).forEach(key => {
      if (this.keys.has(key)) {
        const existingKey = this.keys.get(key);
        existingKey?.set(code, file[key]);
      } else {
        const langMap = new Map();
        langMap.set(code, file[key]);
        this.keys.set(key, langMap);
      }
    });
  }

  /**
   * Confirm save files
   */
  confirm(): void {
    this.languages.files = this.files;
    this.languages.codes = this.codes;
    this.languages.keys = this.keys;
    this.dynamicDialogRef.close(this.languages);
  }

  /**
   * Cancel files load
   */
  cancel(): void {
    this.dynamicDialogRef.close();
  }
}
