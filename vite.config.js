import { defineConfig } from 'vite';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  root: 'client/src',
  //publicDir: '../public',
  build: {
    outDir: '../dist',
    minify: isProd,
    rollupOptions: {
        input: {
          main: 'client/src/index.html',
          adminPanel: 'client/src/backend.html',
        },
      },
  },
  plugins: [
  ]
});



// export default {
//     //root: 'server/',
//     root: 'client/src',
//     build:  {
//         // directorio a crear luego de compilar todo!
//         outdir: 'dist2',
//         minify: isProd
//     }
// }