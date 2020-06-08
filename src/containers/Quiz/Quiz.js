import React,{Component} from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishQuiz from '../../components/ActiveQuiz/FinishedQuiz/FinishQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz  extends Component {
  state = {
    results: {}, // {[id]: success, error}
    isFinished: false,
    activeQusetion: 0,
    answerState: null,
    quiz: [],
    loading: true  
  }
  changeFinish = () => {
    this.setState({
      isFinished: false,
      activeQusetion: 0,
      answerState: null,
      results: {}
    })
  }

  onAnswerClickHandler = answerId => {
    if(this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if(this.state.answerState[key] === 'success'){
        return
      }
    }
    
    const question = this.state.quiz[this.state.activeQusetion]
    const results = this.state.results

    if(question.rightAnswerId === answerId){
      if(!results[question.id]){
        results[question.id] = 'success'
      }
      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })
     console.log(results[question.id])
      const timeout = window.setTimeout(() => {
        if(this.isQuizFinished()){
          this.setState({
            isFinished: true
          })
        }else {
          this.setState({
            activeQusetion: this.state.activeQusetion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout)
      }, 1000);
    }else{
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
      console.log(results)

      setTimeout(() => {
        this.setState({
          answerState: null
        })
      }, 1000);
    }
  }

  isQuizFinished(){
    return this.state.activeQusetion+ 1 === this.state.quiz.length
  }

  async componentDidMount(){
    try {
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
      const quiz = response.data
      this.setState({
        quiz,
        loading: false
      })
    }
    catch(e) {console.error(e)}
  }

   render(){
    return (
      <div className={classes.Quiz}>
         <div className={classes.QuizWrapper}>
          <h1>Answer the questions :)</h1>

          {
            this.state.loading ?
            <Loader /> : 
            this.state.isFinished ? 
            <FinishQuiz
             results={this.state.results}
             quiz={this.state.quiz}
             finish={this.changeFinish}
            />
            : 
             <ActiveQuiz
             answers={this.state.quiz[this.state.activeQusetion].answers}
             question={this.state.quiz[this.state.activeQusetion].question}
             onAnswerClick={this.onAnswerClickHandler}
             quizLength={this.state.quiz.length}
             answerNumber={this.state.activeQusetion + 1}
             state={this.state.answerState}
            />
          }
  
          
           
         </div>
      </div>
    )
  }
}

export default Quiz