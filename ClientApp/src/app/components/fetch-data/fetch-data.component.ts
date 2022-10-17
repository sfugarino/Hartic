import { Component } from '@angular/core';
import { Furniture } from '../../models/furniture';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public furniture: Furniture[] = [];

  constructor(private inventoryService: InventoryService) {
    inventoryService.getInventory().subscribe(result => {
      this.furniture = result;
    }, error => console.error(error));
  }
}
