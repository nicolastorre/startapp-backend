import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ResourceService } from '../resource.service';

@Injectable()
export class ResourceMiddleware implements NestMiddleware {
  constructor(private readonly resourceService: ResourceService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const uuid = req.params.uuid;
    if (!uuid) {
      return next();
    }

    const resource = await this.resourceService.findOne(uuid);
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    req.resource = resource;
    next();
  }
}
