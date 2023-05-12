import {faker} from "@faker-js/faker";
import {fundamental_nutrients_type, product_consumption_type, product_type} from "../schema/nutrition/nutrition";
import {day_fromMillis} from "../features/time/period/period";
import {DateTime} from "luxon";

export function fake_daily_consumption_fundamental_nutrients(): fundamental_nutrients_type {
    return {
        sugar: faker.datatype.float({min: 0, max: 100.}),
        fiber: faker.datatype.float({min: 0, max: 56}),
        carbohydrates: faker.datatype.float({min: 200., max: 250.}),
        salt: faker.datatype.float({min: 2., max: 2.6}),
        protein: faker.datatype.float({min: 50., max: 150}),
        fat: faker.datatype.float({min: 50., max: 100.}),
        energy: faker.datatype.float({min: 1.e3, max: 2.5e3})
    }
}

export function fake_product_consumption(products: product_type[], date: DateTime): product_consumption_type {
    const product = faker.helpers.arrayElement(products);

    return {
        product_id: product.id,
        id: faker.datatype.uuid(),
        quantity: product.serving_size * faker.datatype.number({min: 1., max: 4.}),
        referenceDate: faker.date.between(day_fromMillis(date.toMillis(), "beginning").toMillis(), day_fromMillis(date.toMillis(), "end").toMillis()).getTime()
    }
}

export function fake_product_consumption_array(products: product_type[], cardinality: number = 0x20, date: DateTime = DateTime.now()): product_consumption_type[] {
    return Array(cardinality).fill(0).map(value => fake_product_consumption(products, date));
}

export function fake_product_array(cardinality: number = 0x100): product_type[] {
    return Array(cardinality).fill(0).map(value => fake_product());
}

export function fake_product(id: string = faker.datatype.uuid()): product_type {
    return {
        id,
        serving_size: faker.datatype.float({min: 1.e1, max: 4.e1}),
        product_designation:
            {
                name: faker.commerce.productName(),
                characteristics: Array(3).fill(0).map(value => faker.commerce.productAdjective()),
                company: faker.company.name(),
                food: faker.commerce.productMaterial()
            },
        units: "g",
        fundamental_nutrients:
            {
                fat: faker.datatype.float({min: 1.e1, max: 4.e1}),
                energy: faker.datatype.float({min: 2.e2, max: 6.e3}),
                fiber: faker.datatype.float({min: 3., max: 20.}),
                carbohydrates: faker.datatype.float({min: 4, max: 1.e2}),
                protein: faker.datatype.float({min: 1.e1, max: 6.e1}),
                salt: faker.datatype.float({min: 0.1, max: 5.}),
                sugar: faker.datatype.float({min: 1., max: 20.})
            }
    }
}
