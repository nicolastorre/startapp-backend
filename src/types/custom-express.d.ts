import { Resource } from 'src/authorization/entities/resource.entity';

declare module 'express' {
  export interface Request {
    resource?: Resource;
  }
}
