import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
  private UIMessageSubject: BehaviorSubject<string> = new BehaviorSubject('');

  public readonly UIMessage: Observable<string> = this.UIMessageSubject.asObservable();

  description = '';
  fileToUpload: FileToUpload; // TODO not ideal?

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
  }

  uploadFile(file: FileToUpload) {
    if (!this.description) {
      console.log('blahallaje')
      this.UIMessageSubject.next('Please set a description');
      return;
    }
    // TODO remove
    console.log('Filename: ' + file.data.name);
    console.log('Type: ' + file.data.type);
    console.log('Size: ' + file.data.size + ' bytes');
    console.log('Description: ' + this.description)

    const formData = new FormData();
    formData.append('uploadFile', file.data, file.data.name);
    formData.append('description', this.description);
    file.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        this.setUIMessage('Uploading...');
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.setUIMessage(`An error occured with the upload: ${error.status}: ${error.statusText}`);
        file.inProgress = false;
        return of(`${file.data.name} upload failed: ${error.error}`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event)
          this.setUIMessage('Upload succeeded');
          // TODO delete this
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
        this.setUIMessage('File ready to upload');
        this.fileToUpload = { data: file, inProgress: false, progress: 0 };
      }
      else {
        // TODO state error in size or file type
        this.setUIMessage('Please upload a JPEG/PNG below 500Kb');
      }
    }
  }

  setUIMessage(str: string) {
    this.UIMessageSubject.next(str);
  }
}
