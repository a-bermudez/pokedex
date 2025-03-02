import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPokemonsPageRoutingModule } from './list-pokemons-routing.module';
import { ListPokemonsPage } from './list-pokemons.page';

@NgModule({
  declarations: [ListPokemonsPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPokemonsPageRoutingModule,
  ],
})
export class ListPokemonsPageModule {}
