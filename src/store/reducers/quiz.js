import { FETCH_QUZIES_START, FETCH_QUZIES_ERROR, FETCH_QUZIES_SUCCESS, 
  FETCH_QUIZ_SUCCESS, FINISH_QUIZ, FINISH_ACTIVE , QUIZ_SET_STATE, RESET_FINISH_STATE} from "../actions/actionsType"


const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {}, 
  isFinished: false,
  activeQusetion: 0,
  answerState: null,
  quiz: null
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
    case FETCH_QUIZ_SUCCESS: 
      return {
       ...state, loading: false, quiz: action.quiz
      }
    case QUIZ_SET_STATE:
      return {
        ...state, answerState: action.answerState, results: action.results
      }
    case FINISH_QUIZ:
      return {
        ...state, isFinished: true
      }
    case FINISH_ACTIVE:
      return {
        ...state, activeQusetion: action.questionNumber , answerState: null
      }
    case RESET_FINISH_STATE:
      return {
        ...state, isFinished: false, activeQusetion: 0, answerState: null, results: {}
      }
    default: 
     return state
  }
}