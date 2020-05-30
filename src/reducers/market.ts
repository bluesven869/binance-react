import { combineReducers } from 'redux';
import * as types from '../actions/actionType';

function marketReducer(state = { markets: [], symbols: [], symbol_loading: false }, action: any) {
	switch (action.type) {
		case 'UPDATE_MARKET':
			return {
				symbols: state.symbols,
				symbol_loading: state.symbol_loading,
				markets: action.payload
			};
		case types.SYMBOLS_REQUEST:
			return {
				markets: state.markets,
				symbols: state.symbols,
				symbol_loading: true,
			}
		case types.SYMBOLS_RECEIVE_SUCCESS:
			
			return {
				markets: state.markets,
				symbol_loading: false,
				symbols: action.data
			}
		case types.SYMBOLS_RECEIVE_FAILED:
			return {
				markets: state.markets,
				symbol_loading: false,
				symbols: action.data
			}
		default:
			return state;
	}
}

const huobiApp = combineReducers({
	marketReducer
});

export default huobiApp;