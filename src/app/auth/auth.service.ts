import {Injectable} from '@angular/core';
import { Jsonp, JSONPConnection, Http, RequestOptions, Headers } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import {Router} from '@angular/router';

@Injectable()
export class AuthService {
    
    constructor(private http : Http, private jsonp :Jsonp, private router: Router){
        
    }
    
    auth : Auth = new Auth();

    card : Card = new Card();

    order : Order = new Order();

    orders : Array<Order> = new Array<Order>();

    // search (term: string) {
    //     let wikiUrl = 'http://en.wikipedia.org/w/api.php';
    //     // error desc : Refused to execute script from 'http://en.wikipedia.org/w/api.php' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.
    //     // var params = new URLSearchParams();
    //     // params.set('search', term); // the user's search value
    //     // params.set('action', 'opensearch');
    //     // params.set('format', 'json');
    //     // params.set('callback', 'JSONP_CALLBACK');
    //     // // TODO: Add error handling
    //     // return this.jsonp
    //     //             .get(wikiUrl, { search: params })
    //     //             .map(request => <string[]> request.json()[1]);
 

    //     let queryString = '?search=${term}&action=opensearch&format=json&callback=JSONP_CALLBACK'

    //     return this.jsonp
    //        .get(wikiUrl + queryString)
    //        .map(request => <string[]> request.json()[1]);
    //   }

    myPost(url : string, params : any) : JSON{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let resp : JSON;
        console.log(url);
        console.log(params);
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
                console.log(koruResp);
            }
            
        },error => {
          console.log(error.status); // This comes back with 200 !!!!!!!!
          console.log(error); 
        });

        return resp;
    }

    reviceByUrl(url : string, info : any){
        if (this.getOpenidUrl() == url){
            console.log(info);
            let resp : AuthResp = AuthResp.fromJSON(JSON.parse(info));
            this.auth.openid = resp.openid;
            console.log(this.auth.openid);
        }
            
    }

    getopenid(openid: string){
        
        // let myCookie = Cookie.get('openid');

        // console.log(myCookie);

        // if (null != myCookie)
        // {
        //     return myCookie;
        // }

        let url = this.auth.authUrl.replace("APPID", this.auth.appid).replace("SECRET",this.auth.secret).replace("CODE", this.auth.token);
        // url = url + '&callback=JSON_CALLBACK'
        // let baseAuthUrl = "https://api.weixin.qq.com";

        let resp : AuthResp;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });

        console.log(url);
        // return this.jsonp.get(url);
        // return this.jsonp.request(url)
        //     .map(res => {
        //         console.log(res.json());
        //         resp = AuthResp.fromJSON(res.json());
        //         console.log(resp.openid);
        //         this.auth.openid = resp.openid;
        //         return res.json();
        // });
        this.http.request(url, options).toPromise()
            .then(
              res =>{
                console.log(res.json());
                resp = AuthResp.fromJSON(res.json());
                console.log(resp.openid);
                this.auth.openid = resp.openid;
            },error => {
              console.log(error.status); // This comes back with 200 !!!!!!!!
              console.log(error); 
            })
    }
    getOpenidUrl() : string{
        return this.auth.baseUrl + this.auth.openidUrl;
    }

    getSendSmsUrl() : string{
        return this.auth.baseUrl + this.auth.sendSmsUrl;
    }

    getRegisterUrl() : string{
        return this.auth.baseUrl + this.auth.registerUrl;
    }

    getCardUrl() : string{
        return this.auth.baseUrl + this.auth.cardUrl;
    }

    getAddOrderUrl() : string{
        return this.auth.baseUrl + this.auth.addOrderUrl;
    }

    getQueryOrderUrl() : string{
        return this.auth.baseUrl + this.auth.queryOrderUrl;
    }

    getModifyOrderUrl() : string{
        return this.auth.baseUrl + this.auth.modifyOrderUrl;
    }

    getStatusOrderUrl() : string{
        return this.auth.baseUrl + this.auth.statusOrderUrl;
    }

    getDistinctsUrl() : string{
        return this.auth.baseUrl + this.auth.querydistinctsUrl;
    }
}

export class AuthNotFoundException extends Error {
    constructor(message?: string) {
        super(message);
    }
}


export class Auth {
    //  第三方用户唯一凭证
    appid: string = "";
    // 第三方用户唯一凭证密钥，即appsecret
    secret: string = "";
    // 获取access_token填写client_credential
    grant_type: string = "";

    authUrl: string= "";
    
    // 已经取得的token
    token: string;
    // 
    openid: string;

    baseUrl: string = "http://www.korumilk.com/"
    // baseUrl : string = "http://www.yuqi56.cn/";
    // baseUrl: string = "http://58.213.197.26:6270/"
    //baseUrl: string = "http://localhost:4200/"

    // 
    registerUrl: string = "jeeplus/koru/user/register";

    sendSmsUrl: string = "jeeplus/koru/user/sendSms";

    cardUrl: string = "jeeplus/koru/card/activateCard";

    addOrderUrl: string = "jeeplus/koru/order/addOrder";

    queryOrderUrl: string = "jeeplus/koru/order/queryOrder";

    modifyOrderUrl: string = "jeeplus/koru/order/modifyOrder";

    statusOrderUrl: string = "jeeplus/koru/order/stopOrStartOrder";

    querydistinctsUrl : string = "jeeplus/koru/order/qryAddressList";

    openidUrl : string = "jeeplus/koru/user/getToken";
}

export class User{
    mobilePhone : string;
    sendType : string;
    userPhone : string;
    userPwd : string;
    verificationCode : string;
    openId : string;
}

export class Card{
    id : string;
    cardOutCode : string;
    cardPwd : string;
    openId : string;
    productType : string = "01";
    productTypeUrl : string;
    productTypeDesc : string;
    productDesc: string = "会员月卡含8瓶KORU鲜牛奶(1L／瓶)";    
    prodcutCount : string;
    cardValidity : string;
    activityFlag : string;
    activityUserId : string;
}

export class Order{
    id : string;
    orderId : string;
    flag : string;
    cardId : string;
    productType : string;
    consigneeName : string;
    consigneePhone : string;
    consigneeAddress : string;
    consigneeArea : string;
    orderStartDate : Date;
    everyCount : string;
    orderStatus : string;
    productCount : string;
    restCount : string;
    remarks : string;
    sendType : string;
    options : SelectOption[];
    statusDesc : string;
    buttonStatus : string;
    openId : string;

    static fromJSON(json : any) : Order{
        let resp = Object.create(Order.prototype);
        Object.assign(resp, json);
        return resp;
    }
}

export class SelectOption{
    id : number;
    text : string;
}

export class AuthResp{
    // 获取到的凭证
    access_token: string;
    // 凭证有效时间，单位：秒
    expires_in: number;

    refresh_token : string;

    openid : string;

    scope : string;

    static fromJSON(json : any) : AuthResp{
        let resp = Object.create(AuthResp.prototype);
        Object.assign(resp, json);
        return resp;
    }
}

export class KoruResp{
    // 获取到的凭证
    code: string;
    // 凭证有效时间，单位：秒
    desc: string;

    cardID : string;

    info : any;

    static fromJSON(json : any) : KoruResp{
        let resp = Object.create(KoruResp.prototype);
        Object.assign(resp, json);
        return resp;
    }
}

