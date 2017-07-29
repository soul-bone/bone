/*
 * Components
 */
import {Component} from "@angular/core";
import { Http,Response, RequestOptions, Headers } from '@angular/http';

import {AuthResp,KoruResp ,User, AuthService} from "../auth/auth.service";
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';

import { TimerCountComponent } from "./timer-count.component";

@Component({
  selector: "koru-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.scss"],
})
export class RegisterComponent{

  user : User = new User();
  // items: Observable<string[]>;

  resp : Observable<AuthResp>;

  sending : string = "0";

  timeCount : number = 60;

  submitStatus : boolean = false;

  myreg = /^[A-Za-z0-9]{6,20}$/;

  phoneReg = /^[0-9]{11}$/;

  constructor(private http: Http, private authService: AuthService, private router: Router)
  {
        // let url = this.authService.auth.authUrl.replace("APPID", this.authService.auth.appid).replace("SECRET",this.authService.auth.secret).replace("CODE", this.authService.auth.token);

        // console.log(this.authService.auth.openid);
        // this.test();
  }

  test(){
      let info : any = "{\"access_token\":\"iGCSldEWKj9c-niA8H-H7-o75fo_6_1sLypK6aVNr-NuyVhKtrcxXad4dnoqKQ67eXo86XAOsYBSZaiwEtUCYAQudyxIeIznR3qIc5X1yKE\",\"expires_in\":7200,\"refresh_token\":\"qRyDj7RrJZRuHjSLY5_lnhzMj1EcF6GQ_GMTXF6MKLEOif261xx-J95yZE82w71RFzUKhHNNO79U3ZNIhVkOvJpwrxcbwznPy9lMqdFxEcA\",\"openid\":\"olUDf0e-x9RdnxvaFEc_ybRbbaBc\",\"scope\":\"snsapi_base\"}";
      this.authService.reviceByUrl(this.authService.getOpenidUrl(), info);

  }

  // getopenid(openid : string)
  // {
  //    this.resp = this.authService.getopenid(openid);
  // }

  // search (term: string) {
  //   this.items = this.authService.search(term);
  //   console.log(this.items);
  // }

  timeCountChange(timeCount: number){
    this.timeCount = timeCount;
    if (timeCount < 1)
    {
      this.sending = "0";
    }
  }

  countChange(){
    
      this.timer = setInterval(() => {
      this.timeCount--;
      // console.log(this.timeCount);
      if (this.timeCount<1 || (null == this.user.mobilePhone 
      || this.user.mobilePhone.length != 11 
      || !Number.isInteger(Number.parseInt(this.user.mobilePhone)))){
          clearInterval(this.timer);
          this.sending = "0";
          this.timeCount = 60;
      }
    }, 1000);
      
  }

  private timer ;

  sendSms()
  {
    this.sending = "1";
    let user = new User();
    // 用户注册发送验证码
    user.sendType = "1";

    if (null == this.user.mobilePhone 
      || !this.phoneReg.test(this.user.mobilePhone)){
      alert("请输入正确的手机号！");
      return ;
    }

    user.mobilePhone = this.user.mobilePhone;
    console.log(JSON.stringify(user))

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    
    this.http.post(this.authService.getSendSmsUrl() , JSON.stringify(user), options)
    .toPromise()
    .then(res => {
        console.log(res.json());
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
  
  register()
  {
    let reg = new User();
    reg.userPhone = this.user.mobilePhone;
    // this.user.userPhone = this.user.mobilePhone;
    reg.openId = this.authService.auth.openid;
    reg.verificationCode= this.user.verificationCode;
    reg.userPwd = this.user.userPwd;
    if (null == reg.openId)
    {
      reg.openId = "openId";
    }

    if (null == reg.userPhone || reg.userPhone.length != 11 
      || !Number.isInteger(Number.parseInt(reg.userPhone))){
      alert("请输入正确的手机号！")
      return ;
    }

    if (null == reg.verificationCode || reg.verificationCode.length != 6 
      || !Number.isInteger(Number.parseInt(reg.verificationCode))){
      alert("请输入正确的验证码！")
      return ;
    }

    if (null == this.user.userPwd || this.user.userPwd.length < 6 
      || this.user.userPwd.length > 20 || !this.myreg.test(this.user.userPwd)){
      alert("密码必须为6-20位数字／字母！") 
      // console.log("密码必须为6-20位数字／字母！");
      return ;
    }
     
    // console.log(JSON.stringify(reg));

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    this.http.post(this.authService.getRegisterUrl() , JSON.stringify(reg), options)
    .toPromise()
    .then(res =>{
        // console.log(res.json())
        let resp = KoruResp.fromJSON(res.json());
        if (resp.code != "000")
        {
          alert(resp.desc);
        }
        else{
          this.router.navigate(['./register-success']);
        }
    },error => {
      console.log(error.status); // This comes back with 200 !!!!!!!!
      console.log(error); 
    })
    
  }

  validateStatus(){
    if (null == this.user.mobilePhone){
      this.submitStatus = false;
      return;
    }

    if (null == this.user.verificationCode){
      this.submitStatus = false;
      return;
    }

    if (null == this.user.userPwd){
      this.submitStatus = false;
      return;
    }

    this.submitStatus = true;
  }

}
