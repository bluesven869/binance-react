import React from 'react';
import { connect } from 'react-redux';

import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { TableHeadCell, MarketData } from '../../interfaces/datatable';
import EnhancedTable from '../../components/datatable/datatable';
import { fetchSymbols } from '../../actions/market';

const headCells: TableHeadCell[] = [
  { id: 'symbol', numeric: false, disablePadding: false, label: 'Pair' },
  { id: 'close', numeric: true, disablePadding: false, label: 'Last Price' },
  { id: 'change', numeric: true, disablePadding: false, label: 'Change' },
  { id: 'high', numeric: true, disablePadding: false, label: 'High' },
  { id: 'low', numeric: true, disablePadding: false, label: 'Low' },
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

const Markets = (props: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { markets, symbols } = props;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const getMarkets = (quoteCurrency: string) => {
    const symbol_codes = symbols.filter((symbol: { quote_currency: string; }) => symbol.quote_currency === quoteCurrency)
      .map((symbol: { symbol_code: string; }) => symbol.symbol_code);
    return markets.filter((market_data: MarketData) => symbol_codes.indexOf(market_data.symbol) >= 0)
      .map((market_data: MarketData)=>({
        ...market_data,
        symbol: symbols.filter((symbol: {symbol_code: string; base_currency: string;}) => symbol.symbol_code ===market_data.symbol)[0].base_currency.toUpperCase(),
      }));
    
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
            rows={getMarkets('usdt')}
            pagination={false}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <EnhancedTable
          columns={headCells}
          rows={getMarkets('husd')}
          pagination={false}
        />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <EnhancedTable
          columns={headCells}
          rows={getMarkets('btc')}
          pagination={false}
        />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <EnhancedTable
          columns={headCells}
          rows={getMarkets('eth')}
          pagination={false}
        />
      </TabPanel>
      <TabPanel value={value} index={4} dir={theme.direction}>
        <EnhancedTable
          columns={headCells}
          rows={getMarkets('ht')}
          pagination={false}
        />
      </TabPanel>
      <TabPanel value={value} index={5} dir={theme.direction}>
        <EnhancedTable
          columns={headCells}
          rows={getMarkets('alts')}
          pagination={false}
        />
      </TabPanel>
    </SwipeableViews>
  </div>
);
}

const mapStateToProps = (state: any) => {
  return {
    markets: state.marketReducer.markets,
    symbols: state.marketReducer.symbols,
  };
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchSymbols: (url: string) => dispatch(fetchSymbols(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markets);