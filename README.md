# Fastify Back-End
Abstract Nodejs Back-End built with Fastify Framework

## Running TypeScript Files

1. Install Global Dependencies:
``` shell
npm install -g ts-node typescript '@types/node'
```

2. Install Dev Dependencies:
``` shell
npm i -D nodemon ts-node
```

3. Create **tsconfig.json**:
``` json
{
   "compilerOptions": {
     "lib": ["es6"],
     "target": "es6",
     "module": "CommonJS",
     "moduleResolution": "node",
     "outDir": "dist",
     "resolveJsonModule": true,
     "emitDecoratorMetadata": true,
     "esModuleInterop": true,
     "experimentalDecorators": true,
     "sourceMap": true
   },
   "include": ["**/*"],
   "exclude": ["node_modules", "*/*.spec.ts"]
 }
```

4. Add **script** to the **package.json**:
``` json
  "scripts": {
    "dev": "nodemon server.ts"
  },
```

5. Run **npm run dev** in the terminal.