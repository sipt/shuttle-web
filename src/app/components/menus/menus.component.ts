import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { DumpService } from '../../service/dump.service';
import { GeneralService } from '../../service/general.service';
import { Speed } from '../../modules/common.module';
import { interval, Observable } from 'rxjs';
import { WSHost } from '../../modules/common.module';
import { WebsocketService } from '../../service/websocket.service';

const wsUpdateSpeed = WSHost + '/api/ws/speed';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  allow_dump: boolean;
  allow_mitm: boolean;
  modeList = [
    {label: 'Rule Mode', value: 'RULE'},
    {label: 'Direct Mode', value: 'DIRECT'},
    {label: 'Remote Mode', value: 'REMOTE'},
    {label: 'Reject Mode', value: 'REJECT'}];
  currentMode: string;
  speed: Speed;
  secondsCounter: Observable<number>;

  constructor(private dumpService: DumpService, private generalService: GeneralService,
    private ws: WebsocketService) {}

  ngOnInit() {
    this.dumpService.dumpStatus().subscribe(resp => {
      this.allow_dump = resp.allow_dump;
      this.allow_mitm = resp.allow_mitm;
    });
    this.generalService.getMode().subscribe(mode => this.currentMode = mode);
    this.speed = {up_speed: '0B/s', down_speed: '0B/s'};
    this.generalService.speed();
    // this.secondsCounter = interval(1000);
    // this.secondsCounter.subscribe(_ => this.getSpeed());
    this.ws.InitWebSocket(wsUpdateSpeed).subscribe(
      dataStr => {
        this.speed = JSON.parse(<string>dataStr);
      },
      error => console.error(error),
      () => console.log('ws close!'),
    );
  }

  dumpChange() {
    this.dumpService.allowDump(this.allow_dump).subscribe(resp => {
      this.allow_dump = resp.allow_dump;
      this.allow_mitm = resp.allow_mitm;
    });
  }

  mitmChange() {
    this.dumpService.allowMitm(this.allow_mitm).subscribe(resp => {
      this.allow_dump = resp.allow_dump;
      this.allow_mitm = resp.allow_mitm;
    });
  }
  shutdown() {
    this.generalService.shutdown().subscribe();
  }

  reload() {
    this.generalService.reload().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  githubHome() {
    window.open('https://github.com/sipt/shuttle');
  }

  setMode(value: string) {
    this.generalService.setMode(value).subscribe(
      mode => this.currentMode = mode
    );
  }

  getSpeed() {
    this.generalService.speed().subscribe(
      s => this.speed = s
    );
  }
}
