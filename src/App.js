import React, { Component } from 'react';
<<<<<<< HEAD
import './resize.css'
import Nav from './Nav'
import Banner from './banner'
import Footers from './footer'

=======
import logo from './logo.svg';
import './App.css';
import Advantage from './advantage'
import Service from './service'
>>>>>>> origin/master
class App extends Component {
    constructor() {
        super();
        this.state = {
            data: false
        }
    }
    componentDidMount(){
        document.documentElement.style.fontSize=document.documentElement.clientWidth/12.29+'px';
        fetch('http://localhost:7001/tit/tit').then((response)=>response.text()).then((responseText)=>{
            var data=eval('('+responseText+')')
            this.setState({
                data:data  /*获取到的ajax*/
            })
            console.log(this.state.data)
        })
    }

  render() {
<<<<<<< HEAD
    return (
      <div className="App">
           <Nav/>
           <Banner/>
           <Footers/>
      </div>
    );
=======
        if(this.state.data){
            return (
                <div>
                    <Advantage  tit={this.state.data}/>
                    <Service  tit={this.state.data}/>
                </div>
            );
        }else{
            return <div></div>
        }

>>>>>>> origin/master
  }
}

export default App;
