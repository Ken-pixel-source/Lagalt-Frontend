import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { Router } from '@angular/router';
const apiURL = 'https://lost-in-translation-production-9e97.up.railway.app';
const apiKey = 'experis';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  constructor(private router: Router) {}

  
  navigateToPokemonDetails(pokemonName: string): void {
    this.router.navigate(['/pokemon', pokemonName]);
  }
  show: boolean = true;

  @Input() pokemonParam? :Pokemon


  ngOnInit(): void {
    const caughtStatus = sessionStorage.getItem(`caught_${this.pokemonParam?.name}`);
    this.show = caughtStatus !== 'true';
  }
  
  rightPokeName(name: any): string {
    const pokeName = String(name);
    if (!pokeName) {
      return ''; 
    }
    return pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
  }
  catchPokemon() {
    const newPokemon = this.pokemonParam;
    const userId = sessionStorage.getItem('userId');

    sessionStorage.setItem(`caught_${newPokemon?.name}`, 'true');


    fetch(`${apiURL}/trainers/${userId}`, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not fetch trainer data');
      }
      return response.json();
    })
    .then(trainerData => {
      const updatedPokemonArray = [...trainerData.pokemon, newPokemon];

      return fetch(`${apiURL}/trainers/${userId}`, {
        method: 'PATCH',
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pokemon: updatedPokemonArray
        })
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not update trainer');
      }
      return response.json();
    })
    .then(updatedTrainer => {
      this.show = false;
      // Do something with the updatedTrainer data
    })
    .catch(error => {
      console.error(error);
    });
  }
}
