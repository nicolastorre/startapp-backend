import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from './entities/connection.entity';
import { CreateConnectionDto } from './dto/createConnection.dto';
import { UpdateConnectionDto } from './dto/updateConnection.dto';

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

  findByValidRefreshToken(refreshToken: string) {
    return this.connectionRepository
      .createQueryBuilder()
      .where('refreshToken = :refreshToken', { refreshToken })
      .where('expirationDate <= NOW()')
      .getOne();
  }

  update(uuid: string, updateConnectionDto: UpdateConnectionDto) {
    return this.connectionRepository.update(uuid, updateConnectionDto);
  }

  remove(uuid: string) {
    return this.connectionRepository.delete({ uuid });
  }

  removeBy(key: string, value: string) {
    return this.connectionRepository.delete({ [key]: value });
  }
}
