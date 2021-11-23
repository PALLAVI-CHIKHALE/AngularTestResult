import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from '../models/inventory';
var headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  url : string = "http://localhost:3000/Inventories";
  constructor(private http : HttpClient) { }

  getList(){
    return this.http.get<Inventory[]>(`${this.url}?isActive=true`);
  }

  getInventory(id:number){
    return this.http.get<Inventory[]>(`${this.url}?id=${id}`);
  }

  addInventory(inventory:Inventory){
    return this.http.post(this.url,inventory);
  }

  updateInventory(inventory:Inventory){
    return this.http.put<Inventory>(this.url + '/' + inventory.id, inventory, headerOption);
  }

  deleteInventory(inventory:Inventory){
    return this.http.put<Inventory>(this.url + '/' + inventory.id, inventory, headerOption);
  }

}
