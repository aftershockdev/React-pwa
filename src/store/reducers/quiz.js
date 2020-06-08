import { FETCH_QUZIES_START, FETCH_QUZIES_ERROR, FETCH_QUZIES_SUCCESS } from "../actions/actionsType"

const initialState = {
  quizes: [],
  loading: false,
  error: null
}

export default function quizReducer(state = initialState, action){
  switch(action.type){
    case FETCH_QUZIES_START:
      return {
        ...state, loading: true
      }
    case FETCH_QUZIES_SUCCESS:
      return {
        ...state, loading: false, quizes: action.quizes
      }
    case FETCH_QUZIES_ERROR:
      return {
       ...state, loading: false, error: action.error
      }

    default: 
     return state
  }
}