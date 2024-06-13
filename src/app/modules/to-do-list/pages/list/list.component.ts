import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IlistItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IlistItems[]>([this.#parserItems()]);
  public getListItems = this.#setListItems.asReadonly();

  #parserItems(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
  }

  public getInputAndAddItem(value: IlistItems){
    localStorage.setItem('@my-list', JSON.stringify([...this.#setListItems(), value]));
    return this.#setListItems.set(this.#parserItems())
  }
}
