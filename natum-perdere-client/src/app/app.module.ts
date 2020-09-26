import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

import { BanroomCreationComponent } from './banroom-creation/banroom-creation.component';
import { BanroomComponent } from './banroom/banroom.component';

import { AppRoutingModule } from './app-routing.module';

import { CardViewComponent } from './card-view/card-view.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardSearchComponent } from './card-search/card-search.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { CardFilterPipe } from './pipes/card-filter.pipe';

const config: SocketIoConfig = { url: environment.serverUrl, options: {}};

@NgModule({
  declarations: [
    AppComponent,
    BanroomCreationComponent,
    BanroomComponent,
    CardViewComponent,
    HeaderComponent,
    FooterComponent,
    CardSearchComponent,
    MainPageComponent,
    PageNotFoundComponent,
    CardFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // Ng2SearchPipeModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
