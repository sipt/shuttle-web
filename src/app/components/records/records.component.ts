import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecordsService } from '../../service/records.service';
import { WebsocketService } from '../../service/websocket.service';
import { RecordsModule, DumpModule } from '../../modules/records/records.module';
import {interval, Observable} from 'rxjs';
import { WSHost, Host } from '../../modules/common.module';

const wsUpdateRecords = WSHost + '/api/ws/records';
const largeFileURL = Host + '/api/dump/large';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit, OnDestroy {

  records: RecordsModule[] = [];
  allRecords: RecordsModule[] = [];
  keyword: string;
  dump: DumpModule;
  id: string;
  extClosed: boolean;
  tbodyScroll: any;
  tableStyle: any;
  secondsCounter: Observable<number>;
  reqFile: string;
  respFile: string;
  isInit: boolean;
  filterTimeout: any;

  constructor(private service: RecordsService,
  private ws: WebsocketService) { }

  ngOnInit() {
    this.reflesh();
    this.dump = new DumpModule;
    this.extClosed = true;
    this.keyword = '';
    this.tbodyScroll = {y: 'calc(100vh - 80px)'};
    this.tableStyle = {height: 'calc(100vh - 40px)'};
    this.ws.InitWebSocket(wsUpdateRecords).subscribe(
      dataStr => {
        const data = JSON.parse(<string>dataStr);
        for (let i = 0; i < data.length; i++) {
          this.opRecord(data[i]);
        }
        this.filter(null);
      },
      error => console.error(error),
      () => console.log('ws close!'),
    );
    // this.secondsCounter = interval(1000);
    // this.secondsCounter.subscribe(_ => this.reflesh());
  }

  ngOnDestroy() {
    this.ws.close();
  }

  reflesh() {
    this.service.getCache().subscribe(list => {
      this.allRecords = list;
      this.filter(null);
    });
  }

  clear() {
    this.records = [];
    this.allRecords = [];
    this.service.clearCache().subscribe(_ => this.reflesh());
  }

  getDump(id: string, dumped: boolean) {
    if (dumped) {
      this.service.getDumpData(id).subscribe(d => {
        this.dump = d;
      });
      this.openExt();
      this.id = id;
      this.reqFile = '';
      this.respFile = '';
    } else {
      this.dump = new DumpModule;
    }
  }

  openExt() {
    if (this.extClosed) {
      this.extClosed = false;
      this.tbodyScroll = {y: 'calc(100vh - 540px)'};
      this.tableStyle = {height: 'calc(100vh - 500px)'};
    }
  }

  closeExt() {
    if (!this.extClosed) {
      this.extClosed = true;
      this.tbodyScroll = {y: 'calc(100vh - 80px)'};
      this.tableStyle = {height: 'calc(100vh - 40px)'};
    }
  }

  filter(event: any) {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }
    this.filterTimeout = setTimeout(() => {
      if (this.keyword !== '') {
        this.records = this.allRecords.filter(v => v.URL.indexOf(this.keyword) >= 0);
      } else {
        this.records = this.allRecords;
      }
    }, 500);
  }

  download(dumpType: string) {
    let url = largeFileURL + '/' + this.id + '?file_name=';
    if (dumpType === 'request') {
      url += this.reqFile;
    } else {
      url += this.respFile;
    }
    url += '&dump_type=' + dumpType;
    window.open(url);
  }

  opRecord(data: any) {
    if (data.Op === 4) { // 新加记录
      this.allRecords.push({
        ID: data.Value.ID,
        Protocol: data.Value.Protocol,
        Created: data.Value.Created,
        Proxy: data.Value.Proxy,
        Rule: data.Value.Rule,
        Status: data.Value.Status,
        Up: data.Value.Up,
        Down: data.Value.Down,
        URL: data.Value.URL,
        Dumped: data.Value.Dumped,
      });
    } if (data.Op === 5) { // 删除记录
      for (let i = 0; i < this.allRecords.length; i++) {
        if (this.allRecords[i].ID === data.Value) {
          this.allRecords.splice(i, 1);
        }
      }
    } else {
      for (let i = 0; i < this.allRecords.length; i++) {
        const element = this.allRecords[i];
        if (element.ID === data.ID) {
          switch (data.Op) {
            case 2: // 上传流量
              this.allRecords[i].Up += data.Value;
              return;
            case 3: // 下载流量
              this.allRecords[i].Down += data.Value;
              return;
            case 1: // 修改状态
              this.allRecords[i].Status = data.Value;
              return;
            default:
              return;
          }
        }
      }
    }
  }
}
