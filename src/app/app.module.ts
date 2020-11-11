import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadButtonModule } from './upload-button/upload-button.module';

// TODO remove this probably


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UploadButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
