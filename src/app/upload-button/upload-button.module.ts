import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UploadButtonComponent } from './upload-button.component';
import { MatInputModule  } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { UploadService } from 'src/services/upload.service';



@NgModule({
  declarations: [UploadButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
  ],
  exports: [
    UploadButtonComponent
  ]
})
export class UploadButtonModule { }
