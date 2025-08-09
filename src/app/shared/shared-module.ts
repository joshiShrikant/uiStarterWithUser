import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../coreModules/material.module';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ Header, Footer],
  imports: [CommonModule, MaterialModule],
  exports: [RouterModule,  Header, Footer] // Export it for use in other modules
})
export class SharedModule { }
