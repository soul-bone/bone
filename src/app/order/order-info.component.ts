/*
 * Components
 */
import {Component} from "@angular/core";
import {KoruResp ,Order, AuthService} from "../auth/auth.service";

import { Http, RequestOptions, Headers } from '@angular/http';

import {Router} from '@angular/router';

@Component({
  selector: "koru-order-info",
  templateUrl: "./order-info.component.html",
  styleUrls: ["../register/register.scss"],
})
export class OrderInfoComponent {

  order : Order = new Order();

  index : number = 0;

  productTypeDesc : string;

  constructor(private authService: AuthService, private http : Http,private router: Router){

    this.queryorder();
    this.test();
      
  }

  initOrder()
  {
    if (null == this.order.orderStatus)
    {
        this.order.orderStatus = "1";
    }

    if (this.order.orderStatus == "1")
    {
        this.order.statusDesc = "配送中";
        this.order.buttonStatus = "配送暂停";
    }else if (this.order.orderStatus == "2")
    {
        this.order.statusDesc = "配送暂停中";
        this.order.buttonStatus = "配送启动";
    }else if (this.order.orderStatus == "3")
    {
        this.order.statusDesc = "配送完成";
        this.order.buttonStatus = "配送完成";
    }

    if (this.order.productType == "01")
    {
        this.productTypeDesc = "月卡";
    }else if (this.order.productType == "02")
    {
        this.productTypeDesc = "季卡";
    }else if (this.order.productType == "03")
    {
        this.productTypeDesc = "半年卡";
    }else if (this.order.productType == "04")
    {
        this.productTypeDesc = "年卡";
    }

  }

  queryorder(){
    let order = new Order();
    if (null == this.authService.auth.openid)
    {
        order.openId = "openId";
    }
    else{
        order.openId = this.authService.auth.openid;
    }
    let resp : KoruResp;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // console.log(this.authService.getQueryOrderUrl());
    // console.log(order);
      
    this.http.post(this.authService.getQueryOrderUrl() , JSON.stringify(order), options)
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
                // console.log(resp.info);
                let datas = Array.from(resp.info);
                // console.log(datas);
                for (let index = 0; index < datas.length; index++)
                {
                    this.authService.orders.push(Order.fromJSON(datas[index]));
                }
                
                if (this.authService.orders.length > 0)
                {
                    this.order = this.authService.orders[this.index];
    
                    this.initOrder();
            
                    this.authService.order = this.order; 
                }else{
                    this.router.navigate(['activate']);
                }
                
            }
        }
    },error => {
      console.log(error.status); // This comes back with 200 !!!!!!!!
      console.log(error); 
    });
      
  }

  statusorder(){
    let order = new Order();
    if ("1" == this.order.orderStatus){
        order.flag = "2";
    }else{
        order.flag = "1";
    }
    
    order.orderId = this.order.id;
    let resp : KoruResp;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.authService.getStatusOrderUrl() , JSON.stringify(order), options)
    .toPromise()
    .then(
      res =>{
        // console.log(res.json())
        resp = KoruResp.fromJSON(res.json());
        
        this.order.orderStatus= order.flag;
        this.initOrder();
        alert(resp.desc);
        
    },error => {
      console.log(error.status); // This comes back with 200 !!!!!!!!
      console.log(error); 
    });
    
  }

  modify(){
      
      this.router.navigate(['./order-modify'], this.order);
  }

  nextOrder()
  {
      
      if (this.authService.orders.length > this.index)
      {
        this.index++;

        this.order = this.authService.orders[this.index];

        this.initOrder();

        this.authService.order = this.order;
      }
      else {
          alert('已经是最后一个订单了哦！');
      }
      

  }
  
  prevOrder()
  {
      if (this.index > 0)
      {
        this.index--;

        this.order = this.authService.orders[this.index];

        this.initOrder();

        this.authService.order = this.order;
      }
      else {
          alert('前面已经没有订单了哦！');
      }
      
      
  }

  test(){
      this.order = Order.fromJSON({
         "id": "57e49b36b94045c4bd6051587252b058",
         "cardId": "020b159da7e5432bbad22bd9640060cc",
         "productType": "01",
         "consigneeName": "李剑飞",
         "consigneePhone": "18761662425",
         "consigneeArea": "江苏省南京市浦口区",
         "consigneeAddress": "江苏省南京市浦口区",
         "orderStatus": "1",
         "orderStartDate": new Date(),
         "remarks": "请尽快配送！",
         "productCount": 8,
         "everyCount": "3",
         "sendType": "0",
         "restCount": null,
         "openId": "openId"
      });

      this.initOrder();

      this.authService.order = this.order;
  }
}
