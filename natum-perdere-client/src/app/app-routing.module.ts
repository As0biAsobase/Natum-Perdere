import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BanroomCreationComponent } from "./banroom-creation/banroom-creation.component";
import { BanroomComponent } from './banroom/banroom.component';

const routes: Routes = [
  { path: ":ban_id", component: BanroomComponent },
  { path: '', component: BanroomCreationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
