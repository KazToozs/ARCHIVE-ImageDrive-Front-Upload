import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  UPLOAD_URL = 'http://localhost:8080/upload';

  constructor(private httpClient: HttpClient) { }

  upload(formData: FormData) {
    const headers = new HttpHeaders();
    // headers.append('Content-Type', 'undefined');

    headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    formData.forEach((value, key) => {
      console.log(key + ', ' + value);
    })
    return this.httpClient.post(this.UPLOAD_URL, formData, {
      reportProgress: true,
      observe: 'events',
      headers,
    });
  }

}
