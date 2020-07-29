import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { BanroomComponent } from "./banroom/banroom.component";

const routes: Routes = [
  { path: ":ban_id", component: BanroomComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
