import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
import react from "@astrojs/react";

export default defineConfig({
  site: 'https://www.apple-repairer.ir', 
  output: 'static', 
  integrations: [
    sitemap(),
    tailwind(),
    icon({
      include: {
        lucide: ['*'], 
        },
       }),
       react()
  ],
  
});
