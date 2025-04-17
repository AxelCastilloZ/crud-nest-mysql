import { Column, DeleteDateColumn, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {
  
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    age:number;

    @Column({ nullable: true })
    breed:string;

    @DeleteDateColumn()
    deleteAt: Date;

}
