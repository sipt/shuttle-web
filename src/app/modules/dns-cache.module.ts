import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class DnsCacheModule {
  MatchType: string;
  Domain: string;
  IPs: string[];
  DNSs: string[];
  Type: string;
  Country: string;
}
