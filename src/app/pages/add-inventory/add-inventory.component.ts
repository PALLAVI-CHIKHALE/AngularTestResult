import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from 'src/app/models/inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {
  inventory: Inventory;
  currentURL: string;
  constructor(private router: Router, private inventoryService: InventoryService, private activatedRoute: ActivatedRoute) {
    this.inventory = new Inventory();
  }

  ngOnInit() {
    this.currentURL = this.router.url;
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getInventory(id);
  }

  getInventory(id) {
    this.inventoryService.getInventory(id).subscribe((res:Inventory[]) => {
      if (res) {
        this.inventory = res[0];
      }
    });
  }

  addInvetory(form: NgForm) {
    if (form.valid) {
      this.inventoryService.addInventory(this.inventory).subscribe((res) => {
        if (res) {
          alert('Inventory added sucessfully');
          this.router.navigate(['/dashboard']);
        }
      })
    }
  }

  updateInventory(form: NgForm) {
    if (form.valid) {
      this.inventoryService.updateInventory(this.inventory).subscribe((res) => {
        if (res) {
          alert('Inventory updated sucessfully');
          this.router.navigate(['/dashboard']);
        }
      })
    }
  }

  backToDashboard(form: NgForm) {
    form.resetForm();
    this.router.navigate(['dashboard']);
  }

}
