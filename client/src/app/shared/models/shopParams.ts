export class ShopParams{
    brandId = 0;
    typeId = 0;
    sort = 'name';
    pageIndex = 1;
    pageSize = 6;

    private calculateFirstItemIndex(): number{
        return ((this.pageIndex - 1) * this.pageSize) + 1;
    }

    private calculateLastItemIndex(limit: number): number{

        const lastIndex = this.pageSize * this.pageIndex;

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