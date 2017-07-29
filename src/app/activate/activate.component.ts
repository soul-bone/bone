/*
 * Components
 */
import {Component} from "@angular/core";
import { Http, RequestOptions, Headers } from '@angular/http';

import {KoruResp ,Card, AuthService} from "../auth/auth.service";

import {Router} from '@angular/router';

@Component({
  selector: "koru-activate",
  templateUrl: "./activate.component.html",
  styleUrls: ["../register/register.scss"],
})
export class ActivateComponent {

  card : Card = new Card();

  myreg = /^[A-Za-z0-9]{6,20}$/;
  
  constructor(private http: Http, private authService: AuthService, private router: Router){

  }

  activate()
  {
    // this.user.openId = this.authService.getOpenid();
    this.card.openId = this.authService.auth.openid;
    if (null == this.card.openId)
    {
      this.card.openId = "openId";
    }
    // console.log(this.card)

    if (null == this.card.cardOutCode || !this.myreg.test(this.card.cardOutCode)){
      alert("卡号必须为6-20位数字／字母！") 
      // console.log("密码必须为6-20位数字／字母！");
      return ;
    }

    if (null == this.card.cardPwd || this.card.cardPwd.length < 6 
      || this.card.cardPwd.length > 20 || !this.myreg.test(this.card.cardPwd)){
      alert("密码必须为6-20位数字／字母！") 
      // console.log("密码必须为6-20位数字／字母！");
      return ;
    }

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    this.http.post(this.authService.getCardUrl() , JSON.stringify(this.card), options)
    .toPromise()
    .then(
      res =>{
        // console.log(res.json())
        let resp = KoruResp.fromJSON(res.json());
        if (resp.code != "000")
        {
          alert(resp.desc);
        }
        else{
          // console.log(resp.info);
          this.authService.card = resp.info;
          resp.info = null;
          this.router.navigate(['./activate-card']);
        }
    },error => {
      console.log(error.status); // This comes back with 200 !!!!!!!!
      console.log(error); 
    })

  }

}
