import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from './entities/connection.entity';
import { CreateConnectionDto } from './dto/createConnection.dto';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(Connection)
    private connectionRepository: Repository<Connection>,
  ) {}

  create(createConnectionDto: CreateConnectionDto) {
    const connection = new Connection();
    connection.refreshToken = createConnectionDto.refreshToken;
    connection.user = createConnectionDto.user;

    return this.connectionRepository.save(connection);
  }

  findAll(): Promise<Connection[]> {
    return this.connectionRepository.find();
  }

  findOneBy(key: string, value: any) {
    return this.connectionRepository.findOneBy({ [key]: value });
  }

  remove(uuid: string) {
    return this.connectionRepository.delete({ uuid });
  }
}
