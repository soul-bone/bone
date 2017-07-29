/*
 * Components
 */
import {Component} from "@angular/core";
import { Http, RequestOptions, Headers } from '@angular/http';
import {KoruResp ,SelectOption ,Order, User, Card, AuthService} from "../auth/auth.service";

import {Router} from '@angular/router';

@Component({
  selector: "koru-order-modify",
  templateUrl: "./order-modify.component.html",
  styleUrls: ["../register/register.scss"],
  
})
export class OrderModifyComponent {

  order : Order = new Order();

  user : User = new User();

  phoneReg = /^[0-9]{11}$/;

  chinaReg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,128}$/;

    public items0:Array<any> = [
      "江苏省南京市高淳区",
      "江苏省南京市江宁区",
      "江苏省南京市玄武区",
      "江苏省南京市秦淮区",
      "江苏省南京市六合区",
      "江苏省南京市栖霞区",
      "江苏省南京市建邺区",
      "江苏省南京市鼓楼区",
      "江苏省南京市雨花台区",
      "江苏省南京市浦口区",
      "江苏省南京市溧水区"
   ];

  public items:Array<any> = [
      "江苏省南京市高淳区",
      "江苏省南京市江宁区",
      "江苏省南京市玄武区",
      "江苏省南京市秦淮区",
      "江苏省南京市六合区",
      "江苏省南京市栖霞区",
      "江苏省南京市建邺区",
      "江苏省南京市鼓楼区",
      "江苏省南京市雨花台区",
      "江苏省南京市浦口区",
      "江苏省南京市溧水区"
   ];

  constructor(private http: Http, private authService: AuthService, private router: Router){
    this.order = authService.order;
    this.order.openId = authService.auth.openid;

    if (null == this.order.sendType){
      this.order.sendType = "0";
    }
    if (null == this.order.productCount){
      this.authService.card.prodcutCount = "8";
    }

    if (null == this.order.consigneeArea){
      this.order.consigneeArea = '';
    }

    // console.log(this.order);

    this.querydistinct("0");
    this.querydistinct("1");
  }

  sendSms()
  {
    // 修改订单发送验证码
    this.user.sendType = "2";
    this.user.mobilePhone = this.order.consigneePhone;
    // console.log(JSON.stringify(this.user))

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    
    this.http.post(this.authService.getSendSmsUrl() , JSON.stringify(this.user), options)
    .toPromise()
    .then(res => {
        // console.log(res.json());
        let resp = KoruResp.fromJSON(res.json());
        if (resp.code != "000")
        {
          alert(resp.desc);
        }
        
    },error => {
      console.log(error.status); // This comes back with 200 !!!!!!!!
      console.log(error); 
    })
  }

  modifyorder(){

    let order = new Order();
    // 设置开始配送时间为当天，后台根据规则处理
    // order.orderStartDate = this.order.orderStartDate;
    order.consigneeName = this.order.consigneeName;
    order.consigneePhone = this.order.consigneePhone;
    order.consigneeAddress = this.order.consigneeAddress;
    order.sendType = this.order.sendType;
    order.consigneeArea = this.order.consigneeArea;

    if (null == this.order.consigneeName 
      || !this.chinaReg.test(this.order.consigneeName)){
        alert("姓名只能输入英文字母／数字／汉字！");
        return;
      }

    if (null == this.order.consigneePhone 
      || !this.phoneReg.test(this.order.consigneePhone)){
      alert("请输入正确的手机号！");
      return ;
    }

    if (this.order.sendType == '0' && '' == this.order.consigneeArea){
      alert("配送区域不能为空！");
      return ;
    }

    if (null == this.order.consigneeAddress 
      || '' == this.order.consigneeAddress
      || this.order.consigneeAddress.length > 128){
      alert("详细地址不能为空，且最大长度128位！");
      return ;
    }
    // order.everyCount = this.order.everyCount;
    order.openId = this.order.openId;
    order.id = this.order.id;

    let resp : KoruResp;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // console.log(this.authService.getModifyOrderUrl());
    // console.log(order);

    this.http.post(this.authService.getModifyOrderUrl() , JSON.stringify(order), options)
    .toPromise()
    .then(
      res =>{
        // console.log(res.json())
        resp = KoruResp.fromJSON(res.json());
    
        if (resp.code != "000")
        {
          alert(resp.desc);
        }
        else{
          this.authService.order = Order.fromJSON(resp.info);
          resp.info = null;
          this.router.navigate(['./order-info']);
        }
    },error => {
      console.log(error.status); // This comes back with 200 !!!!!!!!
      console.log(error); 
    });

  }


  querydistinct(sendType : string){
    let order = new Order();
    order.sendType = sendType;


    let resp : KoruResp;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // console.log(this.authService.getDistinctsUrl());
    // console.log(this.order);

    this.http.post(this.authService.getDistinctsUrl() , JSON.stringify(order), options)
    .toPromise()
    .then(
      res =>{
        // console.log(res.json())
        resp = KoruResp.fromJSON(res.json());
    
        if (resp.code != "000")
        {
          alert(resp.desc);
        }
        else{
          if (Array.isArray(resp.info))
          {
            if (sendType == "1")
            {
              this.items = Array.from(resp.info);
            }else
            {
              this.items0 = Array.from(resp.info);
            }
            
            resp.info = null;
          }
        }
    },error => {
      console.log(error.status); // This comes back with 200 !!!!!!!!
      console.log(error); 
    });
    
  }

}
