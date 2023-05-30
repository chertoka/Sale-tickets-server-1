import {Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ToursService} from "../../services/tours/tours.service";
import {ITour} from "../../interfaces/tour";

@Controller('tours')
export class ToursController {
    constructor(private toursService:ToursService) {    }

    @Post()
    initTours(): Promise<ITour[]> {
        this.toursService.generateTours(); //вызывается метод для записи данных в базу
        return this.toursService.getAllTours(); //возвращаем результат из базы
    }


    @Delete()
    removeAllTours(): Promise<any> {
        return this.toursService.deleteTours();
    }

    @Get("name")
    getToursByName(@Param("name") name): Promise<ITour[]>{
        return this.toursService.getToursByName(name)
    }

    /**
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllTours():Promise<ITour[]>{
        return this.toursService.getAllTours();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getTourById(@Param("id") id): Promise<ITour> {
        return this.toursService.getTourById(id);
    } */
}
