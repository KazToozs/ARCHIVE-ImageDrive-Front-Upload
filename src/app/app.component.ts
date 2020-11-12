import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'upload-app';

  signup = new FormGroup({
    description: new FormControl(null, Validators.required),
    image: new FormControl(null, [Validators.required, requiredFileType('png')])
  });
}
