import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonList } from 'src/app/models/pokemon';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  searchTerm: string = '';
  projects: any[] = []; // Replace with your project data

  get filteredPokemons(): Pokemon[] {
    const searchTerm = this.searchTerm.toLowerCase();
    return this.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
  }
  
  public pokemons: Pokemon[] = [];
  public currentPage = 1;
  public pokemonsPerPage = 10; 

  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  fetchPokemons(): void {
    const offset = (this.currentPage - 1) * this.pokemonsPerPage;

    this.httpClient.get<PokemonList>(`https://pokeapi.co/api/v2/pokemon?limit=${this.pokemonsPerPage}&offset=${offset}`)
      .subscribe({
        next: (pokemonsData) => {
          this.pokemons = pokemonsData.results.map((pokemon, index) => ({
            ...pokemon,
            imageSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${index + offset + 1}.png`
          }));
        },
        error: (error) => console.log(error)
      });
  }
  
  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.fetchPokemons();
  }


  goToNextPage(): void {
    this.currentPage++;
    this.fetchPokemons();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchPokemons();
    }
  }

  
}
