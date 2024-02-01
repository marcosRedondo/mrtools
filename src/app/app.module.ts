// Angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NG-PRIME
import { TabMenuModule } from 'primeng/tabmenu';

// Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // => ANGULAR
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // <= ANGULAR
    // => PRIME NG
    TabMenuModule,
    // <= PRIME NG
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
