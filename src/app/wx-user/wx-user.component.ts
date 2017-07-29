/*
 * Components
 */
import { Component, OnInit, Inject} from "@angular/core";
import { Http,Jsonp, URLSearchParams,RequestOptions,Headers } from '@angular/http';
import {Location} from '@angular/common';

import { KoruResp,AuthResp,AuthService} from "../auth/auth.service";

import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: "koru-wx-user",
  template: `<div>{{resp }}</div>`,
})
export class WxUserComponent implements OnInit{

    resp: Observable<AuthResp>;

    private timer ;

    constructor(private authService: AuthService
        , private location: Location
        , private router: Router
        , private http : Http){
        
    }

    ngOnInit() {
        // example : /getopenid?code=031nQNXL1xT4k31jeXYL14rHXL1nQNXx&state=STATE
        let backurl = this.location.path(true);
        // console.log(backurl.search('state'));  
        if (-1 == backurl.search('state'))
        {
            this.router.navigate(['register'])
        }
        else{

        let params: string[] = backurl.split('?')[1].split('&');
        let index = 0;
        let nexturl = "";
        while(params.length > index){
            let param = params[index];
            if (-1 != param.search('state='))
            {
                if (-1 != param.search('#/'))
                {
                    nexturl = param.substring(6, param.search('#/getopenid'));
                }
                else
                {
                    nexturl = param.substring(6, param.length);        
                }
                
                // console.log(nexturl);
            }
            if (-1 != param.search('code='))
            {
                let code = param.substring(5, param.length);
                this.authService.auth.token = code;
                // console.log(code);
                
            }
            // if (-1 != param.search('uin='))
            // {
            //     console.log(param.substr(0, 12));
            //     console.log(param.substr(4, 12));
            //     this.authService.auth.openid = param.substr(4, 12);
            //     console.log(this.authService.auth.openid);
            // }
            index++;
        }
        
        // console.log(this.authService.getopenid("openid")); 
        // console.log(this.authService.getopenid("errmsg")); 
        // this.location.normalize(url);
        // if (-1 != backurl.search('uin'))
        // {
        //     console.log(backurl.substr(backurl.search('uin='), 12));
        //     console.log(backurl.substr(backurl.search('uin=') + 4, 12));
        //     this.authService.auth.openid = backurl.substr(backurl.search('uin=')+ 4, 12);
        // }

        // if (null == this.authService.auth.openid)
        // {
        //     this.authService.auth.openid = "openId";
        // }

        this.getOpenid(this.authService.getOpenidUrl(), {'code': this.authService.auth.token});

        this.timer = setInterval(() => {
            if (null != this.authService.auth.openid){
            // console.log(this.authService.auth.openid);
            clearInterval(this.timer);
            this.router.navigate([nexturl]);
          }
        }, 1000);
        
        }
        
    }

    getOpenid(url : string, params : any){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let resp : JSON;
        // console.log(url);
        // console.log(params);
        this.http.post(url , JSON.stringify(params), options)
        .toPromise()
        .then(
          res =>{
            console.log(res.json())
            let koruResp : KoruResp = KoruResp.fromJSON(res.json());
            if (koruResp.code == "000"){
                this.reviceByUrl(url, koruResp.info);
            }
            else{
                // console.log(koruResp);
            }
            
        },error => {
          console.log(error.status); // This comes back with 200 !!!!!!!!
          console.log(error); 
        });
    }

    reviceByUrl(url : string, info : any){
        if (this.authService.getOpenidUrl() == url){
            // console.log(info);
            let resp : AuthResp = AuthResp.fromJSON(JSON.parse(info));
            this.authService.auth.openid = resp.openid;
            // console.log(this.authService.auth.openid);
        }
            
    }

}