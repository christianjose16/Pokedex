export interface PokemonDetails {
    base_experience: number;
    forms: PokemonForm[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    name: string;
    order: number;
    past_types: any[]; // Placeholder for missing data
    species: PokemonSpecies;
    sprites: PokemonSprites;
    stats: Stat[];
    weight: number;
  }
  
  export interface PokemonForm {
    name: string;
    url: string;
  }
  
  export interface GameIndex {
    game_index: number;
    version: Version;
  }
  
  export interface Version {
    name: string;
    url: string;
  }
  
  export interface HeldItem {
    item: Item;
    version_details: VersionDetail[];
  }
  
  export interface Item {
    name: string;
    url: string;
  }
  
  export interface VersionDetail {
    rarity: number;
    version: Version;
  }
  
  export interface PokemonSpecies {
    name: string;
    url: string;
  }
  
  export interface PokemonSprites {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
      dream_world: DreamWorld;
      home: Home;
      "official-artwork": OfficialArtwork;
    };
  }
  
  export interface DreamWorld {
    front_default: string;
    front_female: string | null;
  }
  
  export interface Home {
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  }
  
  export interface OfficialArtwork {
    front_default: string;
    front_shiny: string;
  }
  
  export interface Stat {
    base_stat: number;
    effort: number;
    stat: StatDetails;
  }
  
  export interface StatDetails {
    name: string;
    url: string;
  }