import React from 'react'
import classes from './AnswersList.module.css'
import AnswersItem from './AnswerItem/AnswersItem'


const AnswersList = props => {
  return (
    <ul className={classes.AnswersList}>
    {props.answers.map( (answer, index) =>{
      return (
       <AnswersItem 
       onAnswerClick={props.onAnswerClick}
       answer={answer}
       key={index}
       state={props.state ? props.state[answer.id]: null}
       />
       )
      })}
  </ul>
  )
}

export default AnswersList