/*
 * Components
 */
import {Component} from "@angular/core";
import { Http, RequestOptions, Headers } from '@angular/http';

import {KoruResp ,User, AuthService} from "../auth/auth.service";

@Component({
  selector: "koru-success",
  templateUrl: "./success.component.html",
  styleUrls: ["./register.scss"],
})
export class SuccessComponent {
    
}