// ANGULAR
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// PRIME NG MODULES
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

// COMPONENTS
import { UploadComponent } from './components/upload/upload.component';
import { EditComponent } from './components/edit/edit.component';

// INTERFACES
import { Language } from './language.interface';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [
    // ANGULAR
    CommonModule,
    HttpClientModule,
    // PRIMENG
    ButtonModule,
    TooltipModule,
    TableModule,
    MessagesModule,
    MessageModule,
    DynamicDialogModule,
    ConfirmDialogModule,
  ],
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  providers: [DialogService, ConfirmationService],
})
export default class LanguageComponent {
  @ViewChild('keysTable') keysTable: ElementRef | undefined;
  public languages: Language = <Language>{};
  public keys: any[] = [];
  public keyErrors: any[] = [];

  constructor(
    public dialogService: DialogService,
    private renderer: Renderer2,
    private confirmationService: ConfirmationService
  ) {}

  showUploadFiles(): void {
    const diag = this.dialogService.open(UploadComponent, {
      header: 'Cargar Idiomas',
      width: '90%',
      closable: true,
      data: this.languages,
    });
    diag.onClose.subscribe(e => {
      this.updateView(e);
    });
  }

  checkErrors(): void {
    this.keyErrors = [];
    this.keys.forEach(key => {
      const itemKey = this.languages.keys.get(key);
      const exist = this.languages.codes.filter(
        code => itemKey && ![...itemKey.keys()].includes(code)
      );
      if (exist.length > 0) {
        const msgError = 'No tiene los siguientes idiomas: ' + exist.toString();
        this.keyErrors.push({ key: key, msg: msgError, link: key.replaceAll('.', '__') });
        itemKey?.set('error', msgError);
      } else {
        itemKey?.delete('error');
      }
    });
  }

  getKey(key: string, code: string): string {
    if (this.languages.keys.has(key)) {
      const itemKey = this.languages.keys.get(key);
      if (itemKey?.has(code)) {
        return itemKey?.get(code) || '';
      }
    }
    return '';
  }

  goToRow(key: string): void {
    const ele = this.renderer.selectRootElement('#row_' + key.replaceAll('.', '__'));
    if (ele) {
      ele.scrollIntoView();
    }
  }

  showKey(key?: string): void {
    const diag = this.dialogService.open(EditComponent, {
      header: 'Editar clave',
      width: '90%',
      closable: true,
      data: {
        languages: this.languages,
        key: key,
      },
    });
    diag.onClose.subscribe(e => {
      this.updateView(e);
    });
  }

  updateView(e: Language): void {
    this.languages = e ? e : this.languages;
    this.keys = Array.from(this.languages?.keys.keys());
    this.keys.sort((a, b) => a.localeCompare(b));
    this.checkErrors();
  }

  removeKey(key: string): void {
    this.confirmationService.confirm({
      message: 'Se va a borrar la clave: <b>' + key + '</b>. ¿Desea continuar?',
      accept: () => {
        if (this.languages.keys.has(key)) {
          this.languages.keys.delete(key);
          this.languages.modify = true;
          this.updateView(this.languages);
        }
        //Actual logic to perform a confirmation
      },
    });
  }

  downloadFile(code?: string): void {
    const file: any = {};
    const codes = this.languages.codes.filter(cod => !code || cod === code);
    codes.forEach(cod => {
      this.keys.forEach(key => {
        const langKey = this.languages.keys.get(key);
        if (langKey && langKey.has(cod)) {
          file[key] = langKey.get(cod);
        }
      });
      const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = cod + '.json';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
