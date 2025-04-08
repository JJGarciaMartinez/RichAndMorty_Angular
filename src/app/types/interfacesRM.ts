// Definition of the interfaces used in the project
export interface ApiResponse<T> {
  info: InfoData;
  results: T[]; // results is a generic type that will be used to define the type of the results
}

export interface InfoData {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

// Interface for the characters
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
  loading: boolean;
}

// Interface for the locations
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

// Interface for the episodes
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
