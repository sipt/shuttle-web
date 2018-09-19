import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../service/general.service';

@Component({
  selector: 'app-mitm',
  templateUrl: './mitm.component.html',
  styleUrls: ['./mitm.component.css']
})
export class MitmComponent implements OnInit {

  data: string[] = [];
  input: string;

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.getMitMRules();
  }

  generate() {
    this.generalService.generateCert().subscribe();
  }

  download() {
    this.generalService.downloadCert();
  }

  getMitMRules() {
    this.generalService.getMitMRules().subscribe(list => this.data = list);
  }

  appendMitMRules() {
    this.generalService.appendMitMRules(this.input).subscribe(list => {
      this.input = '';
      this.data = list;
    });
  }

  delMitMRules(domain: string) {
    this.generalService.delMitMRules(domain).subscribe(list => this.data = list);
  }
}
