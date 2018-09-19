import { Component, OnInit } from '@angular/core';
import { ServerGroupModule } from '../../modules/server/server.module';
import { ServerService } from '../../service/server.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  list: ServerGroupModule[];

  constructor(private service: ServerService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.service.getServers().subscribe(list => {
      list.sort((x, y) => y.servers.length - x.servers.length);
      this.list = list;
    });
  }

  select(group: string, server: string) {
    for (let i = 0; i < this.list.length; i++) {
      const element = this.list[i];
      if (element.name === group && element.select_type === 'rtt') {
        return ;
      }
    }
    this.service.selectServer(group, server).subscribe(_ => this.refresh());
  }

  refreshSelect(group: string) {
    for (let i = 0; i < this.list.length; i++) {
      const element = this.list[i];
      if (element.name === group && element.select_type !== 'rtt') {
        return ;
      }
    }
    this.service.refleshSelect(group).subscribe(_ => this.refresh());
  }
}
