import { Injectable } from '@nestjs/common';
import {TourDto} from "../../dto/tour-dto";
import {Tour, TourDocument} from "../../schemas/tour";
import {ITourClient} from "../../interfaces/tour";
import { InjectModel} from "@nestjs/mongoose";
import { Model} from "mongoose";

@Injectable()
export class ToursService {
    private toursCount = 10;

    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>){

    }

    async generateTours():Promise<Tour[]> {
        for(let i=0; i <= this.toursCount; i++){
            const tour = new TourDto('test'+i, 'test desc', 'test operator','300'+i, 'test img');
            const tourData = new this.tourModel(tour);
            await tourData.save();
        }

        return this.tourModel.find();
    }

    async deleteTours(): Promise<any>{
        return this.tourModel.deleteMany({})
    }

    async getAllTours(): Promise<Tour[]> {
        return this.tourModel.find();
    }

    async getTourById(id): Promise<Tour> {
        return this.tourModel.findById(id);
    }

    async uploadTour(body:ITourClient){
        const tour = new TourDto(body.name,body.description, body.tourOperator, body.price, body.img);
        const tourData = new this.tourModel(tour)
        await tourData.save()
    }

    async getToursByName(name): Promise<Tour[]> {
        return this.tourModel.find({name: { "$regex": name, "$options": "i" }})

    }
}
