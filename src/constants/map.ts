export const MAP_STYLES = {
  light: 'mapbox://styles/mapbox/navigation-day-v1',
  dark: 'mapbox://styles/mapbox/navigation-night-v1',
  streets: 'mapbox://styles/mapbox/streets-v12',
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12'
} as const;

export const MOVEMENT_CONFIG = {
  interval: 1000,
  speedFactor: 0.0001,
  headingChange: 15,
  minSpeed: 5,
  maxSpeed: 120
} as const;

export const SWITZERLAND_BOUNDS = {
  minLng: 5.9559,
  maxLng: 10.4922,
  minLat: 45.8179,
  maxLat: 47.8084
} as const;

export const MAP_THEME = {
  primary: '#276EF1',
  secondary: '#171717',
  background: '#FFFFFF',
  accent: '#2FB344'
} as const;
