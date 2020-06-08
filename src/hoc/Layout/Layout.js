import React, {Component} from 'react';
import clasess from './Layout.module.css'
import MenuToggle from '../../components/Navigation/ComponentMenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import MenuOverlay from '../../components/Navigation/MenuOverlay/MenuOverlay'

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
export default Layout;