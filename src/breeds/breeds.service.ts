import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository} from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository} from 'typeorm';

@Injectable()
export class BreedsService {


  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    ){}

  async create(createBreedDto: CreateBreedDto) {
    const breed= this.breedRepository.create(createBreedDto);
    return this.breedRepository.save(breed);
  }

  async findAll() {
    return await this.breedRepository.find();
  }

 async findOne(id: number) {
    const found= await this.breedRepository.findOne({
      where:{id:id}
    });

    if(!found){
      return new NotFoundException('No se encontro');
    }
    return found;
  }

 async update(id: number, updateBreedDto: UpdateBreedDto) {

    const found= await this.breedRepository.findOne({
      where:{id:id}
    });
    if(!found){
      return new NotFoundException("Not found");
    }
    Object.assign(found,updateBreedDto);

    return await this.breedRepository.save(found)
    
  }

  async remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
