import pako from 'pako';
import { Store } from 'redux';
import { MarketData } from '../interfaces/datatable';

let socket: WebSocket;
export let markets: never[] = [];
const processMessage = (message: any, store: Store) => {
    if (message.ping) {
      socket.send(JSON.stringify({ pong: message.ping }));
      return;
    }
  
    if (message.ch === "market.overview") {
  
      const old_symbols = markets.map((item: { symbol: string }) => item.symbol);
      const new_symbols = message.data.map((item: { symbol: string }) => item.symbol);
      const symbols_ = old_symbols.concat(new_symbols);
      const merged_symbols = symbols_.filter((item, pos)=>symbols_.indexOf(item) === pos);
      const newMarkets = merged_symbols.map(symbol => {
        if (new_symbols.indexOf(symbol) >= 0) {
          return message.data.find((item: { symbol: string }) => item.symbol === symbol);
        }
  
        return markets.find((item: { symbol: string }) => item.symbol === symbol);
      });
      markets = newMarkets.map((market_data: MarketData)=>({...market_data, change: (market_data.close / market_data.open).toFixed(2) })) as never[]
      store.dispatch({type: 'UPDATE_MARKET', payload: markets});
    }
  };
  
 export function createSocket (store: Store) {
    console.log("INIT Socket");
    socket = new WebSocket("wss://api.huobiasia.vip/ws");
    socket.binaryType = "arraybuffer";
    socket.onopen = (event) => {
      socket.send('{"sub":"market.overview"}');
    };
  
    socket.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        const u8Arr = new Uint8Array(event.data);
        const str = String.fromCharCode.apply(null, Array.from(pako.inflate(u8Arr)));
        processMessage(JSON.parse(str), store);
  
      } else {
        console.log("String");
      }
    };
  
    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        console.log('[close] Connection died');
      }
    };
  
    socket.onerror = (error) => {
      console.log(error);
    };
  };
  