import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';
import SearchStartedEvent from '@components/user-input/SearchStartedEvent';
import { CardComponent } from '@components/shared/card/card.component';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule, TranslocoPipe, CardComponent],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss',
})
export class UserInputComponent {
  @Input() public date!: string; //Format: yyyy-MM-dd
  @Input() public place!: string;
  @Input() public isLoading!: boolean;

  @Output() public searchStarted: EventEmitter<SearchStartedEvent> =
    new EventEmitter();

  public onSubmit() {
    this.searchStarted.emit({
      date: this.date,
      place: this.place,
    });
  }
}
