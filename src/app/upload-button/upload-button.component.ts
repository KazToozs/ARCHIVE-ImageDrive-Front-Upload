import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService } from 'src/services/upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadSettings } from 'aws-sdk/clients/quicksight';

// TODO not ideal?
type FileToUpload = { data: File, inProgress: boolean, progress: number };

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {
  // fileToUpload: FileToUpload; // TODO not ideal?

  @Input() progress;

  private fileToUpload: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.fileToUpload = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>, uploadService: UploadService) {}



  ngOnInit(): void {
  }

  uploadFile(file: FileToUpload) {
    // TODO remove
    console.log('Filename: ' + file.data.name);
    console.log('Type: ' + file.data.type);
    console.log('Size: ' + file.data.size + ' bytes');

    const formData = new FormData();
    formData.append('uploadFile', file.data, file.data.name);
    file.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log('Server returned: ' + event.body);
        }
      });
  }

  onFileChanged(event) {
    this.fileToUpload = null;

    for (const file of event.target.files) {
      if ((file.type === 'image/jpeg' || file.type === 'image/png')
        && file.size <= 500000) {
        // confirm file recieved
        this.fileToUpload = { data: file, inProgress: false, progress: 0 };
      }
      else {
        // TODO state error in size or file type
      }
    }
  }


}
