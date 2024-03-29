import { put, takeLatest, select } from 'redux-saga/effects'
import {
  SAVE_PRODUCT_IN_CART_SUCCESS,
  SAVE_PRODUCT_IN_CART,
  REDUCE_PRODUCT_IN_CART,
  REDUCE_PRODUCT_IN_CART_SUCCESS,
  DELETE_PRODUCT_IN_CART_SUCCESS,
  DELETE_PRODUCT_IN_CART,
  SET_COUNTRY_FILTER_SUCCESS,
  SET_COUNTRY_FILTER,
  PAGE_LOADED_SUCCESS,
  PAGE_LOADING,
} from './action'
import { cart } from './selector'

function* saveProductInCart(action) {
  yield put({ type: SAVE_PRODUCT_IN_CART_SUCCESS, payload: action.payload })
}

function* reduceProductInCart(action) {
  let items = yield select(cart)
  const findIndex = items.findIndex((x) => x.id === action.payload.id)
  let selected = items[findIndex]
  selected = { ...selected, quantity: selected.quantity - 1 }
  yield put({ type: REDUCE_PRODUCT_IN_CART_SUCCESS, payload: selected })
}

function* deleteProductFromCart(action) {
  yield put({ type: DELETE_PRODUCT_IN_CART_SUCCESS, payload: action.payload })
}

function* setFilterCountry(action) {
  yield put({ type: SET_COUNTRY_FILTER_SUCCESS, payload: action.payload })
}

function* setPageLoading(action) {
  yield put({ type: PAGE_LOADED_SUCCESS, payload: action.payload })
}

function* shopSagas() {
  yield takeLatest(SAVE_PRODUCT_IN_CART, saveProductInCart)
  yield takeLatest(REDUCE_PRODUCT_IN_CART, reduceProductInCart)
  yield takeLatest(DELETE_PRODUCT_IN_CART, deleteProductFromCart)
  yield takeLatest(SET_COUNTRY_FILTER, setFilterCountry)
  yield takeLatest(PAGE_LOADING, setPageLoading)
}

export default shopSagas
