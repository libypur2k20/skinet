import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    RouterModule  // Para poder agregar atributos router a los links de navegación del nav-bar component.
  ],
  exports: [NavBarComponent]
})
export class CoreModule { }
