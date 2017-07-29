/*
 * Components
 */
import {Component,OnInit, Input} from "@angular/core";
import { Http, RequestOptions, Headers } from '@angular/http';

import {Router} from '@angular/router';

import {KoruResp ,Card, AuthService} from "../auth/auth.service";

@Component({
  selector: "koru-activate-card",
  templateUrl: "./activate-card.component.html",
  styleUrls: ["../register/register.scss"],
})
export class ActivateCardComponent implements OnInit{
  
  card : Card;

  @Input() cardID : string;

  constructor(private http: Http, private authService: AuthService, private router: Router){
    
  }

  ngOnInit() {
    let data= this.card;
    if (null == this.card)
    {
         // 默认展示使用，仅测试
        this.card = new Card();
    }

    if (this.card.productType == "01")
    {
        this.card.productTypeDesc = "月卡";
        this.card.productTypeUrl = "assets/images/month.png"
    }else if (this.card.productType == "02")
    {
        this.card.productTypeDesc = "季卡";
        this.card.productTypeUrl = "assets/images/three-month.png"
    }else if (this.card.productType == "03")
    {
        this.card.productTypeDesc = "半年卡";
        this.card.productTypeUrl = "assets/images/half-year.png"
    }else if (this.card.productType == "04")
    {
        this.card.productTypeDesc = "年卡";
        this.card.productTypeUrl = "assets/images/year.png"
    }
    
  }

  redirectOrder(){
      this.router.navigate(['./order-add']);
  }

}
