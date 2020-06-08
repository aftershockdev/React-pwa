import axios from '../../axios/axios-quiz'
import {FETCH_QUZIES_START, FETCH_QUZIES_ERROR, FETCH_QUZIES_SUCCESS} from './actionsType'

export function fetchQuizes(){
  return async dispatch => {
    dispatch(fetchQuizesStart())
     try {
      const response = await axios.get('/quizes.json')

      const quizes = []

      Object.keys(response.data).map((key, index) => {
        quizes.push({
          id: key,  
          name: `Тест № ${index+1}` 
        })      
      })

      dispatch(fetchQuizesSuccess(quizes))
    }
    catch(e){
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizesStart(){
   return { 
     type: FETCH_QUZIES_START
   }
}

export function fetchQuizesSuccess(quizes){
  return {
    type: FETCH_QUZIES_SUCCESS,
    quizes: quizes
  }
}

export function fetchQuizesError(error){
  return {
    type: FETCH_QUZIES_ERROR,
    error: error
  }
}