import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})

class Rule {
  Type: string;
  Value: string;
  Policy: string;
  Options: string[];
  Comment: string;
}

class Proxy {
  Name: string;
  Host: string;
}

export class RecordsModule {
  ID: number;
  Protocol: string;
  Created: string;
  Proxy: Proxy;
  Rule: Rule;
  Status: string;
  Up: number;
  Down: number;
  URL: string;
  Dumped: boolean;
}

export class DumpModule {
  ReqBody: string;
  ReqHeader: string;
  RespBody: string;
  RespHeader: string;
}
