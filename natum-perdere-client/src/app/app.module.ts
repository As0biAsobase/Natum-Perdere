import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentComponent } from './document/document.component';

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { BanroomCreationComponent } from './banroom-creation/banroom-creation.component';
import { BanroomComponent } from './banroom/banroom.component';
import { AppRoutingModule } from './app-routing.module';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    DocumentListComponent,
    DocumentComponent,
    BanroomCreationComponent,
    BanroomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
