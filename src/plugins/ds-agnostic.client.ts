import '@fairfax/ff-design-system/dist/styles.css';
import '@fairfax/ff-ds-agnostic/dist/styles.css';
import { defineCustomElements as defineDsAgnostic } from '@fairfax/ff-ds-agnostic/loader';

export default defineNuxtPlugin(() => {
  defineDsAgnostic(window);
});
