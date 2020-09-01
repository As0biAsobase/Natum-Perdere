import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BanroomCreationComponent } from "./banroom-creation/banroom-creation.component";
import { BanroomComponent } from './banroom/banroom.component';

import { CardViewComponent } from './card-view/card-view.component';

const routes: Routes = [
  { path: ":ban_id", component: BanroomComponent },
  { path: '', component: BanroomCreationComponent },
  { path: 'card/:card_code', component: CardViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
