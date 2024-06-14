import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IlistItems } from '../../interface/IListItems.interface';
import { InputListItemComponent } from "../../components/input-list-item/input-list-item.component";

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    imports: [InputAddItemComponent, InputAddItemComponent, InputListItemComponent]
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

  public deleteAllItems(){
    localStorage.removeItem('@my-list');
    return this.#setListItems.set(this.#parserItems());
  }
}
