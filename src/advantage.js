import React,{Component} from 'react';
import './wjt_component.css';
class Advantage extends Component{
    constructor() {
        super();
        this.state = {
            data: [] /*advan的Ajax*/
        }
    }
    componentDidMount(){
        /*请求ajax*/
        fetch('http://localhost:7001/advan/advan').then((response)=>response.text()).then((responseText)=>{
            var data=eval('('+responseText+')')
            this.setState({
                data:data  /*获取到的ajax*/
            })
        })
    }
    render(){
            return(
                <div className="wjt_advantage" ref="asd">
                    <h2>{this.props.tit[0].title}</h2>
                    <p>{this.props.tit[0].con}</p>
                    <div className="wjt_boom"></div>
                    <div className="wjt_boom"></div>
                    <div className="wjt_com">
                        {this.state.data?this.state.data.map((i,k)=>{
                            return (
                                <dl key={k}>
                                <dt className={i.img}><div className="circle"><div className="circleprogress">
                                    <div className="wrap">
                                        <div className="left"></div>
                                    </div>
                                    <div className="wrap2">
                                        <div className="right"></div>
                                    </div>

                                </div></div></dt>
                                <dd>{i.title}</dd>
                                <p>{i.component}</p>
                            </dl>)
                        }):null}
                    </div>
                </div>
            )
    }
}
export default Advantage;