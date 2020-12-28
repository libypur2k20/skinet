import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent implements OnInit {

  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() totalCount: number;

  constructor() { }

  ngOnInit(): void {
  }

  private calculateFirstItemIndex(): number{
    return ((this.pageNumber - 1) * this.pageSize) + 1;
}

private calculateLastItemIndex(limit: number): number{

    const lastIndex = this.pageSize * this.pageNumber;

    return (limit < lastIndex ? limit : lastIndex);

}

showItemsRange(limit: number): string{
    if (limit === 0){
        return '0';
    }
    else{
        return this.calculateFirstItemIndex().toString() + ' - ' + this.calculateLastItemIndex(limit).toString();
    }
}

}
