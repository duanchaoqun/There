/**
 * Created by dell on 2017/8/1.
 */
import React, { Component } from 'react';
import './footer.css'
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
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select:[
                "企业宣传、营销网站定制","集团官网高端定制","电子商务、交互式平台开发","手机网站、微信二次开发","IOS、安卓APP","其他"
            ],
            contact:["北京环宇威智科技有限公司","地址：北京市朝阳区林达海渔广场2号楼1807","邮箱：huanyuweizhi@163.com"],
            index:0
        };
    }
    componentDidMount(){

        var inp=document.getElementsByClassName("inp")[0];
        var opt=document.getElementsByClassName("opt")[0];
        var sex=document.getElementsByClassName("sex")[0];
        sex.onclick=function () {
            if(this.innerHTML!="女士"){
                this.innerHTML="女士"
            }else{
                this.innerHTML="先生"
            }
        };
        inp.children[0].innerHTML=this.state.select[0];
        var ps=opt.children;
        for(var i=0;i<ps.length;i++){
            ps[i].onclick=function () {
                inp.children[0].innerHTML=this.getAttribute("name");
            }
        }
        inp.onclick=function () {
            this.state.index++;
            if( this.state.index%2==0){
                opt.style.height="0";
                inp.children[1].className="glyphicon glyphicon-menu-down"
            }else {
                opt.style.height="200px";
                inp.children[1].className="glyphicon glyphicon-menu-up"
            }

        }.bind(this)
    }
    render(){
        return (
            <div className="footer_wrap">
                <div className="f_con">
                    <div className="f_title">
                        <p></p>
                        <div>联系我们 <br/> <span>CONTACT</span></div>
                        <p></p>
                        <div className="clrarly"></div>
                    </div>
                    <div className="clrarly"></div>
                    <div className="f_contain">
                        <ul className="F_inp_list">
                            <li>
                                <p>您的需求？</p>
                                <div className="inp"><span></span><span className="glyphicon glyphicon-menu-down"></span></div>
                                <div className="opt">
                                    {this.state.select.map(function (i) {
                                        return <p key={i} name={i}>{i}</p>
                                    }.bind(this))}
                                </div>
                            </li>
                            <li>
                                <p>如何称呼您？</p>
                                <input type="text" placeholder="您的姓氏"/>
                                <button className="sex">先生</button>
                            </li>
                            <li>
                                <p>如何联系您？</p>
                                <input type="text" placeholder="您的手机"/>
                            </li>
                        </ul>
                        <div className="clrarly"></div>
                        <div className="subto">
                            <span className="glyphicon glyphicon-chevron-right"></span>
                            <p>提&nbsp;交</p>
                        </div>
                    </div>
                    <div className="f_bottom">
                        {this.state.contact.map(function (i) {
                            return <p key={i}>{i}</p>
                        }.bind(this))}
                        <div className="clrarly"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer;