import React,{Component} from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/ActiveQuiz/FinishedQuiz/FinishQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux';
import {fetchQuizById, quizAnswerClick, resetFinishState} from '../../store/actions/quiz'

class Quiz  extends Component {

  async componentDidMount(){
    this.props.fetchQuizById(this.props.match.params.id)
  }
  
  componentWillUnmount(){
    this.props.resetFinishState()
  }
   render(){
    return (
      <div className={classes.Quiz}>
         <div className={classes.QuizWrapper}>
          <h1>Answer the questions :)</h1>

          {
            this.props.loading || !this.props.quiz
             ? <Loader />
             :
            this.props.isFinished ? 
            <FinishedQuiz
             results={this.props.results}
             quiz={this.props.quiz}
             finish={this.props.resetFinishState}
            />
           :
             <ActiveQuiz
             answers={this.props.quiz[this.props.activeQusetion].answers}
             question={this.props.quiz[this.props.activeQusetion].question}
             onAnswerClick={this.props.quizAnswerClick}
             quizLength={this.props.quiz.length}
             answerNumber={this.props.activeQusetion + 1}
             state={this.props.answerState}
            />
          }
           
         </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    results: state.quiz.results, 
    isFinished: state.quiz.isFinished,
    activeQusetion: state.quiz.activeQusetion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading  
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    resetFinishState: () => dispatch(resetFinishState())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz)