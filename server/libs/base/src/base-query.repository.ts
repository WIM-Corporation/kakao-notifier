import { Logger, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';

export interface IBaseFindOption {
  relations?: string[];
  required?: boolean;
  mainAlias?: string;
  withDeleted?: boolean;
}

export abstract class BaseQueryRepo<Entity extends BaseEntity> {
  protected abstract relations: string[];
  protected MAX_RESULT_SIZE: number = 100;
  protected readonly logger: Logger;

  protected constructor(protected readonly repository: Repository<Entity>) {
    this.logger = new Logger(`${repository.metadata.name} query repository`);
  }

  async getOne(condition: FindOneOptions<Entity>): Promise<Entity> {
    return this.repository.findOneOrFail(condition).catch(() => {
      throw new NotFoundException('데이터를 찾을 수 없습니다.');
    });
  }

  async getMany(condition: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(condition);
  }

  async getById(id: string, findOption?: IBaseFindOption): Promise<Entity> {
    const entity = await this.findById(id, findOption);
    if (!entity) throw new NotFoundException('데이터를 찾을 수 없습니다.');
    return entity;
  }

  async find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options);
  }

  async findOne(options: FindOneOptions<Entity>): Promise<Entity | null> {
    return this.repository.findOne(options);
  }

  async findById(id: string | undefined, findOption?: IBaseFindOption): Promise<Entity | null> {
    if (!id) return null;
    const alias = findOption?.mainAlias || 'main';
    const qb = this.repository.createQueryBuilder(alias).where(`${alias}.id = :id`, { id });
    if (findOption?.relations) {
      findOption?.relations.forEach((v) => {
        const [property, relationAlias] = this.toJoinPropertyAndRelations(alias, v);
        findOption.required ? qb.innerJoinAndSelect(property, relationAlias) : qb.leftJoinAndSelect(property, relationAlias);
      });
    } else {
      this.relations.forEach((v) => {
        const [property, relationAlias] = this.toJoinPropertyAndRelations(alias, v);
        qb.leftJoinAndSelect(property, relationAlias);
      });
    }
    if (findOption?.withDeleted) qb.withDeleted();
    return qb.getOne();
  }

  private toJoinPropertyAndRelations(alias: string, relation: string): [string, string] {
    const aliasEntities = relation.split('.');
    const property = aliasEntities.length > 1 ? relation : `${alias}.${relation}`;
    const relationAlias = aliasEntities[aliasEntities.length - 1];
    return [property, relationAlias];
  }
}
