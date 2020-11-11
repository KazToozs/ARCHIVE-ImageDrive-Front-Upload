import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploadUrl = 'http://localhost:8080/upload';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  onUpload(files) {
    // upload code goes here
    // Store image in S3

    if (files.length > 0) {
        const file: File = files[0];
        const formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        console.log(formData)
        console.log(file)
        this.http.post(this.uploadUrl, formData, {headers})
            .pipe(
              tap (
                // Log the result or error
                data => console.log('You received data: ' + data),
                catchError(this.handleError)
             )
            )
    }



    // console.log('attempting upload');
    // console.log(files);
    // const ret = this.http.post<File>(this.uploadUrl, files, httpOptions)
    //     .pipe(

    //     );

    // ret.subscribe((res) => {console.log(res); });
    // Store information in RDS

  }

}
