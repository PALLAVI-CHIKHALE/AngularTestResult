export class Inventory {
  id:number;
  inventoryID:string;
  name:string;
  price:number;
  description:string;
  isActive:boolean;
  constructor(){
    this.id = null;
    this.inventoryID = null;
    this.name = null;
    this.price = null;
    this.description = null;
    this.isActive = true;
  }
}
