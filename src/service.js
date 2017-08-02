/**
 * Created by Administrator on 2017/8/1 0001.
 */
import React,{Component} from 'react';
import './wjt_component.css';
var k=1;
var smastyle={
    backgroundPositionY:90*k
}
class Service extends Component{
    constructor() {
        super();
        this.state = {
            data: [], /*service的Ajax*/
            k:0 , /*选项卡*/
            t:null
        }
    }
    componentDidMount(){
        fetch('http://localhost:7001/service/service').then((response)=>response.text()).then((responseText)=>{
            var data=eval('('+responseText+')')
            this.setState({
                data:data  /*获取到的ajax*/
            })
            var im=document.getElementsByClassName("wjt_li")
            for(var i=0;i<im.length;i++){
                im[i].style.backgroundPositionY=i*100+"px"
            }
        })
        this.state.t=setInterval(x=>{
            this.setState({k:this.state.k+1})
            if(this.state.k>=this.state.data.length){
                this.setState({k:0})
            }

            console.log(this.state.k)
        },3000)

    }
    handleMouse(k){
        clearInterval(this.state.t)
        this.setState({
            k:k
        })

    }
    handleMouseout(){
        this.state.t=setInterval(x=>{
            this.state.k>=this.state.data.length-1?this.setState({k:0}):this.setState({k:this.state.k+1})
        },3000)
    }
    render(){
        return <div className="wjt_service">
            <h2>{this.props.tit[1].title}</h2>
            <p>{this.props.tit[1].con}</p>
            <div className="wjt_boom"></div>
            <div className="wjt_boom"></div>
            <div className="wjt_text">{this.state.k+1}</div>
            <div className="wjt_serdl">
                {this.state.data.map((item,k)=>{
                    return <div key={k} className={this.state.k==k?"show":"hide"}>
                        <h2>{item.con}</h2>
                        <p>{item.title}</p>
                    </div>
                })}
                <ul>
                    {this.state.data.map((item,k)=>{
                        return <li key={k} onMouseOver={this.handleMouse.bind(this,k)} className={this.state.k==k?"cor":null} onMouseOut={this.handleMouseout.bind(this)}>
                            <div className="wjt_li"></div>
                            <p>{item.con}</p>
                        </li>
                    })}
                </ul>

            </div>
        </div>
    }
}
export default Service;
