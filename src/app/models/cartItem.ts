import { Book } from "./book";
import { User } from "./user";

export interface CartItem {
id:number,
appUser:User|null,
book:Book,
amount:number
}