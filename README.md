# labback

## CMD

$ npm run typeorm migration:generate -- src/migrations/initDB --dataSource ./src/config/data-source.ts

$ npm run typeorm migration:run -- --dataSource ./src/config/data-source.ts

$ docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
