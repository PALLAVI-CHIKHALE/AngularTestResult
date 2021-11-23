import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Inventory } from 'src/app/models/inventory';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  inventoryList: Inventory[];
  modalRef?: BsModalRef;
  inventory: Inventory;
  constructor(private router: Router, private inventoryService: InventoryService, private modalService: BsModalService) {
    this.inventoryList = new Array<Inventory>();
    this.inventory = new Inventory();
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.inventoryService.getList().subscribe((res) => {
      if (res) {
        this.inventoryList = res;
      }
    })
  }

  redirectToAdd() {
    this.router.navigate(['/add']);
  }

  deleteInventory(item) {
    item.isActive = false;
    this.inventoryService.deleteInventory(item).subscribe((res) => {
      if (res) {
        this.getList();
      }
    })
  }

  redirectToEdit(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  openModal(template: TemplateRef<any>, item: Inventory) {
    this.inventory = item;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm', backdrop: true,ignoreBackdropClick: true
    });
  }

  confirm(): void {
    this.deleteInventory(this.inventory);
    this.modalRef?.hide();
  }

  decline(): void {
    this.inventory = new Inventory();
    this.modalRef?.hide();
  }

}
