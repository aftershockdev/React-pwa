import React, {Component} from 'react';
import clasess from './Layout.module.css'
import MenuToggle from '../../components/Navigation/ComponentMenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import MenuOverlay from '../../components/Navigation/MenuOverlay/MenuOverlay'
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    menu: false
  }

 
  toggleMenuHandler= () =>{
    this.setState({
      menu: !this.state.menu
    })
  }
render(){
  return (
    <div className={clasess.Layout}>
       
       <Drawer 
        isOpen={this.state.menu}
        toggle={this.toggleMenuHandler}
        isAuthenticated={this.props.isAuthenticated}
       />

       <MenuOverlay
        hideOverlay={this.toggleMenuHandler}
        isOpen={this.state.menu}
       />

       <MenuToggle
       onToggle={this.toggleMenuHandler}
       isOpen={this.state.menu}
       />
      <main>
         {this.props.children}
      </main>
    </div>
  )
}
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)