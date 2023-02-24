import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PageComponent } from './Page/page.component';

const COMPONENTS = [
  NavbarComponent,
  SidebarComponent,
  PageComponent
];

const MODULES = [
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  CommonModule,
];


@NgModule({
  declarations: [
    ...COMPONENTS,
    PageComponent
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ComponentsModule { }
