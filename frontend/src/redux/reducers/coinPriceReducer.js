import { SET_BITCOIN_PRICE, SET_BITCOIN_PRICE_UPDOWN,SET_BITCOIN_24H_HIGH_PRICE, SET_BITCOIN_24H_LOW_PRICE, SET_BITCOIN_24H_VOLUME, SET_ETHEREUM_PRICE,SET_ETHEREUM_PRICE_UPDOWN, SET_ETHEREUM_24H_HIGH_PRICE, SET_ETHEREUM_24H_LOW_PRICE, SET_ETHEREUM_24H_VOLUME, SET_SOLANA_PRICE, SET_SOLANA_PRICE_UPDOWN, SET_SOLANA_24H_HIGH_PRICE, SET_SOLANA_24H_LOW_PRICE, SET_SOLANA_24H_VOLUME, SET_APE_PRICE, SET_APE_PRICE_UPDOWN, SET_APE_24H_HIGH_PRICE, SET_APE_24H_LOW_PRICE, SET_APE_24H_VOLUME, SET_ADA_PRICE, SET_ADA_PRICE_UPDOWN, SET_ADA_24H_HIGH_PRICE, SET_ADA_24H_LOW_PRICE, SET_ADA_24H_VOLUME } from "../../configs";

//Reducer for character information Initialize State
const initState = {
    bitcoinPrice: 0,
    bitcoinPriceUpDown: "up",
    bitcoinHighPrice: 0,
    bitcoinLowPrice: 0,
    bitcoinVolume:0,
    ethereumPrice: 0,
    ethereumPriceUpDown: "up",
    ethereumHighPrice: 0,
    ethereumLowPrice: 0,
    ethereumVolume: 0,
    solanaPrice: 0,
    solanaPriceUpDown: "up",
    solanaHighPrice: 0,
    solanaLowPrice: 0,
    solanaVolume: 0,
    apePrice: 0,
    apePriceUpDown: "up",
    apeHighPrice: 0,
    apeLowPrice: 0,
    apeVolume: 0,
    adaPrice: 0,
    adaPriceUpDown: "up",
    adaHighPrice: 0,
    adaLowPrice: 0,
    adaVolume: 0,
    
}

//Define Actions
export const coinPriceReducer = (state = initState, action) => {
    switch (action.type) {
            //Change character name
        case SET_BITCOIN_PRICE:
            return {
                ...state,
                bitcoinPrice: action.payload
            }
        case SET_BITCOIN_PRICE_UPDOWN:
            return {
                ...state,
                bitcoinPriceUpDown: action.payload
            }
        case SET_BITCOIN_24H_HIGH_PRICE:
            return {
                ...state,
                bitcoinHighPrice: action.payload
            }
        case SET_BITCOIN_24H_LOW_PRICE:
            return {
                ...state,
                bitcoinLowPrice: action.payload
            }
        case SET_BITCOIN_24H_VOLUME:
            return {
                ...state,
                bitcoinVolume: action.payload
            }
        case SET_ETHEREUM_PRICE:
            return {
                ...state,
                ethereumPrice: action.payload
            }
        case SET_ETHEREUM_PRICE_UPDOWN:
            return {
                ...state,
                ethereumPriceUpDown: action.payload
            }
        case SET_ETHEREUM_24H_HIGH_PRICE:
            return {
                ...state,
                ethereumHighPrice: action.payload
            }
        case SET_ETHEREUM_24H_LOW_PRICE:
            return {
                ...state,
                ethereumLowPrice: action.payload
            }
        case SET_ETHEREUM_24H_VOLUME:
            return {
                ...state,
                ethereumVolume: action.payload
            }
        case SET_SOLANA_PRICE:
            return {
                ...state,
                solanaPrice: action.payload
            }
        case SET_SOLANA_PRICE_UPDOWN:
            return {
                ...state,
                solanaPriceUpDown: action.payload
            }
        case SET_SOLANA_24H_HIGH_PRICE:
            return {
                ...state,
                solanaHighPrice: action.payload
            }
        case SET_SOLANA_24H_LOW_PRICE:
            return {
                ...state,
                solanaLowPrice: action.payload
            }
        case SET_SOLANA_24H_VOLUME:
            return {
                ...state,
                solanaVolume: action.payload
            }
        case SET_APE_PRICE:
            return {
                ...state,
                apePrice: action.payload
            }
        case SET_APE_PRICE_UPDOWN:
            return {
                ...state,
                apePriceUpDown: action.payload
            }
        case SET_APE_24H_HIGH_PRICE:
            return {
                ...state,
                apeHighPrice: action.payload
            }
        case SET_APE_24H_LOW_PRICE:
            return {
                ...state,
                apeLowPrice: action.payload
            }
        case SET_APE_24H_VOLUME:
            return {
                ...state,
                apeVolume: action.payload
            }
        case SET_ADA_PRICE:
            return {
                ...state,
                adaPrice: action.payload
            }
        case SET_ADA_PRICE_UPDOWN:
            return {
                ...state,
                adaPriceUpDown: action.payload
            }
        case SET_ADA_24H_HIGH_PRICE:
            return {
                ...state,
                adaHighPrice: action.payload
            }
        case SET_ADA_24H_LOW_PRICE:
            return {
                ...state,
                adaLowPrice: action.payload
            }
        case SET_ADA_24H_VOLUME:
            return {
                ...state,
                adaVolume: action.payload
            }
        default:
            return state
    }
}

export default coinPriceReducer;