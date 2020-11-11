import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/services/upload.service';


@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {

  selectedFiles: File[];

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.selectedFiles = event.target.files;

    for (const file of this.selectedFiles) {
      console.log('Filename: ' + file.name);
      console.log('Type: ' + file.type);
      console.log('Size: ' + file.size + ' bytes');

      if (file.type === 'image/jpeg' || file.type === 'image/png'
        && file.size <= 500000) {
        // confirm file recieved
        return;
      }
      // TODO handle error cleanly
      console.log('error in file type')
      this.selectedFiles = [];
    }

  }

  onUpload() {
    this.uploadService.onUpload(this.selectedFiles,);
  }

}
