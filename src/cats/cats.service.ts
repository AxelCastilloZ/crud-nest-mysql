import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {

  constructor(

    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
     @InjectRepository(Breed)
        private readonly breedRepository: Repository<Breed>,
  ){}


  async create(createCatDto: CreateCatDto) {
    const breed= await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    });
    if(!breed){
      throw new BadRequestException('Breed not found');
    }
    return await this.catRepository.save({
      ...createCatDto,
      breed,
    });
  
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
   const found= await this.catRepository.softDelete(id)
    if(found.affected===0){
      throw new NotFoundException('lol');
    }
    return 'Eliminado';
  }
}
