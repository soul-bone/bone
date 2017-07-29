/*
 * Components
 */
import {Component} from "@angular/core";
import { Http, RequestOptions, Headers } from '@angular/http';
import {KoruResp ,SelectOption ,Order, Card, AuthService} from "../auth/auth.service";
import * as moment from 'moment';
import {Router} from '@angular/router';

@Component({
  selector: "koru-order-add",
  templateUrl: "./order-add.component.html",
  styleUrls: ["../register/register.scss"],
  
})
export class OrderAddComponent {

  order : Order = new Order();

  distinct : string = '';

  startTime : Date;

  showTime : Date;

  opened: boolean = false;

  myreg = /^[A-Za-z0-9]{6,20}$/;

  phoneReg = /^[0-9]{11}$/;

  chinaReg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,128}$/;

  addreessReg = /^[\u4e00-\u9fa5_a-zA-Z0-9,.-]{1,128}$/;

  validateTime(){
    if (this.startTime > this.order.orderStartDate){
      this.order.orderStartDate = this.startTime;
    }
  }

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

  public options :Array<SelectOption> = new Array<SelectOption>();

  constructor(private http: Http, private authService: AuthService, private router: Router){
    moment.locale('zh-cn');
    
    let now : Date = new Date();
    now.setDate(now.getDate() + 7);
    this.startTime = now;
    this.order.orderStartDate = now;
    
    if (null == this.order.sendType){
      this.order.sendType = "0";
    }
    if (null == this.order.productCount){
      this.authService.card.prodcutCount = "8";
    }

    this.order.consigneeArea = '';
    this.order.consigneeAddress = '';

    this.querydistinct("0");
    this.querydistinct("1");
    this.getProductCount();
  }

  getProductCount(){
    let card : Card = this.authService.card;
    this.order.everyCount = '2';
    let index = 0;
    let count = new Number(card.prodcutCount);
    let option : SelectOption;
    while (count > index)
    {
      if (count < (index + 2))
      {
        index++;
        index++;
        continue;
      }
      option = new SelectOption();
      option.id = index + 2;
      option.text = option.id + "瓶/次";
      this.options.push(option);
      index++;
    }
  }

  querydistinct(sendType : string){
    let order = new Order();
    order.sendType = sendType;


    let resp : KoruResp;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // console.log(this.authService.getAddOrderUrl());
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

  addorder(){

    let card : Card = this.authService.card;
  
    this.order.cardId = card.id;

    if (null == this.order.consigneeName 
      || !this.chinaReg.test(this.order.consigneeName)){
        alert("姓名只能输入英文字母／数字／汉字！");
        return;
      }

    // 设置开始配送时间为当天，后台根据规则处理
    // this.order.orderStartDate = new Date();
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
      || this.order.consigneeAddress.length > 128){
      alert("详细地址不能为空，且最大长度128位！");
      return ;
    }

    if (null == this.order.orderStartDate){
      alert("开始送货时间不能为空！");
      return ;
    }

    let resp : KoruResp;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // console.log(this.authService.getAddOrderUrl());
    console.log(this.order);

    this.http.post(this.authService.getAddOrderUrl() , JSON.stringify(this.order), options)
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
          this.router.navigate(['./order-info']);
        }
    },error => {
      console.log(error.status); // This comes back with 200 !!!!!!!!
      console.log(error); 
    });

  }

  public open(): void {
    this.opened = !this.opened;
  }

  public close() : void{
    if (null != this.showTime && null != this.order.orderStartDate
      && this.showTime.getDate() == this.order.orderStartDate.getDate())
    {
      return;
    }

    this.showTime = this.order.orderStartDate;
    this.opened = !this.opened;
  }

}
