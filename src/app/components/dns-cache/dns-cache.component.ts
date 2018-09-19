import { Component, OnInit } from '@angular/core';
import { DnsCacheService } from '../../service/dns-cache.service';
import { DnsCacheModule } from '../../modules/dns-cache.module';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dns-cache',
  templateUrl: './dns-cache.component.html',
  styleUrls: ['./dns-cache.component.css']
})
export class DnsCacheComponent implements OnInit {
  cacheList: DnsCacheModule[];

  constructor(private service: DnsCacheService) { }

  ngOnInit() {
    this.reflesh();
  }

  reflesh() {
    this.service.getCache().subscribe(list => this.cacheList = list);
  }

  clear() {
    this.cacheList = [];
    this.service.clearCache().subscribe(_ => {
      this.reflesh();
    });
  }
}
