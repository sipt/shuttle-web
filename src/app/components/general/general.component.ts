import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../service/general.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  enabledLoading: boolean;
  disabledLoading: boolean;
  constructor(private service: GeneralService) { }

  ngOnInit() {
  }

  enableSystemProxy() {
    this.enabledLoading = true;
    this.service.enableSystemProxy().subscribe(() => this.enabledLoading = false);
  }

  disableSystemProxy() {
    this.disabledLoading = true;
    this.service.disableSystemProxy().subscribe(() => this.disabledLoading = false);
  }
}
