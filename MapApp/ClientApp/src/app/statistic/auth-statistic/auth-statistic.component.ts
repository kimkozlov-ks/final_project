import {Component, OnInit, Output} from '@angular/core';
import {AuthStatisticService} from "./auth-statistic.service";
import {HttpClient} from "@angular/common/http";

interface AuthMsg{
  Id: number;
  UserId: number;
  Ip: string;
  Action: string;
  Date: string;
}

declare let google: any;

@Component({
  selector: 'app-auth-statistic',
  templateUrl: './auth-statistic.component.html',
  styleUrls: ['./auth-statistic.component.css']
})
export class AuthStatisticComponent implements OnInit {

  currentPage: number;
  pagination: number [];
  totalPages: number;
  pageSize: number = 30;

  userId: number = null;
  action: string = "";
  ip: string = "";
  dateTo: string = "";
  dateFrom: string = "";

  queryParams: string = "";

  constructor(private readonly authStatisticService: AuthStatisticService,
              private http: HttpClient) {
    this.loadData(1);
  }

  ngOnInit() {
  }

  inLoaded(response: any) {
    console.log(response);
    this.totalPages = response.totalPages + 1;
    this.calculatePagination(response);

    google.charts.load('current', { 'packages': ['table'] });
    google.charts.setOnLoadCallback(() => {
      let dataTable = new google.visualization
        .DataTable();

      dataTable.addColumn('number', 'Id');
      dataTable.addColumn('number', 'UserId');
      dataTable.addColumn('string', 'IP-address');
      dataTable.addColumn('string', 'Action');
      dataTable.addColumn('string', 'Event date');

      const data = response.content.map(obj => Object.values(obj));

      dataTable.addRows(data);

      let table = new google.visualization.Table(document.getElementById('table_div'));
      table.draw(dataTable,  {width: '100%', height: '100%'});
    });
  }

  onPageNumberClick($event: MouseEvent) {
    //const page = $event.srcElement.innerText;

    //if(page == this.currentPage) return;

    //this.loadData(page);
  }

  onPaginationButtonClicked(step: number)
  {
    const page = this.currentPage + step;

    if(page < 1) return;
    if(page >= this.totalPages) return;

    this.loadData(page);
  }

  loadData(page: number)
  {
    this.authStatisticService.get(this.queryParams, page - 1, this.pageSize).subscribe((data) => this.inLoaded(data));
  }

  private calculatePagination(response: any) {
    this.currentPage = response.pageable.pageNumber + 1;

    let start = this.currentPage - 2;
    if (start < 1) {
      start = 1
    }
    let end = start + 5
    if (end > response.totalPages + 1) {
      end = response.totalPages + 1;
    }
    this.pagination = []
    for (let i = start; i < end; i++) {
      this.pagination.push(i);
    }
  }

  onSearch($event: MouseEvent) {
    this.queryParams = "";

    if(this.userId != null)
    {
      this.queryParams += `userId=${this.userId}&`;
    }

    if(this.action != "")
    {
      this.queryParams += `action=${this.action}&`;
    }

    if(this.ip != "")
    {
      this.queryParams += `ip=${this.ip}&`;
    }

    if(this.dateTo != "")
    {
      this.queryParams += `dateTo=${this.dateTo}&`;
    }
    if(this.dateFrom != "")
    {
      this.queryParams += `dateFrom=${this.dateFrom}&`;
    }

    console.log(this.queryParams);

    this.loadData(0);
  }

  onReset($event: MouseEvent) {
    this.queryParams = '';
    this.userId = null;
    this.ip = '';
    this.action = '';
    this.dateTo = '';
    this.dateFrom = '';

    this.loadData(0);
  }

  onRefresh($event: MouseEvent) {
    this.loadData(this.currentPage);
  }

  goEnd() {
    this.loadData(this.totalPages);
  }
}

