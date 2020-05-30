export interface MarketData {
    symbol: string;
    open: number;
    high: number;
    low: number;
    close: number;
    amount: number;
    vol: number;
    count: number;
    change: number;
}
  
export interface TableHeadCell {
    disablePadding: boolean;
    id: keyof MarketData;
    label: string;
    numeric: boolean;
}