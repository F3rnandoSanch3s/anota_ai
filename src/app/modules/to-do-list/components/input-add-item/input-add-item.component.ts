
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, input, Output, output, ViewChild, viewChild } from '@angular/core';
import { IlistItems } from '../../interface/IListItems.interface';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText")public inputText!: ElementRef;

  @Input({ required: true }) public inputListItems: IlistItems[] = [];

  @Output()public outputAddListItems = new EventEmitter<IlistItems>();
  public focusAndAddItem(value:string){
    if(value){
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = " ";

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`

      this.outputAddListItems.emit({
        id,
        checked: false,
        value
      })
      return this.inputText.nativeElement.focus();

    }
  }
}
