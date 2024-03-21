import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() public title?: string;
  @Input() public subtitle?: string;
  @Input() public isLoading?: boolean;
}
