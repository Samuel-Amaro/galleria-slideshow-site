import { writable } from 'svelte/store';
import type { Data } from '../../types/api';

export const artworksStore = writable<Data[]>([]);
