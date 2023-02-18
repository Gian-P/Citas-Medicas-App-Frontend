import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { WelcomePageHeaderComponent } from './welcome-page-header/welcome-page-header.component';


@NgModule({
  declarations: [WelcomeComponent, WelcomePageHeaderComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
  ],
})
export class WelcomeModule {}
