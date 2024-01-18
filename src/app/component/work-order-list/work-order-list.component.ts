import { Component, OnInit } from '@angular/core';
import { DataService } from "src/app/services/data.service";

interface AssignedTo {
  person_name: string;
  status: string;
}

interface WorkOrder {
  work_order_id: number;
  description: string;
  received_date: string;
  assigned_to: AssignedTo[];
  status: string;
  priority: string;
}

@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.css']
})
export class WorkOrderListComponent implements OnInit {
  workOrders: WorkOrder[] = [];
  filteredWorkOrders: WorkOrder[] = [];
  searchTerm: string = '';
  isFiltering: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchData().then(data => {
      this.workOrders = data.response.data;
      this.filterWorkOrders();
    });
  }

  filterWorkOrders(): void {
    this.filteredWorkOrders = this.workOrders.filter(
      workOrder => workOrder.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  confirmFilter(): void {
    this.isFiltering = true;
    this.filterWorkOrders();
  }

  resetFilter(): void {
    this.isFiltering = false;
    this.searchTerm = '';
    this.filterWorkOrders();
  }
}
