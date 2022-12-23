import {faker} from "@faker-js/faker";

faker.locale = "es"

export const generateProduct = () =>{
    return {
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image()
    }
}