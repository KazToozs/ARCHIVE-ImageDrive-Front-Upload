import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  UPLOAD_URL = 'http://localhost:8080/upload';

  constructor(private httpClient: HttpClient) { }

  upload(formData) {

    return this.httpClient.post<any>(this.UPLOAD_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
