import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService } from 'src/services/upload.service';

// TODO not ideal?
type FileToUpload = { data: File, inProgress: boolean, progress: number };

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {

  filesToUpload: FileToUpload[] = []; // TODO not ideal?

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  private uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
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
          console.log(event.body);
        }
      });
  }

  uploadFiles() {
    this.filesToUpload.forEach(file => {
      console.log('Filename: ' + file.data.name);
      console.log('Type: ' + file.data.type);
      console.log('Size: ' + file.data.size + ' bytes');
      return this.uploadFile(file);
    });
  }


  onFileChanged(event) {
    this.filesToUpload = [];

    for (const file of event.target.files) {
      if ((file.type === 'image/jpeg' || file.type === 'image/png')
        && file.size <= 500000) {
        // confirm file recieved
        this.filesToUpload.push({ data: file, inProgress: false, progress: 0 });
      }
      else {
        // TODO state error in size or file type
      }
    }
  }


}
