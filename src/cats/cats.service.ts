import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {

  constructor(

    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ){}


  async create(createCatDto: CreateCatDto) {
    const cat= this.catRepository.create(createCatDto);
    return await this.catRepository.save(cat);
  }

 async findAll() {
    return await this.catRepository.find();
  }

 async findOne(id: number) {
    const found=this.catRepository.findOne({
      where:{id:id}
    });
    if(!found){
      return new BadRequestException('no se encontro un gato con ese id');
    }
    return found;
  }

 async update(id: number, updateCatDto: UpdateCatDto) {
    const found= await this.catRepository.findOne({
      where :{id:id}
    });

    if(!found){
      return new BadRequestException('no se encontro un gato con ese id');
    }
    Object.assign(found,updateCatDto);

    return await this.catRepository.save(found);

  }

 async remove(id: number) {
   const found= await this.catRepository.delete(id)
    if(found.affected===0){
      throw new NotFoundException('lol');
    }
    return 'Eliminado';
  }
}
