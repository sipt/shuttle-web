import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServerGroupModule {
    name: string;
    select_type: string;
    servers: ServerModule[];
}
export class ServerModule {
  name: string;
  selected: boolean;
  rtt: string;
}
