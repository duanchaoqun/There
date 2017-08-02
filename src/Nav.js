/**
 * Created by dell on 2017/7/31.
 */
import React, { Component } from 'react';
import './nav.css';
function Ajax(opt){
    if(window.XMLHttpRequest){
        var xhr = new XMLHttpRequest();
    }
    else{
        var xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
    }
    if(opt.type=='get'){
        xhr.open(opt.type,opt.url+'?'+JsonToString(opt.data),true);
        xhr.send();
    }
    else if(opt.type=='post'){
        xhr.open(opt.type,opt.url,true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(JsonToString(opt.data));
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status>=200&&xhr.status<300||xhr.status==304){
                opt.success(xhr.responseText);
            }
            else{
                opt.error()
            }
        }
    };
    function JsonToString(json){
        var arr = [];
        for(var i in json){
            arr.push(i+'='+json[i])
        }
        return arr.join('&');
    }
}
class Nav extends Component {
    constructor(props) {
        super(props);
        this.state={
            logo:"456",
            Navword:[],
            Navicon:[],
            tel:"88888888",
            index:"1"
        };
        this.click=function () {
            this.state.index++;
            if(this.state.index%2==0){
                this.refs.icon.className='toggl';
                this.refs.nav_sm.style.marginTop=0;
            }else {
                this.refs.icon.className='';
                this.refs.nav_sm.style.marginTop="-100vh";
            }
        }
    }
    componentDidMount(){
        var str="http://localhost:8282/";
        Ajax({
            url:str+"nav/nav",
            type:"get",
            success:function (da) {
                var date=eval("("+da+")");
                var wordarr=[];
                var icon=[];
                for(var i in date){
                    wordarr.push(date[i].word);
                    icon.push(date[i].iconstyle)
                }
                this.setState({Navword:wordarr,Navicon:icon});
                window.onscroll=function () {
                    var nowTop=document.body.scrollTop;
                    var ContainTop=document.documentElement.clientHeight;
                    if(nowTop>=ContainTop){
                        this.refs.D_nav.style.background="#F8F8F8";
                        this.refs.D_nav.style.boxShadow="0 0px 5px #333";
                        this.refs.tel.style.color="#333";
                        console.log();
                        var lis=this.refs.NavWord.children;
                        for(var i=0;i<lis.length;i++){
                            lis[i].style.color="#333"
                        }
                    }else {
                        var lis=this.refs.NavWord.children;
                        this.refs.D_nav.style.background="";
                        for(var i=0;i<lis.length;i++){
                            lis[i].style.color=""
                        }
                        this.refs.tel.style.color="";
                        this.refs.D_nav.style.boxShadow=''
                    }
                }.bind(this)
            }.bind(this)
        });

    }
    render() {
        return (
            <div className="D_wrap" ref="D_wrap">
                <div className="D_nav" ref="D_nav">
                    <div className="logo">
                        {this.state.logo}
                    </div>
                    <div className="nav_btn" onClick={this.click.bind(this)}>
                        <span ref="icon"></span>
                    </div>
                    <div className="nav_sm" ref="nav_sm">
                        <ul className="nav_icon_sm">
                            {this.state.Navword.map(function (i,k) {
                                return <li key={i}> <span className={this.state.Navicon[k]}></span>{i}</li>
                            }.bind(this))}

                        </ul>
                    </div>
                    <ul className="NavWord" ref="NavWord">
                        {this.state.Navword.map(function (i) {
                            return <li key={i}>{i} <p className="Nav_buttom"></p></li>
                        }.bind(this))}
                    </ul>
                    <div className="tel" ref="tel">
                        免费咨询热线：<span>{this.state.tel}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;