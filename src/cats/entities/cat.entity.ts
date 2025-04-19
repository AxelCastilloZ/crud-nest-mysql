import { Breed } from "src/breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, IsNull, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {
  
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    age:number;

    @DeleteDateColumn()
    deleteAt: Date;


    @ManyToOne(() => Breed, (breed) => breed.cats, { nullable: true,eager:true, })
    breed: Breed;
    

}
