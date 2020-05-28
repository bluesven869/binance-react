export interface MarketData {
    pair: string;
    last_price: number;
    change: number;
    high: number;
    low: number;
    vol_24h: number;
    turnover_24h: number;
}
  
export interface TableHeadCell {
    disablePadding: boolean;
    id: keyof MarketData;
    label: string;
    numeric: boolean;
}