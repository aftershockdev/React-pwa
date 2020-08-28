import React, {Component} from 'react';
import classes from './Drawer.module.css'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';

class Drawer extends Component {

  renderLinks(links){
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
          to={link.to}
          exact={link.exact}
          activeClassName={classes.active}
          onClick={()=> this.props.toggle() }
          >{link.label}</NavLink>
        </li>
      )
    })
  } 

  render(){
  
    const cls = [classes.Drawer]

    if(!this.props.isOpen){
      cls.push(classes.close)
    }

    const links = [
      {to: '/', label: 'Список', exact: true}
    ]

    if(this.props.isAuthenticated){
      links.push(
        {to: '/logout', label: 'Выйти', exact: false},
        {to: '/quiz-creator', label: 'Создать тест', exact: false}
      )
    }else{
      links.push(
        {to: '/auth', label: 'Авторизация', exact: false}
      )
    }

    return (
    <nav className={cls.join(' ')}>
     <ul>
       { this.renderLinks(links) }
     </ul>
    </nav>
    )
  }
}

export default Drawer