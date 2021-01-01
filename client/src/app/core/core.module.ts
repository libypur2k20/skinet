import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [NavBarComponent, TestErrorComponent, NotFoundComponent, ServerErrorComponent],
  imports: [
    CommonModule,
    RouterModule,  // Para poder agregar atributos router a los links de navegación del nav-bar component.
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right',
        preventDuplicates: true
      }
    )
  ],
  exports: [NavBarComponent, TestErrorComponent, NotFoundComponent, ServerErrorComponent]
})
export class CoreModule { }
