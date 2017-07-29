/*
 * Components
 */
import {Component,Output,EventEmitter,AfterViewInit,OnDestroy} from "@angular/core";

@Component({
  selector: "koru-timer",
  template: `{{timeCount}}`,
//   styleUrls: ["./register.scss"],
})
export class TimerCountComponent implements AfterViewInit, OnDestroy{

  @Output() updateTimeCount:EventEmitter<number> = new EventEmitter();
  timeCount : number = 6;

  // 定时器
  private timer;

    // ngOnInit() {
    //     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //     //Add 'implements OnInit' to the class.

    //     this.timer = setInterval(() => {
    //       this.timeCount--;
    //       console.log(this.timeCount);
    //     }, 1000);
    // }

  // 每一秒更新时间差
  ngAfterViewInit() {
    this.timer = setInterval(() => {
        this.updateTimeCount.emit(--this.timeCount);
        console.log(this.timeCount);
        // if (this.timeCount<0){
        //     clearInterval(this.timer);
        // }
    }, 1000);
  }
  
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.timer);
  }

}
