import { Component, Input, OnInit } from '@angular/core';
import { GiphyGifObject } from '../../types';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  loaded = false;
  @Input() giphyGifObject: GiphyGifObject;
  
  constructor() { }

  ngOnInit(): void {
  }

}
