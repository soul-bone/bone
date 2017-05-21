import { Component, OnInit } from '@angular/core';

import { MetadataService } from 'ng2-metadata';

@Component({
  selector: 'app-bone',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  constructor(private metadataService: MetadataService) { }
 
  ngOnInit() {
    this.metadataService.setTitle(`app bone`);
    this.metadataService.setTag('og:image', '');
  }
}
