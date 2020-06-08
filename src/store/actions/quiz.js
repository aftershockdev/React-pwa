import axios from '../../axios/axios-quiz'
import {
  FETCH_QUZIES_START, 
  FETCH_QUZIES_ERROR,
  FETCH_QUZIES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  FINISH_ACTIVE,
  RESET_FINISH_STATE} from './actionsType'

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

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizById(quizId){
  return async dispatch=> {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get(`/quizes/${quizId}.json`)
      const quiz = response.data
      dispatch(fetchQuizSuccess(quiz)) 
    }
    catch(e) {
       dispatch(fetchQuizesError(e))
    }
  }
}

export function resetFinishState() {
  return {
    type: RESET_FINISH_STATE
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function finishActive(questionNumber){
  return {
    type: FINISH_ACTIVE,
    questionNumber
  }
}
export function quizSetState(answerState, results){
  return {
    type: QUIZ_SET_STATE,
    answerState, results
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz
    if(state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if(state.answerState[key] === 'success'){
        return
      }
    }
    
    const question = state.quiz[state.activeQusetion]
    const results = state.results

    if(question.rightAnswerId === answerId){
      if(!results[question.id]){
        results[question.id] = 'success'
      }

      dispatch(quizSetState({[answerId]: 'success'}, results))
      // this.setState({
      //   answerState: {[answerId]: 'success'},
      //   results
      // })
      
      const timeout = window.setTimeout(() => {
        if(isQuizFinished(state)){
          dispatch(finishQuiz())
          // this.setState({
          //   isFinished: true
          // })
        }else {
          dispatch(finishActive(state.activeQusetion + 1))
          // this.setState({
          //   activeQusetion: this.props.activeQusetion + 1,
          //   answerState: null
          // })
        }
        window.clearTimeout(timeout)
      }, 1000); 
    }else{
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))

     
      // setTimeout(() => {
      //   this.setState({
      //     answerState: null
      //   })
      // }, 1000);
    }
  }
}

function isQuizFinished(state){
  return state.activeQusetion + 1 === state.quiz.length
}