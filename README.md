make migrations:

```
npx typeorm-ts-node-commonjs migration:generate -d ./src/database.ts ./src/migrations/o<name>
```

run migrations:

```
npx typeorm-ts-node-commonjs migration:run -d ./src/database
```
