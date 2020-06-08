import React ,{Component} from 'react';
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js';
import axios from 'axios'




export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls:{
      email: {
       value: '',
       type: 'email',
       label: 'Email',
       errorMessage: 'Поле должно содержать символ @',
       valid: false,
       touched: false,
       validation: {
         required: true,
         email: true,
       }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }
  loginHandler= async ()=> {
    const API_KEY = 'AIzaSyApj66i9UBTG_P-ohxG_fK8OnLKKXNbhqQ'
    const authData ={
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }

    try{
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, authData)
    }
    catch(e){console.error(e)}
    }

  registerHandler = async ()=> {
    const API_KEY = 'AIzaSyApj66i9UBTG_P-ohxG_fK8OnLKKXNbhqQ';
    const authData ={
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }

    try{
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, authData)
    }
    catch(e){
      console.error(e)
    }
    }
  validateControl(value, validation){
    if(!validation) {
      return true
    }
    
    let isValid = true

    // debugger
    if(validation.required){
      isValid = value.trim() !== '' && isValid
    }
    
    if(validation.email){
      isValid = is.email(value) && isValid
    }
    
    if(validation.minLength){
      isValid = value.length >= validation.minLength && isValid
    }
    return isValid
  }

  submitHandler = event => {
    event.preventDefault()
  }
  onChangeHandler = (event, controlName) =>{
    const formControls = {...this.state.formControls}
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    } )
    this.setState({
     formControls, isFormValid
    })
    // debugger
    return formControls
  }


  
  renderInputs(){
   return Object.keys(this.state.formControls).map((controlName, index)=>{
   const control  = this.state.formControls[controlName]
    return (
      <Input 
      key={controlName + index}
      type={control.type}
      value={control.value}
      valid={control.valid}
      touched={control.touched}
      label={control.label}
      shouldValidate={!!control.validation}
      errorMessage={control.errorMessage}
      onChange={event => this.onChangeHandler(event, controlName) }
      />
    )
   })
  }

  render(){
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            { this.renderInputs() }
            <Button type='success' onClick={this.loginHandler} disabled={!this.state.isFormValid}>
              Войти
            </Button>
            <Button type='primary' onClick={this.registerHandler} disabled={!this.state.isFormValid}>
              Регистрация
            </Button>
          </form>
        </div>
      </div>
    )
  }
}