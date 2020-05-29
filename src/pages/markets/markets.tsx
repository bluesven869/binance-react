import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import pako from 'pako';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { TableHeadCell, MarketData } from '../../interfaces/datatable';
import EnhancedTable from '../../components/datatable/datatable';

const headCells: TableHeadCell[] = [
  { id: 'symbol', numeric: false, disablePadding: false, label: 'Pair' },
  { id: 'open', numeric: true, disablePadding: false, label: 'Last Price' },
  { id: 'high', numeric: true, disablePadding: false, label: 'Change' },
  { id: 'low', numeric: true, disablePadding: false, label: 'High' },
  { id: 'close', numeric: true, disablePadding: false, label: 'Low' },
  { id: 'amount', numeric: true, disablePadding: false, label: '24H Vol' },
  { id: 'vol', numeric: true, disablePadding: false, label: '24H Turnover' },
];

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

export default function Markets() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [markets, setMarkets] = React.useState([]);
  let socket: WebSocket;
  React.useEffect(() => {
    socket = new WebSocket("wss://api.huobiasia.vip/ws");
    socket.binaryType = "arraybuffer";

    socket.onopen = (event) => {
      socket.send('{"sub":"market.overview"}');
    };

    socket.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        const u8Arr = new Uint8Array(event.data);
        const str = String.fromCharCode.apply(null, Array.from(pako.inflate(u8Arr)));
        processMessage(JSON.parse(str));

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
  });

  const processMessage = (message: any) => {
    console.log(message);
    if (message.ping) {
      socket.send(JSON.stringify({ pong: message.ping }));
      return;
    }

    if (message.ch === "market.overview") {

      const old_symbols = markets.map((item: { symbol: string }) => item.symbol);
      const new_symbols = message.data.map((item: { symbol: string }) => item.symbol);
      const merged_symbols = [...old_symbols, new_symbols];
      const newMarkets = merged_symbols.map(symbol => {
        if (new_symbols.indexOf(symbol) >= 0) {
          return message.data.find((item: { symbol: string }) => item.symbol === symbol);
        }
        return markets.find((item: { symbol: string }) => item.symbol === symbol);
      });

      setMarkets(newMarkets as never[]);
    }
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="USDT" {...a11yProps(0)} />
          <Tab label="HUSD" {...a11yProps(1)} />
          <Tab label="BTC" {...a11yProps(2)} />
          <Tab label="ETH" {...a11yProps(3)} />
          <Tab label="HT" {...a11yProps(4)} />
          <Tab label="ALTS" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div>
            <EnhancedTable
              columns={headCells}
              rows={markets}
              pagination={false}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <EnhancedTable
            columns={headCells}
            rows={[]}
            pagination={false}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <EnhancedTable
            columns={headCells}
            rows={[]}
            pagination={false}
          />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <EnhancedTable
            columns={headCells}
            rows={[]}
            pagination={false}
          />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <EnhancedTable
            columns={headCells}
            rows={[]}
            pagination={false}
          />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <EnhancedTable
            columns={headCells}
            rows={[]}
            pagination={false}
          />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}