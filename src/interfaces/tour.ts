 // интрефейс, который записывается в БД
 export interface ITour {
 name:string,
 description:string,
 tourOperator:string,
 price:string,
 img:string,
 id:string,
 type: string,
 date: string
 }

 //интерфейс указывается при работе с входящими данными
 export interface ITourClient {
 name: string,
 description: string,
 tourOperator: string,
 price: string,
 img: string
 }
