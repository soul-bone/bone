import { Component } from '@angular/core';

import { MetadataService } from 'ng2-metadata';

@Component({
  selector: 'app-bone',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(private metadataService: MetadataService) { }
 
}
