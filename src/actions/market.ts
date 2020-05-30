import * as types from './actionType';

import axios from 'axios';

function requestSymbols() {
    return { type: types.SYMBOLS_REQUEST };
}

function receiveSymbols(json: any) {
    return {
        type: types.SYMBOLS_RECEIVE_SUCCESS,
        data: json,
    }
}

function receiveSymbolsError(json: any) {
    return {
        type: types.SYMBOLS_RECEIVE_FAILED,
        data: json,
    }
}

export function fetchSymbols(url: string) {
    console.log(url);
    return (dispatch: Function) => {
        dispatch(requestSymbols());
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        })
        .then(response=>{
            dispatch(receiveSymbols(response.data.data));
        })
        .catch(error=>{
            console.log('error', error);
            dispatch(receiveSymbolsError(error));
        });
    };
}