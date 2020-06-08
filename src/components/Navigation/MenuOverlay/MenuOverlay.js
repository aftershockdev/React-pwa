import React , {Component}from 'react';
import classes from './MenuOverlay.module.css'


class MenuOverlay extends Component {

  render(){
  const cls = [classes.MenuOverlay]
    if(!this.props.isOpen){
      cls.push(classes.close)
    }

    return(
      <div className={cls.join(' ')}
      onClick={this.props.hideOverlay}
      >
      </div>
    )
  }
}

export default MenuOverlay