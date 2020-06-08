import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-5fa98.firebaseio.com/',
})

const money = 1000;
const price = 12000;
const loanMaxMonth = 10;


const monthlyPayment= () => {
  return price / money 
}

const can


console.log(monthlyPayment)