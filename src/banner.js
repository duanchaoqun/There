/**
 * Created by dell on 2017/7/31.
 */
import React, { Component } from 'react';
import './banner.css'
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
class Banner extends Component {
    constructor(props) {
        super(props);
        this.state={
            img:[],
            index:0
        };
    }
    componentDidMount(){
        var str="http://localhost:8282/";
        Ajax({
            url:str+"img/img",
            type:"get",
            success:function (da) {
                var date=eval("("+da+")");
                var img=[];
                for(var i in date){
                    img.push(date[i].img);
                }
                this.setState({img:img});
                var btn=document.getElementsByClassName("banner_bg");
                var icon=document.getElementsByClassName("icon_sm");
                icon[this.state.index].style.border="2px solid #0EDB00";
                for(var i=0;i<btn.length;i++){
                    btn[i].style.background=' url('+require(""+this.state.img[i]+"")+') center center';
                    btn[i].style.backgroundSize="cover";
                    btn[i].style.zIndex=-1*(i+1)
                }
                var leftBtn=document.getElementById("left");
                var rightBtn=document.getElementById("right");
                rightBtn.onclick=function () {
                    this.state.index++;
                    for(var i=0;i<btn.length;i++){
                        btn[i].style.opacity=0;
                        icon[i].style.border=""
                    }
                    if(this.state.index>=btn.length){
                        this.setState({index:0})
                    }
                    btn[this.state.index].style.opacity=1;
                    icon[this.state.index].style.border="2px solid #0EDB00"
                }.bind(this);
                leftBtn.onclick=function () {
                    this.state.index--;
                    for(var i=0;i<btn.length;i++){
                        btn[i].style.opacity=0;
                        icon[i].style.border=""
                    }
                    if(this.state.index<0){
                        this.setState({index:btn.length-1})
                    }
                    btn[this.state.index].style.opacity=1;
                    icon[this.state.index].style.border="2px solid #0EDB00"
                }.bind(this)
            }.bind(this)
        });
    }
    render(){
        return (
            <div className="wrap">
                <button className="glyphicon glyphicon-chevron-left" id="left"></button>
                <button className="glyphicon glyphicon-chevron-right" id="right"></button>
                {this.state.img.map(function (i) {
                    return <div className="banner_bg" key={i}></div>
                }.bind(this))}
                <div className="icon_wrap">
                    {this.state.img.map(function (i) {
                        return <p className="icon_sm" key={i}></p>
                    }.bind(this))}
                </div>
            </div>
        )
    }
}
export default Banner;