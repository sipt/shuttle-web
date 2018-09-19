import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordsComponent } from './components/records/records.component';
import { DnsCacheComponent } from './components/dns-cache/dns-cache.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MenusComponent } from './components/menus/menus.component';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './components/general/general.component';
import { ServerComponent } from './components/server/server.component';
import { IpsFormatPipe } from './pipes/ips-format.pipe';
import { Nl2BrPipe } from './pipes/nl2br.pipe';
import { Html2textPipe } from './pipes/html2text.pipe';
import { MitmComponent } from './components/mitm/mitm.component';
import { CapacityPipe } from './pipes/capacity.pipe';

registerLocaleData(zh);

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/records',
    pathMatch: 'full'
  },
  {
    path: 'general',
    component: GeneralComponent
  },
  {
    path: 'records',
    component: RecordsComponent
  },
  {
    path: 'dns-cache',
    component: DnsCacheComponent
  },
  {
    path: 'servers',
    component: ServerComponent
  },
  {
    path: 'mitm',
    component: MitmComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    DnsCacheComponent,
    MenusComponent,
    GeneralComponent,
    ServerComponent,
    IpsFormatPipe,
    Nl2BrPipe,
    Html2textPipe,
    MitmComponent,
    CapacityPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
