import {product_type} from "@shared/common/schema/nutrition/nutrition";

const foundation_string: string = `
[
    {
        "id": "foundation, 4337f9d68c814f698532dcb0fb0af582",
        "fundamental_nutrients": {
            "energy": 229,
            "carbohydrates": 14.9,
            "protein": 7.35,
            "fat": 17.1,
            "fiber": 5.4,
            "sodium": 0.438,
            "sugar": 0.34
        },
        "product_designation": {
            "food": "hummus",
            "name": "hummus",
            "company": "FoodData Central",
            "characteristics": [
                "commercial"
            ]
        },
        "serving_size": 33.9,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.919
            }
        },
        "serving_description": {
            "amount": 2.0,
            "units": "tablespoon"
        },
        "units": "g"
    },
    {
        "id": "foundation, 0b51833c3bc54ec3ab668b89bd684141",
        "fundamental_nutrients": {
            "energy": 27.0,
            "carbohydrates": 5.51,
            "protein": 0.83,
            "fat": 0.63,
            "fiber": 2.1,
            "sodium": 0.006,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "tomatoes",
            "name": "tomatoes",
            "company": "FoodData Central",
            "characteristics": [
                "grape",
                "raw"
            ]
        },
        "serving_size": 49.7,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.922
            }
        },
        "serving_description": {
            "amount": 5.0,
            "units": "tomatoes"
        },
        "units": "g"
    },
    {
        "id": "foundation, 99708fa645e44ed889d4dedce7aed4ea",
        "fundamental_nutrients": {
            "energy": 21.0,
            "carbohydrates": 4.11,
            "protein": 1.04,
            "fat": 0.39,
            "fiber": 0.0,
            "sodium": 0.282,
            "sugar": 1.29
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "snap",
                "green",
                "canned",
                "regular pack",
                "drained solids"
            ]
        },
        "serving_size": 129.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.91
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, 3fb71f727d7846b39aea2cc2a732d96d",
        "fundamental_nutrients": {
            "energy": 314,
            "carbohydrates": 2.89,
            "protein": 11.7,
            "fat": 28.0,
            "fiber": 0.0,
            "sodium": 0.872,
            "sugar": 1.26
        },
        "product_designation": {
            "food": "frankfurter",
            "name": "frankfurter",
            "company": "FoodData Central",
            "characteristics": [
                "beef",
                "unheated"
            ]
        },
        "serving_size": 48.6,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.892
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "piece"
        },
        "units": "g"
    },
    {
        "id": "foundation, cae88128ad5d42958321e6b03ed1e621",
        "fundamental_nutrients": {
            "energy": 620,
            "carbohydrates": 16.2,
            "protein": 20.4,
            "fat": 57.8,
            "fiber": 11.0,
            "sodium": 0.256,
            "sugar": 4.17
        },
        "product_designation": {
            "food": "nuts",
            "name": "nuts",
            "company": "FoodData Central",
            "characteristics": [
                "almonds",
                "dry roasted",
                "with salt added"
            ]
        },
        "serving_size": 135.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.928
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, 659159b621d2453599f2302b5a0bb911",
        "fundamental_nutrients": {
            "energy": 35.0,
            "carbohydrates": 4.42,
            "protein": 2.92,
            "fat": 1.49,
            "fiber": 4.1,
            "sodium": 0.053,
            "sugar": 0.8
        },
        "product_designation": {
            "food": "kale",
            "name": "kale",
            "company": "FoodData Central",
            "characteristics": [
                "raw"
            ]
        },
        "serving_size": 20.6,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.934
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, aa93bbe48abe41199d0aef85a9b64477",
        "fundamental_nutrients": {
            "energy": 150,
            "carbohydrates": 0.91,
            "protein": 12.3,
            "fat": 10.3,
            "fiber": 0.0,
            "sodium": 0.121,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "egg",
            "name": "egg",
            "company": "FoodData Central",
            "characteristics": [
                "whole",
                "raw",
                "frozen",
                "pasteurized"
            ]
        },
        "serving_size": 28.4,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.897
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "oz"
        },
        "units": "g"
    },
    {
        "id": "foundation, c31fbc6d640641cdb6ff24ee85c33e4b",
        "fundamental_nutrients": {
            "energy": 48.0,
            "carbohydrates": 0.74,
            "protein": 10.1,
            "fat": 0.16,
            "fiber": 0.0,
            "sodium": 0.144,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "egg",
            "name": "egg",
            "company": "FoodData Central",
            "characteristics": [
                "white",
                "raw",
                "frozen",
                "pasteurized"
            ]
        },
        "serving_size": 28.4,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.921
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "oz"
        },
        "units": "g"
    },
    {
        "id": "foundation, 5a3d79f4e125451b87cd1178f4039599",
        "fundamental_nutrients": {
            "energy": 376,
            "carbohydrates": 6.02,
            "protein": 79.9,
            "fat": 0.65,
            "fiber": 0.0,
            "sodium": 1.25,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "egg",
            "name": "egg",
            "company": "FoodData Central",
            "characteristics": [
                "white",
                "dried"
            ]
        },
        "serving_size": 7.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.944
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "tablespoon"
        },
        "units": "g"
    },
    {
        "id": "foundation, cbea480258b643ba94881ac83bf1cf10",
        "fundamental_nutrients": {
            "energy": 288,
            "carbohydrates": 36.3,
            "protein": 4.52,
            "fat": 14.4,
            "fiber": 2.4,
            "sodium": 0.374,
            "sugar": 4.5
        },
        "product_designation": {
            "food": "onion rings",
            "name": "onion rings",
            "company": "FoodData Central",
            "characteristics": [
                "breaded",
                "par fried",
                "frozen",
                "prepared",
                "heated in oven"
            ]
        },
        "serving_size": 20.2,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.904
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "piece"
        },
        "units": "g"
    },
    {
        "id": "foundation, 75270041105b4778836a4f8df1902571",
        "fundamental_nutrients": {
            "energy": 12.0,
            "carbohydrates": 1.99,
            "protein": 0.48,
            "fat": 0.43,
            "fiber": 1.0,
            "sodium": 0.808,
            "sugar": 1.28
        },
        "product_designation": {
            "food": "pickles",
            "name": "pickles",
            "company": "FoodData Central",
            "characteristics": [
                "cucumber",
                "dill or kosher dill"
            ]
        },
        "serving_size": 40.4,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.897
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "spear"
        },
        "units": "g"
    },
    {
        "id": "foundation, 299813edba3c4062a41035fd51070a6e",
        "fundamental_nutrients": {
            "energy": 421,
            "carbohydrates": 12.4,
            "protein": 29.6,
            "fat": 28.0,
            "fiber": 0.0,
            "sodium": 1.75,
            "sugar": 0.07
        },
        "product_designation": {
            "food": "cheese",
            "name": "cheese",
            "company": "FoodData Central",
            "characteristics": [
                "parmesan",
                "grated"
            ]
        },
        "serving_size": 7.6,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.913
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "tablespoon"
        },
        "units": "g"
    },
    {
        "id": "foundation, 075fbfa16d6b49b09f47d069235557e3",
        "fundamental_nutrients": {
            "energy": 366,
            "carbohydrates": 5.27,
            "protein": 18.0,
            "fat": 30.6,
            "fiber": 0.0,
            "sodium": 1.66,
            "sugar": 2.63
        },
        "product_designation": {
            "food": "cheese",
            "name": "cheese",
            "company": "FoodData Central",
            "characteristics": [
                "pasteurized process",
                "american",
                "vitamin d fortified"
            ]
        },
        "serving_size": 20.6,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.899
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "slice"
        },
        "units": "g"
    },
    {
        "id": "foundation, 66e893a6b09244a18fd9ae31d5e253f8",
        "fundamental_nutrients": {
            "energy": 37.0,
            "carbohydrates": 7.59,
            "protein": 0.55,
            "fat": 0.7,
            "fiber": 0.2,
            "sodium": 0.001,
            "sugar": 7.72
        },
        "product_designation": {
            "food": "grapefruit juice",
            "name": "grapefruit juice",
            "company": "FoodData Central",
            "characteristics": [
                "white",
                "canned or bottled",
                "unsweetened"
            ]
        },
        "serving_size": 257.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.898
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, 6a81c611f500425fb296436c89da0de7",
        "fundamental_nutrients": {
            "energy": 42.0,
            "carbohydrates": 10.1,
            "protein": 0.91,
            "fat": 0.27,
            "fiber": 1.5,
            "sodium": 0.013,
            "sugar": 8.39
        },
        "product_designation": {
            "food": "peaches",
            "name": "peaches",
            "company": "FoodData Central",
            "characteristics": [
                "yellow",
                "raw"
            ]
        },
        "serving_size": 147.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.893
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "fruit"
        },
        "units": "g"
    },
    {
        "id": "foundation, 44600da55f944d11b386f00dd3b70d59",
        "fundamental_nutrients": {
            "energy": 612,
            "carbohydrates": 17.1,
            "protein": 21.0,
            "fat": 56.1,
            "fiber": 10.3,
            "sodium": 0.532,
            "sugar": 3.14
        },
        "product_designation": {
            "food": "seeds",
            "name": "seeds",
            "company": "FoodData Central",
            "characteristics": [
                "sunflower seed kernels",
                "dry roasted",
                "with salt added"
            ]
        },
        "serving_size": 127.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.935
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, ca27fee545154f53ac74984810e6f114",
        "fundamental_nutrients": {
            "energy": 270,
            "carbohydrates": 49.2,
            "protein": 9.43,
            "fat": 3.59,
            "fiber": 2.3,
            "sodium": 0.477,
            "sugar": 5.34
        },
        "product_designation": {
            "food": "bread",
            "name": "bread",
            "company": "FoodData Central",
            "characteristics": [
                "white",
                "commercially prepared"
            ]
        },
        "serving_size": 27.3,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.912
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "slice"
        },
        "units": "g"
    },
    {
        "id": "foundation, ab2da0a4391b47e98b5e9146b9cf7343",
        "fundamental_nutrients": {
            "energy": 36.0,
            "carbohydrates": 5.3,
            "protein": 2.94,
            "fat": 1.21,
            "fiber": 0.0,
            "sodium": 0.016,
            "sugar": 1.12
        },
        "product_designation": {
            "food": "kale",
            "name": "kale",
            "company": "FoodData Central",
            "characteristics": [
                "frozen",
                "cooked",
                "boiled",
                "drained",
                "without salt"
            ]
        },
        "serving_size": 118.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, 4047fa2ce16f48d6a5c271816b28fafe",
        "fundamental_nutrients": {
            "energy": 61.0,
            "carbohydrates": 5.3,
            "protein": 4.25,
            "fat": 3.38,
            "fiber": 4.3,
            "sodium": 1.1,
            "sugar": 1.42
        },
        "product_designation": {
            "food": "mustard",
            "name": "mustard",
            "company": "FoodData Central",
            "characteristics": [
                "prepared",
                "yellow"
            ]
        },
        "serving_size": 249.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.906
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, ce7ecaba6b5d4f2598e2f255aa6e876e",
        "fundamental_nutrients": {
            "energy": 58.0,
            "carbohydrates": 14.0,
            "protein": 1.06,
            "fat": 0.44,
            "fiber": 3.0,
            "sodium": 0.005,
            "sugar": 8.99
        },
        "product_designation": {
            "food": "kiwifruit",
            "name": "kiwifruit",
            "company": "FoodData Central",
            "characteristics": [
                "green",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.9
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 6a18abb845624d419fe3b70c44781bd7",
        "fundamental_nutrients": {
            "energy": 39.0,
            "carbohydrates": 9.18,
            "protein": 1.06,
            "fat": 0.28,
            "fiber": 1.5,
            "sodium": 0.013,
            "sugar": 7.89
        },
        "product_designation": {
            "food": "nectarines",
            "name": "nectarines",
            "company": "FoodData Central",
            "characteristics": [
                "raw"
            ]
        },
        "serving_size": 129.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.903
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "each"
        },
        "units": "g"
    },
    {
        "id": "foundation, 1131c008112840059d87855b7492dcac",
        "fundamental_nutrients": {
            "energy": 408,
            "carbohydrates": 2.44,
            "protein": 23.3,
            "fat": 34.0,
            "fiber": 0.0,
            "sodium": 0.654,
            "sugar": 0.33
        },
        "product_designation": {
            "food": "cheese",
            "name": "cheese",
            "company": "FoodData Central",
            "characteristics": [
                "cheddar"
            ]
        },
        "serving_size": 17.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.912
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "slice"
        },
        "units": "g"
    },
    {
        "id": "foundation, e109ae3c50424f809acb483b5aaa583b",
        "fundamental_nutrients": {
            "energy": 84.0,
            "carbohydrates": 4.31,
            "protein": 11.0,
            "fat": 2.3,
            "fiber": 0.0,
            "sodium": 0.321,
            "sugar": 4.1
        },
        "product_designation": {
            "food": "cheese",
            "name": "cheese",
            "company": "FoodData Central",
            "characteristics": [
                "cottage",
                "lowfat",
                "2% milkfat"
            ]
        },
        "serving_size": 220.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.915
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, 9b02c6449d8943e1947caae2c396b484",
        "fundamental_nutrients": {
            "energy": 298,
            "carbohydrates": 4.44,
            "protein": 23.7,
            "fat": 20.4,
            "fiber": 0.0,
            "sodium": 0.699,
            "sugar": 1.81
        },
        "product_designation": {
            "food": "cheese",
            "name": "cheese",
            "company": "FoodData Central",
            "characteristics": [
                "mozzarella",
                "low moisture",
                "part-skim"
            ]
        },
        "serving_size": 86.2,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.92
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, 1bb9155edcb4410585f9db7cda89ed5f",
        "fundamental_nutrients": {
            "energy": 575,
            "carbohydrates": 1.87,
            "protein": 48.1,
            "fat": 39.8,
            "fiber": 0.0,
            "sodium": 0.485,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "egg",
            "name": "egg",
            "company": "FoodData Central",
            "characteristics": [
                "whole",
                "dried"
            ]
        },
        "serving_size": 85.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.833
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, aad00f0b4831474ca13a68afbc924850",
        "fundamental_nutrients": {
            "energy": 296,
            "carbohydrates": 0.59,
            "protein": 15.6,
            "fat": 25.1,
            "fiber": 0.0,
            "sodium": 0.066,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "egg",
            "name": "egg",
            "company": "FoodData Central",
            "characteristics": [
                "yolk",
                "raw",
                "frozen",
                "pasteurized"
            ]
        },
        "serving_size": 28.4,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.863
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "oz"
        },
        "units": "g"
    },
    {
        "id": "foundation, 6237382b6e16494493802187df95de4f",
        "fundamental_nutrients": {
            "energy": 654,
            "carbohydrates": 1.07,
            "protein": 34.2,
            "fat": 55.5,
            "fiber": 0.0,
            "sodium": 0.149,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "egg",
            "name": "egg",
            "company": "FoodData Central",
            "characteristics": [
                "yolk",
                "dried"
            ]
        },
        "serving_size": 4.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.793
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "tablespoon"
        },
        "units": "g"
    },
    {
        "id": "foundation, 47953aa2fab245feb86a573f3d72b5a9",
        "fundamental_nutrients": {
            "energy": 61.0,
            "carbohydrates": 3.64,
            "protein": 10.3,
            "fat": 0.37,
            "fiber": 0.0,
            "sodium": 0.036,
            "sugar": 3.27
        },
        "product_designation": {
            "food": "yogurt",
            "name": "yogurt",
            "company": "FoodData Central",
            "characteristics": [
                "greek",
                "plain",
                "nonfat"
            ]
        },
        "serving_size": 156.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.92
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "container"
        },
        "units": "g"
    },
    {
        "id": "foundation, db8a8719819f4734bc5031e88688f763",
        "fundamental_nutrients": {
            "energy": 83.0,
            "carbohydrates": 12.2,
            "protein": 8.06,
            "fat": 0.15,
            "fiber": 0.6,
            "sodium": 0.032,
            "sugar": 11.5
        },
        "product_designation": {
            "food": "yogurt",
            "name": "yogurt",
            "company": "FoodData Central",
            "characteristics": [
                "greek",
                "strawberry",
                "nonfat"
            ]
        },
        "serving_size": 150.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.904
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "container"
        },
        "units": "g"
    },
    {
        "id": "foundation, ac5564a9ea6d4b93a99702b50c352e0d",
        "fundamental_nutrients": {
            "energy": 833,
            "carbohydrates": 0.84,
            "protein": 0.0,
            "fat": 99.1,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "oil",
            "name": "oil",
            "company": "FoodData Central",
            "characteristics": [
                "coconut"
            ]
        },
        "serving_size": 11.6,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.747
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "tablespoon"
        },
        "units": "g"
    },
    {
        "id": "foundation, 17c8965df65346fd9e782da30de62f54",
        "fundamental_nutrients": {
            "energy": 156,
            "carbohydrates": 0.0,
            "protein": 23.9,
            "fat": 5.95,
            "fiber": 0.0,
            "sodium": 0.117,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "chicken",
            "name": "chicken",
            "company": "FoodData Central",
            "characteristics": [
                "broilers or fryers",
                "drumstick",
                "meat only",
                "cooked",
                "braised"
            ]
        },
        "serving_size": 104.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.924
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "drumstick"
        },
        "units": "g"
    },
    {
        "id": "foundation, 554497fb619e4acca6bc35cd1f61d526",
        "fundamental_nutrients": {
            "energy": 166,
            "carbohydrates": 0.0,
            "protein": 32.1,
            "fat": 3.24,
            "fiber": 0.0,
            "sodium": 0.047,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "chicken",
            "name": "chicken",
            "company": "FoodData Central",
            "characteristics": [
                "broiler or fryers",
                "breast",
                "skinless",
                "boneless",
                "meat only",
                "cooked",
                "braised"
            ]
        },
        "serving_size": 174.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.933
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "piece"
        },
        "units": "g"
    },
    {
        "id": "foundation, baa573db858e4701a790b19814a2dc86",
        "fundamental_nutrients": {
            "energy": 45.0,
            "carbohydrates": 8.05,
            "protein": 1.41,
            "fat": 1.48,
            "fiber": 1.8,
            "sodium": 0.419,
            "sugar": 5.5
        },
        "product_designation": {
            "food": "sauce",
            "name": "sauce",
            "company": "FoodData Central",
            "characteristics": [
                "pasta",
                "spaghetti/marinara",
                "ready-to-serve"
            ]
        },
        "serving_size": 135.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.903
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "serving"
        },
        "units": "g"
    },
    {
        "id": "foundation, 569368daf5434ecfa7d7c3d5f681d469",
        "fundamental_nutrients": {
            "energy": 106,
            "carbohydrates": 0.27,
            "protein": 16.7,
            "fat": 3.73,
            "fiber": 0.0,
            "sodium": 1.04,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "ham",
            "name": "ham",
            "company": "FoodData Central",
            "characteristics": [
                "sliced",
                "pre-packaged",
                "deli meat (96%fat free",
                "water added)"
            ]
        },
        "serving_size": 13.5,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.908
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "slice"
        },
        "units": "g"
    },
    {
        "id": "foundation, b530495bf22443dcb080d14fd747c38a",
        "fundamental_nutrients": {
            "energy": 130,
            "carbohydrates": 4.96,
            "protein": 1.15,
            "fat": 12.9,
            "fiber": 4.0,
            "sodium": 1.62,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "olives",
            "name": "olives",
            "company": "FoodData Central",
            "characteristics": [
                "green",
                "manzanilla",
                "stuffed with pimiento"
            ]
        },
        "serving_size": 3.2,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.893
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "olive"
        },
        "units": "g"
    },
    {
        "id": "foundation, 1f619c31ceb34f11afd9886db342c5ea",
        "fundamental_nutrients": {
            "energy": 430,
            "carbohydrates": 69.6,
            "protein": 5.79,
            "fat": 14.3,
            "fiber": 3.3,
            "sodium": 0.314,
            "sugar": 34.8
        },
        "product_designation": {
            "food": "cookies",
            "name": "cookies",
            "company": "FoodData Central",
            "characteristics": [
                "oatmeal",
                "soft",
                "with raisins"
            ]
        },
        "serving_size": 27.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.842
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cookie"
        },
        "units": "g"
    },
    {
        "id": "foundation, 9a2409ad38564012873f1479bd92e307",
        "fundamental_nutrients": {
            "energy": 18.0,
            "carbohydrates": 3.32,
            "protein": 0.84,
            "fat": 0.5,
            "fiber": 0.0,
            "sodium": 0.125,
            "sugar": 2.99
        },
        "product_designation": {
            "food": "tomatoes",
            "name": "tomatoes",
            "company": "FoodData Central",
            "characteristics": [
                "canned",
                "red",
                "ripe",
                "diced"
            ]
        },
        "serving_size": 245.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.908
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, 802a93e3b81b45419e20d70ba2c25a8a",
        "fundamental_nutrients": {
            "energy": 74.0,
            "carbohydrates": 0.0,
            "protein": 16.3,
            "fat": 0.45,
            "fiber": 0.0,
            "sodium": 0.213,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "fish",
            "name": "fish",
            "company": "FoodData Central",
            "characteristics": [
                "haddock",
                "raw"
            ]
        },
        "serving_size": 176.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.925
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "fillet"
        },
        "units": "g"
    },
    {
        "id": "foundation, 1df0d4c6e1134206b3fafb3daca29d4a",
        "fundamental_nutrients": {
            "energy": 56.0,
            "carbohydrates": 0.0,
            "protein": 12.3,
            "fat": 0.41,
            "fiber": 0.0,
            "sodium": 0.333,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "fish",
            "name": "fish",
            "company": "FoodData Central",
            "characteristics": [
                "pollock",
                "raw"
            ]
        },
        "serving_size": 177.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.919
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "fillet"
        },
        "units": "g"
    },
    {
        "id": "foundation, e5b4ab9a43a94650bbd521ddc632ac83",
        "fundamental_nutrients": {
            "energy": 90.0,
            "carbohydrates": 0.08,
            "protein": 19.0,
            "fat": 0.94,
            "fiber": 0.0,
            "sodium": 0.219,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "fish",
            "name": "fish",
            "company": "FoodData Central",
            "characteristics": [
                "tuna",
                "light",
                "canned in water",
                "drained solids"
            ]
        },
        "serving_size": 142.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.928
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "can"
        },
        "units": "g"
    },
    {
        "id": "foundation, 44ad11a4492d447b8552129f6d2eed95",
        "fundamental_nutrients": {
            "energy": 174,
            "carbohydrates": 32.5,
            "protein": 3.84,
            "fat": 3.19,
            "fiber": 0.0,
            "sodium": 0.361,
            "sugar": 0.62
        },
        "product_designation": {
            "food": "restaurant",
            "name": "restaurant",
            "company": "FoodData Central",
            "characteristics": [
                "chinese",
                "fried rice",
                "without meat"
            ]
        },
        "serving_size": 133.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.915
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, e9090ee53acd41adacdc4c622e4e71a5",
        "fundamental_nutrients": {
            "energy": 174,
            "carbohydrates": 15.8,
            "protein": 7.38,
            "fat": 9.04,
            "fiber": 2.4,
            "sodium": 0.473,
            "sugar": 0.46
        },
        "product_designation": {
            "food": "restaurant",
            "name": "restaurant",
            "company": "FoodData Central",
            "characteristics": [
                "latino",
                "tamale",
                "pork"
            ]
        },
        "serving_size": 142.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.915
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "piece"
        },
        "units": "g"
    },
    {
        "id": "foundation, 4ee14768e8df46b4a453cc1745b17eae",
        "fundamental_nutrients": {
            "energy": 229,
            "carbohydrates": 31.5,
            "protein": 5.59,
            "fat": 9.01,
            "fiber": 5.8,
            "sodium": 0.305,
            "sugar": 1.3
        },
        "product_designation": {
            "food": "restaurant",
            "name": "restaurant",
            "company": "FoodData Central",
            "characteristics": [
                "latino",
                "pupusas con frijoles (pupusas",
                "bean)"
            ]
        },
        "serving_size": 126.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.918
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "piece"
        },
        "units": "g"
    },
    {
        "id": "foundation, 77d6177fc9214518b7ced248e776539e",
        "fundamental_nutrients": {
            "energy": 254,
            "carbohydrates": 43.1,
            "protein": 12.3,
            "fat": 3.55,
            "fiber": 6.0,
            "sodium": 0.45,
            "sugar": 4.41
        },
        "product_designation": {
            "food": "bread",
            "name": "bread",
            "company": "FoodData Central",
            "characteristics": [
                "whole-wheat",
                "commercially prepared"
            ]
        },
        "serving_size": 32.1,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.924
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "slice"
        },
        "units": "g"
    },
    {
        "id": "foundation, 00b893003a0247bf988c946c0666d8a5",
        "fundamental_nutrients": {
            "energy": 176,
            "carbohydrates": 0.0,
            "protein": 27.7,
            "fat": 6.36,
            "fiber": 0.0,
            "sodium": 0.054,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beef",
            "name": "beef",
            "company": "FoodData Central",
            "characteristics": [
                "loin",
                "tenderloin roast",
                "separable lean only",
                "boneless",
                "trimmed to 0\\" fat",
                "select",
                "cooked",
                "roasted"
            ]
        },
        "serving_size": 462.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.931
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "roast"
        },
        "units": "g"
    },
    {
        "id": "foundation, 7d7821b59a5244d89fbc214338701dce",
        "fundamental_nutrients": {
            "energy": 155,
            "carbohydrates": 0.0,
            "protein": 22.8,
            "fat": 6.39,
            "fiber": 0.0,
            "sodium": 0.045,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beef",
            "name": "beef",
            "company": "FoodData Central",
            "characteristics": [
                "loin",
                "top loin steak",
                "boneless",
                "lip-on",
                "separable lean only",
                "trimmed to 1/8\\" fat",
                "choice",
                "raw"
            ]
        },
        "serving_size": 284.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.928
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "steak"
        },
        "units": "g"
    },
    {
        "id": "foundation, efb421e4fc5240538cce8c8c841b9bdd",
        "fundamental_nutrients": {
            "energy": 122,
            "carbohydrates": 0.0,
            "protein": 23.4,
            "fat": 2.48,
            "fiber": 0.0,
            "sodium": 0.05,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beef",
            "name": "beef",
            "company": "FoodData Central",
            "characteristics": [
                "round",
                "eye of round roast",
                "boneless",
                "separable lean only",
                "trimmed to 0\\" fat",
                "select",
                "raw"
            ]
        },
        "serving_size": 690.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.93
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "roast"
        },
        "units": "g"
    },
    {
        "id": "foundation, b126e9221c0b437a9eea08f445bac9fa",
        "fundamental_nutrients": {
            "energy": 123,
            "carbohydrates": 0.0,
            "protein": 23.7,
            "fat": 2.41,
            "fiber": 0.0,
            "sodium": 0.055,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beef",
            "name": "beef",
            "company": "FoodData Central",
            "characteristics": [
                "round",
                "top round roast",
                "boneless",
                "separable lean only",
                "trimmed to 0\\" fat",
                "select",
                "raw"
            ]
        },
        "serving_size": 788.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.931
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "roast"
        },
        "units": "g"
    },
    {
        "id": "foundation, b1dc7d4602c24218b392dd184e8bab8a",
        "fundamental_nutrients": {
            "energy": 145,
            "carbohydrates": 0.0,
            "protein": 22.7,
            "fat": 5.32,
            "fiber": 0.0,
            "sodium": 0.043,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beef",
            "name": "beef",
            "company": "FoodData Central",
            "characteristics": [
                "short loin",
                "porterhouse steak",
                "separable lean only",
                "trimmed to 1/8\\" fat",
                "select",
                "raw"
            ]
        },
        "serving_size": 525.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.929
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "steak"
        },
        "units": "g"
    },
    {
        "id": "foundation, 6b833fa9ff514fb197aeaa1bf9c2af68",
        "fundamental_nutrients": {
            "energy": 219,
            "carbohydrates": 0.0,
            "protein": 27.3,
            "fat": 11.4,
            "fiber": 0.0,
            "sodium": 0.067,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beef",
            "name": "beef",
            "company": "FoodData Central",
            "characteristics": [
                "short loin",
                "t-bone steak",
                "bone-in",
                "separable lean only",
                "trimmed to 1/8\\" fat",
                "choice",
                "cooked",
                "grilled"
            ]
        },
        "serving_size": 360.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.928
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "steak"
        },
        "units": "g"
    },
    {
        "id": "foundation, 7d0723eab7a8479aac56059ce0097058",
        "fundamental_nutrients": {
            "energy": 37.0,
            "carbohydrates": 7.92,
            "protein": 0.81,
            "fat": 0.47,
            "fiber": 3.2,
            "sodium": 0.066,
            "sugar": 4.2
        },
        "product_designation": {
            "food": "carrots",
            "name": "carrots",
            "company": "FoodData Central",
            "characteristics": [
                "frozen",
                "unprepared"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.912
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 911804f7432d46efa1968081f3253ada",
        "fundamental_nutrients": {
            "energy": 326,
            "carbohydrates": 2.07,
            "protein": 24.5,
            "fat": 24.3,
            "fiber": 0.0,
            "sodium": 1.81,
            "sugar": 0.43
        },
        "product_designation": {
            "food": "cheese",
            "name": "cheese",
            "company": "FoodData Central",
            "characteristics": [
                "dry white",
                "queso seco"
            ]
        },
        "serving_size": 97.3,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.906
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, dd5294c3e5224f4995ce87126ee78133",
        "fundamental_nutrients": {
            "energy": 157,
            "carbohydrates": 6.86,
            "protein": 7.81,
            "fat": 11.0,
            "fiber": 0.0,
            "sodium": 0.105,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "cheese",
            "name": "cheese",
            "company": "FoodData Central",
            "characteristics": [
                "ricotta",
                "whole milk"
            ]
        },
        "serving_size": 64.6,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.914
            }
        },
        "serving_description": {
            "amount": 0.2,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, a8d9d45740ca49daac5825787582d021",
        "fundamental_nutrients": {
            "energy": 393,
            "carbohydrates": 1.44,
            "protein": 27.0,
            "fat": 31.0,
            "fiber": 0.0,
            "sodium": 0.185,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "cheese",
            "name": "cheese",
            "company": "FoodData Central",
            "characteristics": [
                "swiss"
            ]
        },
        "serving_size": 21.9,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.925
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "slice"
        },
        "units": "g"
    },
    {
        "id": "foundation, d1025cd35a8f41fea08f266f7621eda1",
        "fundamental_nutrients": {
            "energy": 249,
            "carbohydrates": 63.9,
            "protein": 3.3,
            "fat": 0.92,
            "fiber": 9.8,
            "sodium": 0.01,
            "sugar": 47.9
        },
        "product_designation": {
            "food": "figs",
            "name": "figs",
            "company": "FoodData Central",
            "characteristics": [
                "dried",
                "uncooked"
            ]
        },
        "serving_size": 8.4,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.78
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "each"
        },
        "units": "g"
    },
    {
        "id": "foundation, 2c9d78355a994ad2aa745a5f3c1cbc92",
        "fundamental_nutrients": {
            "energy": 17.0,
            "carbohydrates": 3.24,
            "protein": 1.24,
            "fat": 0.26,
            "fiber": 1.8,
            "sodium": 0.0,
            "sugar": 1.19
        },
        "product_designation": {
            "food": "lettuce",
            "name": "lettuce",
            "company": "FoodData Central",
            "characteristics": [
                "cos or romaine",
                "raw"
            ]
        },
        "serving_size": 581.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.917
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "bunch"
        },
        "units": "g"
    },
    {
        "id": "foundation, 60feb44e401a43a2955bd3d5dcf92277",
        "fundamental_nutrients": {
            "energy": 34.0,
            "carbohydrates": 8.16,
            "protein": 0.82,
            "fat": 0.18,
            "fiber": 0.8,
            "sodium": 0.03,
            "sugar": 7.88
        },
        "product_designation": {
            "food": "melons",
            "name": "melons",
            "company": "FoodData Central",
            "characteristics": [
                "cantaloupe",
                "raw"
            ]
        },
        "serving_size": 69.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.896
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "wedge"
        },
        "units": "g"
    },
    {
        "id": "foundation, 85d53b9cd2c040c8a3ab4d2f624cf47d",
        "fundamental_nutrients": {
            "energy": 47.0,
            "carbohydrates": 11.8,
            "protein": 0.91,
            "fat": 0.15,
            "fiber": 2.0,
            "sodium": 0.009,
            "sugar": 8.57
        },
        "product_designation": {
            "food": "oranges",
            "name": "oranges",
            "company": "FoodData Central",
            "characteristics": [
                "raw",
                "navels"
            ]
        },
        "serving_size": 165.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.899
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, 237d28c6f59e4e28ad5bf0bcd473d67a",
        "fundamental_nutrients": {
            "energy": 43.0,
            "carbohydrates": 5.18,
            "protein": 3.38,
            "fat": 0.95,
            "fiber": 0.0,
            "sodium": 0.039,
            "sugar": 4.96
        },
        "product_designation": {
            "food": "milk",
            "name": "milk",
            "company": "FoodData Central",
            "characteristics": [
                "lowfat",
                "fluid",
                "1% milkfat",
                "with added vitamin a and vitamin d"
            ]
        },
        "serving_size": 246.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.914
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, de417139c9c94ce285d3f5683f9188d8",
        "fundamental_nutrients": {
            "energy": 57.0,
            "carbohydrates": 15.1,
            "protein": 0.38,
            "fat": 0.16,
            "fiber": 3.1,
            "sodium": 0.007,
            "sugar": 9.69
        },
        "product_designation": {
            "food": "pears",
            "name": "pears",
            "company": "FoodData Central",
            "characteristics": [
                "raw",
                "bartlett"
            ]
        },
        "serving_size": 140.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.889
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, f4867fc2f25b43f4b77245ac38080678",
        "fundamental_nutrients": {
            "energy": 260,
            "carbohydrates": 25.5,
            "protein": 8.88,
            "fat": 13.6,
            "fiber": 1.0,
            "sodium": 0.304,
            "sugar": 10.3
        },
        "product_designation": {
            "food": "restaurant",
            "name": "restaurant",
            "company": "FoodData Central",
            "characteristics": [
                "chinese",
                "sweet and sour pork"
            ]
        },
        "serving_size": 611.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.901
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "order"
        },
        "units": "g"
    },
    {
        "id": "foundation, bca82ef6d1b949799155c60362ba5164",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0,
            "sodium": 38.7,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "salt",
            "name": "salt",
            "company": "FoodData Central",
            "characteristics": [
                "table",
                "iodized"
            ]
        },
        "serving_size": 6.1,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.5
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "teaspoon"
        },
        "units": "g"
    },
    {
        "id": "foundation, f972a3485599449daf9c9843aa4c3092",
        "fundamental_nutrients": {
            "energy": 34.0,
            "carbohydrates": 4.92,
            "protein": 3.43,
            "fat": 0.08,
            "fiber": 0.0,
            "sodium": 0.041,
            "sugar": 5.05
        },
        "product_designation": {
            "food": "milk",
            "name": "milk",
            "company": "FoodData Central",
            "characteristics": [
                "nonfat",
                "fluid",
                "with added vitamin a and vitamin d (fat free or skim)"
            ]
        },
        "serving_size": 246.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.914
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, 08ccd671ded14e1c800e3d9af088b43f",
        "fundamental_nutrients": {
            "energy": 29.0,
            "carbohydrates": 6.74,
            "protein": 1.44,
            "fat": 0.19,
            "fiber": 1.8,
            "sodium": 0.656,
            "sugar": 3.81
        },
        "product_designation": {
            "food": "sauce",
            "name": "sauce",
            "company": "FoodData Central",
            "characteristics": [
                "salsa",
                "ready-to-serve"
            ]
        },
        "serving_size": 35.7,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.894
            }
        },
        "serving_description": {
            "amount": 2.0,
            "units": "tablespoon"
        },
        "units": "g"
    },
    {
        "id": "foundation, 358f4d9cb22647ac8013d93038c0cb42",
        "fundamental_nutrients": {
            "energy": 50.0,
            "carbohydrates": 4.9,
            "protein": 3.36,
            "fat": 1.9,
            "fiber": 0.0,
            "sodium": 0.039,
            "sugar": 4.89
        },
        "product_designation": {
            "food": "milk",
            "name": "milk",
            "company": "FoodData Central",
            "characteristics": [
                "reduced fat",
                "fluid",
                "2% milkfat",
                "with added vitamin a and vitamin d"
            ]
        },
        "serving_size": 245.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.913
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, 3238a8398b3f4c9d9cb8274204049f5c",
        "fundamental_nutrients": {
            "energy": 328,
            "carbohydrates": 3.37,
            "protein": 13.3,
            "fat": 28.7,
            "fiber": 0.0,
            "sodium": 0.866,
            "sugar": 1.0
        },
        "product_designation": {
            "food": "sausage",
            "name": "sausage",
            "company": "FoodData Central",
            "characteristics": [
                "breakfast sausage",
                "beef",
                "pre-cooked",
                "unprepared"
            ]
        },
        "serving_size": 18.6,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.902
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "link"
        },
        "units": "g"
    },
    {
        "id": "foundation, 2c2f8ca5f629458eb9bf92d4deb8c96b",
        "fundamental_nutrients": {
            "energy": 322,
            "carbohydrates": 2.15,
            "protein": 18.2,
            "fat": 26.2,
            "fiber": 0.0,
            "sodium": 0.766,
            "sugar": 1.46
        },
        "product_designation": {
            "food": "sausage",
            "name": "sausage",
            "company": "FoodData Central",
            "characteristics": [
                "italian",
                "pork",
                "mild",
                "cooked",
                "pan-fried"
            ]
        },
        "serving_size": 86.6,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.905
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "link"
        },
        "units": "g"
    },
    {
        "id": "foundation, 1014337926fe4f33810c7198696452d7",
        "fundamental_nutrients": {
            "energy": 346,
            "carbohydrates": 2.63,
            "protein": 19.3,
            "fat": 28.1,
            "fiber": 0.0,
            "sodium": 0.983,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "sausage",
            "name": "sausage",
            "company": "FoodData Central",
            "characteristics": [
                "pork",
                "chorizo",
                "link or ground",
                "cooked",
                "pan-fried"
            ]
        },
        "serving_size": 186.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.9
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "link"
        },
        "units": "g"
    },
    {
        "id": "foundation, b26164aae01c4f8cbef5bff947b7a4e0",
        "fundamental_nutrients": {
            "energy": 60.0,
            "carbohydrates": 4.63,
            "protein": 3.27,
            "fat": 3.2,
            "fiber": 0.0,
            "sodium": 0.038,
            "sugar": 4.81
        },
        "product_designation": {
            "food": "milk",
            "name": "milk",
            "company": "FoodData Central",
            "characteristics": [
                "whole",
                "3.25% milkfat",
                "with added vitamin d"
            ]
        },
        "serving_size": 249.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.912
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, 2138e6a96c154a5a81d8d66ff9690f89",
        "fundamental_nutrients": {
            "energy": 169,
            "carbohydrates": 0.93,
            "protein": 16.7,
            "fat": 10.4,
            "fiber": 0.0,
            "sodium": 0.599,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "sausage",
            "name": "sausage",
            "company": "FoodData Central",
            "characteristics": [
                "turkey",
                "breakfast links",
                "mild",
                "raw"
            ]
        },
        "serving_size": 450.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.915
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "package"
        },
        "units": "g"
    },
    {
        "id": "foundation, cfcd4defffda4e94bc77c3c7f8a79e24",
        "fundamental_nutrients": {
            "energy": 385,
            "carbohydrates": 99.6,
            "protein": 0.0,
            "fat": 0.32,
            "fiber": 0.0,
            "sodium": 0.001,
            "sugar": 99.8
        },
        "product_designation": {
            "food": "sugars",
            "name": "sugars",
            "company": "FoodData Central",
            "characteristics": [
                "granulated"
            ]
        },
        "serving_size": 4.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.75
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "teaspoon"
        },
        "units": "g"
    },
    {
        "id": "foundation, fec64d16eab7467b8a1e18b28c2e0c34",
        "fundamental_nutrients": {
            "energy": 220,
            "carbohydrates": 0.0,
            "protein": 27.1,
            "fat": 11.6,
            "fiber": 0.0,
            "sodium": 0.09,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "turkey",
            "name": "turkey",
            "company": "FoodData Central",
            "characteristics": [
                "ground",
                "93% lean",
                "7% fat",
                "pan-broiled crumbles"
            ]
        },
        "serving_size": 155.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.927
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "paired cooked w"
        },
        "units": "g"
    },
    {
        "id": "foundation, 41d01518c569445a8b711b35654fadd4",
        "fundamental_nutrients": {
            "energy": 121,
            "carbohydrates": 2.36,
            "protein": 19.6,
            "fat": 3.68,
            "fiber": 0.0,
            "sodium": 1.03,
            "sugar": 2.2
        },
        "product_designation": {
            "food": "ham",
            "name": "ham",
            "company": "FoodData Central",
            "characteristics": [
                "sliced",
                "restaurant"
            ]
        },
        "serving_size": 16.2,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.911
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "slice"
        },
        "units": "g"
    },
    {
        "id": "foundation, 3b098264d5d24a2f94fb18b1a2863134",
        "fundamental_nutrients": {
            "energy": 375,
            "carbohydrates": 6.35,
            "protein": 17.5,
            "fat": 31.1,
            "fiber": 0.0,
            "sodium": 1.6,
            "sugar": 3.76
        },
        "product_designation": {
            "food": "cheese",
            "name": "cheese",
            "company": "FoodData Central",
            "characteristics": [
                "american",
                "restaurant"
            ]
        },
        "serving_size": 16.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.879
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "slice"
        },
        "units": "g"
    },
    {
        "id": "foundation, 6f294455bf324d1aa2233d5113bdb9cb",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 25.5,
            "fat": 1.04,
            "fiber": 4.3,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "medium red (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.959
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 2d6cf26f0b0f4462bd261a69885bf1d9",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 21.3,
            "fat": 1.16,
            "fiber": 4.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "red (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.953
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 711b3969c03c4955b1203dc457ecdbb9",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 23.3,
            "fat": 0.86,
            "fiber": 4.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "flor de mayo (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.955
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 285f1d0e970b46db86425e1703289c7f",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 25.6,
            "fat": 1.12,
            "fiber": 4.1,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "brown (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.957
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 144a9e84caed4ae29312e15c9287898c",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 26.8,
            "fat": 1.14,
            "fiber": 4.4,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "tan (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.961
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, a55772e560be4dff836decdac2bc9a7b",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 24.6,
            "fat": 1.28,
            "fiber": 4.3,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "light tan (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.957
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, ab8fdf89030241c3b8ed80b6efb98d80",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 25.2,
            "fat": 1.44,
            "fiber": 4.5,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "carioca (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.958
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 8ee6b71b39af4c29a5849145bf8fa510",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 24.4,
            "fat": 1.23,
            "fiber": 4.3,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "cranberry (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.954
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 772b89178e6d4e218a199c8bebb831b5",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 25.0,
            "fat": 1.03,
            "fiber": 4.5,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "light red kidney (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.955
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 0ad14d7d66a6432a82fbc5900826ce4f",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 23.4,
            "fat": 1.2,
            "fiber": 4.1,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "pink (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.955
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 2f59c17c4fb64399b76624d39015820f",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 25.9,
            "fat": 1.31,
            "fiber": 4.3,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "dark red kidney (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.956
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 49ab31519bfa42dcab2c161ac788d9f8",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 24.1,
            "fat": 1.51,
            "fiber": 4.3,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "navy (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.959
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, dd58f22947d84bb69d1c7ea8da44fa76",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 24.5,
            "fat": 1.32,
            "fiber": 4.3,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "small white (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.958
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 09df1f767e794364a160206f024e338f",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 23.5,
            "fat": 1.28,
            "fiber": 4.1,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "small red (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.955
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, c7fc6c8238c04dd6a2639a55fa27d616",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 24.4,
            "fat": 1.45,
            "fiber": 4.2,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "black (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.958
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 08d941ab492d4a618b37fb5cd2538451",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 23.7,
            "fat": 1.24,
            "fiber": 4.1,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "pinto (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.956
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 368c9bad3c9f432e9db766333b53df8b",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 24.7,
            "fat": 1.24,
            "fiber": 4.3,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "dry",
                "great northern (0% moisture)"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.958
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 89710005e4f54bafae7345e4cd3d9880",
        "fundamental_nutrients": {
            "energy": 31.0,
            "carbohydrates": 6.27,
            "protein": 2.57,
            "fat": 0.34,
            "fiber": 2.4,
            "sodium": 0.036,
            "sugar": 1.4
        },
        "product_designation": {
            "food": "broccoli",
            "name": "broccoli",
            "company": "FoodData Central",
            "characteristics": [
                "raw"
            ]
        },
        "serving_size": 76.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.927
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "cup"
        },
        "units": "g"
    },
    {
        "id": "foundation, ff4c9a545bf94985b47032e857bba5c4",
        "fundamental_nutrients": {
            "energy": 117,
            "carbohydrates": 26.8,
            "protein": 1.11,
            "fat": 0.55,
            "fiber": 0.0,
            "sodium": 0.949,
            "sugar": 21.8
        },
        "product_designation": {
            "food": "ketchup",
            "name": "ketchup",
            "company": "FoodData Central",
            "characteristics": [
                "restaurant"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.83
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, e397ef83c6d24a77a1eab76f88e2c836",
        "fundamental_nutrients": {
            "energy": 55.0,
            "carbohydrates": 2.36,
            "protein": 10.7,
            "fat": 0.0,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "eggs",
            "name": "eggs",
            "company": "FoodData Central",
            "characteristics": [
                "grade a",
                "large",
                "egg white"
            ]
        },
        "serving_size": 34.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.946
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "egg"
        },
        "units": "g"
    },
    {
        "id": "foundation, 8ad9e73e326946e5b5b665805d88d097",
        "fundamental_nutrients": {
            "energy": 334,
            "carbohydrates": 1.02,
            "protein": 16.2,
            "fat": 28.8,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "eggs",
            "name": "eggs",
            "company": "FoodData Central",
            "characteristics": [
                "grade a",
                "large",
                "egg yolk"
            ]
        },
        "serving_size": 17.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.931
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "egg"
        },
        "units": "g"
    },
    {
        "id": "foundation, 04fc0e0445bd4db087a32cd4ad8060ee",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "oil",
            "name": "oil",
            "company": "FoodData Central",
            "characteristics": [
                "canola"
            ]
        },
        "serving_size": 90.9,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.89
            }
        },
        "serving_description": {
            "amount": 100.0,
            "units": "milliliter"
        },
        "units": "g"
    },
    {
        "id": "foundation, e3c8cd9a08734f90abc6e185c5fd8c88",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "oil",
            "name": "oil",
            "company": "FoodData Central",
            "characteristics": [
                "corn"
            ]
        },
        "serving_size": 91.3,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.861
            }
        },
        "serving_description": {
            "amount": 100.0,
            "units": "milliliter"
        },
        "units": "g"
    },
    {
        "id": "foundation, c347bded1b8142308050465d4b76ed43",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "oil",
            "name": "oil",
            "company": "FoodData Central",
            "characteristics": [
                "soybean"
            ]
        },
        "serving_size": 91.3,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.855
            }
        },
        "serving_description": {
            "amount": 100.0,
            "units": "milliliter"
        },
        "units": "g"
    },
    {
        "id": "foundation, 22ff6b10e6a54c778e3d795d23f0a06c",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "oil",
            "name": "oil",
            "company": "FoodData Central",
            "characteristics": [
                "olive",
                "extra virgin"
            ]
        },
        "serving_size": 90.7,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.853
            }
        },
        "serving_description": {
            "amount": 100.0,
            "units": "milliliter"
        },
        "units": "g"
    },
    {
        "id": "foundation, b6bf9b67c98d47f88716581c16bf2c2b",
        "fundamental_nutrients": {
            "energy": 148,
            "carbohydrates": 0.96,
            "protein": 12.4,
            "fat": 9.96,
            "fiber": 0.0,
            "sodium": 0.129,
            "sugar": 0.2
        },
        "product_designation": {
            "food": "eggs",
            "name": "eggs",
            "company": "FoodData Central",
            "characteristics": [
                "grade a",
                "large",
                "egg whole"
            ]
        },
        "serving_size": 50.3,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.906
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "egg"
        },
        "units": "g"
    },
    {
        "id": "foundation, 7639dea274384330b327d9c473a0868a",
        "fundamental_nutrients": {
            "energy": 500,
            "carbohydrates": 2.1,
            "protein": 40.9,
            "fat": 36.5,
            "fiber": 0.0,
            "sodium": 1.83,
            "sugar": 3.14
        },
        "product_designation": {
            "food": "pork",
            "name": "pork",
            "company": "FoodData Central",
            "characteristics": [
                "cured",
                "bacon",
                "cooked",
                "restaurant"
            ]
        },
        "serving_size": 6.3,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.893
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "slice"
        },
        "units": "g"
    },
    {
        "id": "foundation, 5bef1f943a524df3a6456c38b763f7be",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 0.0,
            "fat": 81.5,
            "fiber": 0.0,
            "sodium": 0.01,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "butter",
            "name": "butter",
            "company": "FoodData Central",
            "characteristics": [
                "stick",
                "unsalted"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.887
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, c61a43abe637474fa72d8f11a47d1d74",
        "fundamental_nutrients": {
            "energy": 366,
            "carbohydrates": 77.3,
            "protein": 10.9,
            "fat": 1.48,
            "fiber": 0.0,
            "sodium": 0.002,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "wheat",
                "all-purpose",
                "enriched",
                "bleached"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.933
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 488506d8e0314e4b98e4faf8178f57a4",
        "fundamental_nutrients": {
            "energy": 358,
            "carbohydrates": 73.2,
            "protein": 13.1,
            "fat": 1.48,
            "fiber": 0.0,
            "sodium": 0.004,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "wheat",
                "all-purpose",
                "enriched",
                "unbleached"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.935
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, b1bb95cde4b7482cac97b2e50a1d55b0",
        "fundamental_nutrients": {
            "energy": 362,
            "carbohydrates": 74.6,
            "protein": 12.0,
            "fat": 1.7,
            "fiber": 3.0,
            "sodium": 0.002,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "wheat",
                "all-purpose",
                "unenriched",
                "unbleached"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.931
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 0ed6ba916a3346cdaa8a227a8ea7b414",
        "fundamental_nutrients": {
            "energy": 370,
            "carbohydrates": 71.2,
            "protein": 15.1,
            "fat": 2.73,
            "fiber": 10.6,
            "sodium": 0.003,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "whole wheat",
                "unenriched"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.952
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, beb0678ab40342dfb03d6f5ec2410e4d",
        "fundamental_nutrients": {
            "energy": 363,
            "carbohydrates": 72.8,
            "protein": 14.3,
            "fat": 1.65,
            "fiber": 0.0,
            "sodium": 0.003,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "bread",
                "white",
                "enriched",
                "unbleached"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.935
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 79bf71cfbc694b7eb9249d23038e07b5",
        "fundamental_nutrients": {
            "energy": 359,
            "carbohydrates": 79.8,
            "protein": 6.94,
            "fat": 1.3,
            "fiber": 0.5,
            "sodium": 0.005,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "rice",
                "white",
                "unenriched"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.925
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 6363f93921674a9e8b1e67daebc878f3",
        "fundamental_nutrients": {
            "energy": 364,
            "carbohydrates": 80.8,
            "protein": 6.2,
            "fat": 1.74,
            "fiber": 4.3,
            "sodium": 0.0,
            "sugar": 1.04
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "corn",
                "yellow",
                "fine meal",
                "enriched"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.924
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 3a979d7956954454af5f50cafe89fdc6",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 0.0,
            "fat": 82.2,
            "fiber": 0.0,
            "sodium": 0.524,
            "sugar": 0.58
        },
        "product_designation": {
            "food": "butter",
            "name": "butter",
            "company": "FoodData Central",
            "characteristics": [
                "stick",
                "salted"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.854
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, f5d4505c509a4c2da852a8f8cbc953f2",
        "fundamental_nutrients": {
            "energy": 44.0,
            "carbohydrates": 9.93,
            "protein": 0.94,
            "fat": 0.1,
            "fiber": 2.2,
            "sodium": 0.001,
            "sugar": 5.76
        },
        "product_designation": {
            "food": "onions",
            "name": "onions",
            "company": "FoodData Central",
            "characteristics": [
                "red",
                "raw"
            ]
        },
        "serving_size": 197.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.903
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "Onion"
        },
        "units": "g"
    },
    {
        "id": "foundation, 0d619968aee248b59b888a4ea8be0042",
        "fundamental_nutrients": {
            "energy": 38.0,
            "carbohydrates": 8.61,
            "protein": 0.83,
            "fat": 0.05,
            "fiber": 1.9,
            "sodium": 0.001,
            "sugar": 5.82
        },
        "product_designation": {
            "food": "onions",
            "name": "onions",
            "company": "FoodData Central",
            "characteristics": [
                "yellow",
                "raw"
            ]
        },
        "serving_size": 143.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.902
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "Onion"
        },
        "units": "g"
    },
    {
        "id": "foundation, 58d2109ed0b649a5b291eb94594a902f",
        "fundamental_nutrients": {
            "energy": 143,
            "carbohydrates": 28.2,
            "protein": 6.62,
            "fat": 0.38,
            "fiber": 2.7,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "garlic",
            "name": "garlic",
            "company": "FoodData Central",
            "characteristics": [
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.929
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 18b5658147f945faa072ddc8ef8a09a1",
        "fundamental_nutrients": {
            "energy": 366,
            "carbohydrates": 32.9,
            "protein": 51.1,
            "fat": 3.33,
            "fiber": 0.0,
            "sodium": 0.002,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "soy",
                "defatted"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 1.0
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 42cd4f5d83b54177a94c0947226b1ce8",
        "fundamental_nutrients": {
            "energy": 452,
            "carbohydrates": 27.9,
            "protein": 38.6,
            "fat": 20.7,
            "fiber": 0.0,
            "sodium": 0.002,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "soy",
                "full-fat"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.978
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 938d5421385246098c46a0041f3e3cf3",
        "fundamental_nutrients": {
            "energy": 365,
            "carbohydrates": 75.5,
            "protein": 7.19,
            "fat": 3.85,
            "fiber": 0.0,
            "sodium": 0.001,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "rice",
                "brown"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.94
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 7eada977df4b4dec906496b8d66c50d7",
        "fundamental_nutrients": {
            "energy": 358,
            "carbohydrates": 80.1,
            "protein": 6.69,
            "fat": 1.16,
            "fiber": 0.0,
            "sodium": 0.006,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "rice",
                "glutinous"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.927
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, ced4d3b54a894ad2be018aaddf972ea8",
        "fundamental_nutrients": {
            "energy": 358,
            "carbohydrates": 77.2,
            "protein": 8.75,
            "fat": 1.64,
            "fiber": 0.0,
            "sodium": 0.001,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "pastry",
                "unenriched",
                "unbleached"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.928
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 7543ee29b5fa4993b7fa32f24d7ceb50",
        "fundamental_nutrients": {
            "energy": 35.0,
            "carbohydrates": 7.68,
            "protein": 0.89,
            "fat": 0.13,
            "fiber": 1.2,
            "sodium": 0.002,
            "sugar": 5.76
        },
        "product_designation": {
            "food": "onions",
            "name": "onions",
            "company": "FoodData Central",
            "characteristics": [
                "white",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.902
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 061fe809367947738162b076b7c4632d",
        "fundamental_nutrients": {
            "energy": 85.0,
            "carbohydrates": 20.1,
            "protein": 0.73,
            "fat": 0.22,
            "fiber": 1.7,
            "sodium": 0.0,
            "sugar": 15.8
        },
        "product_designation": {
            "food": "bananas",
            "name": "bananas",
            "company": "FoodData Central",
            "characteristics": [
                "overripe",
                "raw"
            ]
        },
        "serving_size": 110.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.839
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "Banana"
        },
        "units": "g"
    },
    {
        "id": "foundation, f31822aabd8a446aa584bdb5d755d58d",
        "fundamental_nutrients": {
            "energy": 97.0,
            "carbohydrates": 23.0,
            "protein": 0.74,
            "fat": 0.29,
            "fiber": 1.7,
            "sodium": 0.0,
            "sugar": 15.8
        },
        "product_designation": {
            "food": "bananas",
            "name": "bananas",
            "company": "FoodData Central",
            "characteristics": [
                "ripe and slightly ripe",
                "raw"
            ]
        },
        "serving_size": 115.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.872
            }
        },
        "serving_description": {
            "amount": 1.0,
            "units": "Banana"
        },
        "units": "g"
    },
    {
        "id": "foundation, 3c02c2683d374121a9f091f21e0419da",
        "fundamental_nutrients": {
            "energy": 61.8,
            "carbohydrates": 14.8,
            "protein": 0.188,
            "fat": 0.212,
            "fiber": 2.04,
            "sodium": 0.0,
            "sugar": 12.2
        },
        "product_designation": {
            "food": "apples",
            "name": "apples",
            "company": "FoodData Central",
            "characteristics": [
                "red delicious",
                "with skin",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.881
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, ef2847a54d2b4ceb8af777f93590e632",
        "fundamental_nutrients": {
            "energy": 64.7,
            "carbohydrates": 15.7,
            "protein": 0.148,
            "fat": 0.162,
            "fiber": 2.08,
            "sodium": 0.00101,
            "sugar": 13.3
        },
        "product_designation": {
            "food": "apples",
            "name": "apples",
            "company": "FoodData Central",
            "characteristics": [
                "fuji",
                "with skin",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.877
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 3a82aebfda4042d8abe1589de3e078d3",
        "fundamental_nutrients": {
            "energy": 61.0,
            "carbohydrates": 14.8,
            "protein": 0.133,
            "fat": 0.15,
            "fiber": 2.11,
            "sodium": 0.000279,
            "sugar": 11.8
        },
        "product_designation": {
            "food": "apples",
            "name": "apples",
            "company": "FoodData Central",
            "characteristics": [
                "gala",
                "with skin",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.882
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 4d94c9f64d804dadb1807567ea2b75bd",
        "fundamental_nutrients": {
            "energy": 58.9,
            "carbohydrates": 14.1,
            "protein": 0.266,
            "fat": 0.138,
            "fiber": 2.51,
            "sodium": 0.0,
            "sugar": 10.6
        },
        "product_designation": {
            "food": "apples",
            "name": "apples",
            "company": "FoodData Central",
            "characteristics": [
                "granny smith",
                "with skin",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.886
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 45434a34fadc4a339d8c0ec686b93ed6",
        "fundamental_nutrients": {
            "energy": 60.0,
            "carbohydrates": 14.7,
            "protein": 0.102,
            "fat": 0.1,
            "fiber": 1.72,
            "sodium": 0.00013800000000000002,
            "sugar": 12.4
        },
        "product_designation": {
            "food": "apples",
            "name": "apples",
            "company": "FoodData Central",
            "characteristics": [
                "honeycrisp",
                "with skin",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.88
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 9f532538c2554995bc810d99ef2f66bd",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "oil",
            "name": "oil",
            "company": "FoodData Central",
            "characteristics": [
                "peanut"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.849
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, afe220a69269460eb0255546ce2e6e02",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "oil",
            "name": "oil",
            "company": "FoodData Central",
            "characteristics": [
                "sunflower"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.88
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 905cd1dedd6843cf8cff7ebf84ad738f",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "oil",
            "name": "oil",
            "company": "FoodData Central",
            "characteristics": [
                "safflower"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.885
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, acd4d545f2f64e1087e7af077fb2da7c",
        "fundamental_nutrients": {
            "energy": 0.0,
            "carbohydrates": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "oil",
            "name": "oil",
            "company": "FoodData Central",
            "characteristics": [
                "olive",
                "extra light"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.851
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 0efb8718caf74662b90606af5e2db0e9",
        "fundamental_nutrients": {
            "energy": 42.7,
            "carbohydrates": 7.59,
            "protein": 2.5,
            "fat": 0.256,
            "fiber": 4.38,
            "sodium": 0.00033600000000000004,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "mushroom",
            "name": "mushroom",
            "company": "FoodData Central",
            "characteristics": [
                "lion's mane"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.924
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, e0636eccb1bf4927a9210fc1f1d767a3",
        "fundamental_nutrients": {
            "energy": 41.0,
            "carbohydrates": 6.94,
            "protein": 2.9,
            "fat": 0.188,
            "fiber": 2.85,
            "sodium": 0.00113,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "mushroom",
            "name": "mushroom",
            "company": "FoodData Central",
            "characteristics": [
                "oyster"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, e87991d0fc664085adc1646a00370980",
        "fundamental_nutrients": {
            "energy": 44.1,
            "carbohydrates": 8.17,
            "protein": 2.41,
            "fat": 0.195,
            "fiber": 4.17,
            "sodium": 0.0009360000000000001,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "mushrooms",
            "name": "mushrooms",
            "company": "FoodData Central",
            "characteristics": [
                "shiitake"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 27204f38b45849bda125224e0df5dc32",
        "fundamental_nutrients": {
            "energy": 31.2,
            "carbohydrates": 4.08,
            "protein": 2.89,
            "fat": 0.371,
            "fiber": 1.72,
            "sodium": 0.00644,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "mushrooms",
            "name": "mushrooms",
            "company": "FoodData Central",
            "characteristics": [
                "white button"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, c2d3b4850b244fb58fe21070f7d2e607",
        "fundamental_nutrients": {
            "energy": 38.5,
            "carbohydrates": 1.29,
            "protein": 3.55,
            "fat": 2.12,
            "fiber": 0.0,
            "sodium": 0.0343,
            "sugar": 0.557
        },
        "product_designation": {
            "food": "soy milk",
            "name": "soy milk",
            "company": "FoodData Central",
            "characteristics": [
                "unsweetened",
                "plain",
                "shelf stable"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.921
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 36d163ab54964ac0becf987ea188b0d0",
        "fundamental_nutrients": {
            "energy": 14.6,
            "carbohydrates": 0.337,
            "protein": 0.555,
            "fat": 1.22,
            "fiber": 0.0,
            "sodium": 0.0596,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "almond milk",
            "name": "almond milk",
            "company": "FoodData Central",
            "characteristics": [
                "unsweetened",
                "plain",
                "shelf stable"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.919
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, f5a98608c5204a929034b8a1b1c00c63",
        "fundamental_nutrients": {
            "energy": 26.6,
            "carbohydrates": 2.41,
            "protein": 2.85,
            "fat": 0.619,
            "fiber": 1.56,
            "sodium": 0.111,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "spinach",
            "name": "spinach",
            "company": "FoodData Central",
            "characteristics": [
                "baby"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.925
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 5632f7d5c46f43ff90e9ff99dd1e4239",
        "fundamental_nutrients": {
            "energy": 27.6,
            "carbohydrates": 2.64,
            "protein": 2.91,
            "fat": 0.604,
            "fiber": 1.59,
            "sodium": 0.107,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "spinach",
            "name": "spinach",
            "company": "FoodData Central",
            "characteristics": [
                "mature"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.926
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 04c9421af9494781b7983f0267047539",
        "fundamental_nutrients": {
            "energy": 22.0,
            "carbohydrates": 3.84,
            "protein": 0.696,
            "fat": 0.425,
            "fiber": 0.971,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "tomato",
            "name": "tomato",
            "company": "FoodData Central",
            "characteristics": [
                "roma"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.921
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, e67ece687c904536b550184943b4bfe8",
        "fundamental_nutrients": {
            "energy": 357,
            "carbohydrates": 74.4,
            "protein": 11.4,
            "fat": 1.52,
            "fiber": 2.66,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "00"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.929
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 8123a70715f3407fafb45843c7768c93",
        "fundamental_nutrients": {
            "energy": 364,
            "carbohydrates": 70.7,
            "protein": 14.5,
            "fat": 2.54,
            "fiber": 9.34,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "spelt",
                "whole grain"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.949
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, a328620f87f1460ab85fef747d89ab6e",
        "fundamental_nutrients": {
            "energy": 357,
            "carbohydrates": 73.8,
            "protein": 11.7,
            "fat": 1.6,
            "fiber": 3.22,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "semolina",
                "coarse and semi-coarse"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.93
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 40f7941129724097a75bffa807f7a94d",
        "fundamental_nutrients": {
            "energy": 358,
            "carbohydrates": 72.0,
            "protein": 13.3,
            "fat": 1.84,
            "fiber": 3.68,
            "sodium": 0.000426,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "semolina",
                "fine"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.933
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 7d77c2c41fda4498acf5f0f4387a4935",
        "fundamental_nutrients": {
            "energy": 48.4,
            "carbohydrates": 11.4,
            "protein": 0.086,
            "fat": 0.286,
            "fiber": 0.0,
            "sodium": 0.00487,
            "sugar": 10.3
        },
        "product_designation": {
            "food": "apple juice",
            "name": "apple juice",
            "company": "FoodData Central",
            "characteristics": [
                "with added vitamin c",
                "from concentrate",
                "shelf stable"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.891
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, bf43c20893a74df5a53c0f8cb7057ffa",
        "fundamental_nutrients": {
            "energy": 47.2,
            "carbohydrates": 10.3,
            "protein": 0.734,
            "fat": 0.325,
            "fiber": 0.0,
            "sodium": 0.00523,
            "sugar": 8.28
        },
        "product_designation": {
            "food": "orange juice",
            "name": "orange juice",
            "company": "FoodData Central",
            "characteristics": [
                "no pulp",
                "not fortified",
                "from concentrate",
                "refrigerated"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.896
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 611479b3461d46f7b9e8081cef98392c",
        "fundamental_nutrients": {
            "energy": 66.1,
            "carbohydrates": 15.6,
            "protein": 0.258,
            "fat": 0.288,
            "fiber": 0.0,
            "sodium": 0.004019999999999999,
            "sugar": 14.0
        },
        "product_designation": {
            "food": "grape juice",
            "name": "grape juice",
            "company": "FoodData Central",
            "characteristics": [
                "purple",
                "with added vitamin c",
                "from concentrate",
                "shelf stable"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.879
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 2d9c8f9c394b42d0b6d3f6f2fb170b67",
        "fundamental_nutrients": {
            "energy": 66.1,
            "carbohydrates": 15.8,
            "protein": 0.094,
            "fat": 0.265,
            "fiber": 0.0,
            "sodium": 0.00719,
            "sugar": 14.4
        },
        "product_designation": {
            "food": "grape juice",
            "name": "grape juice",
            "company": "FoodData Central",
            "characteristics": [
                "white",
                "with added vitamin c",
                "from concentrate",
                "shelf stable"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.879
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, a30a472f23b94d39a363666cfc6183eb",
        "fundamental_nutrients": {
            "energy": 32.1,
            "carbohydrates": 7.26,
            "protein": 0.0,
            "fat": 0.338,
            "fiber": 0.0,
            "sodium": 0.00634,
            "sugar": 3.41
        },
        "product_designation": {
            "food": "cranberry juice",
            "name": "cranberry juice",
            "company": "FoodData Central",
            "characteristics": [
                "not fortified",
                "from concentrate",
                "shelf stable"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.907
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 7e95082689b842149f605e662d2a17eb",
        "fundamental_nutrients": {
            "energy": 41.1,
            "carbohydrates": 9.1,
            "protein": 0.57,
            "fat": 0.267,
            "fiber": 0.0,
            "sodium": 0.00103,
            "sugar": 7.12
        },
        "product_designation": {
            "food": "grapefruit juice",
            "name": "grapefruit juice",
            "company": "FoodData Central",
            "characteristics": [
                "red",
                "not fortified",
                "not from concentrate",
                "refrigerated"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.899
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, a541d445380f4bab8d8e4a5b6495f670",
        "fundamental_nutrients": {
            "energy": 23.3,
            "carbohydrates": 4.32,
            "protein": 0.859,
            "fat": 0.288,
            "fiber": 0.0,
            "sodium": 0.236,
            "sugar": 2.57
        },
        "product_designation": {
            "food": "tomato juice",
            "name": "tomato juice",
            "company": "FoodData Central",
            "characteristics": [
                "with added ingredients",
                "from concentrate",
                "shelf stable"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.912
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 18f7fec0552b4168ae90ddae5600e068",
        "fundamental_nutrients": {
            "energy": 46.5,
            "carbohydrates": 10.0,
            "protein": 0.812,
            "fat": 0.356,
            "fiber": 0.0,
            "sodium": 7.5e-05,
            "sugar": 8.08
        },
        "product_designation": {
            "food": "orange juice",
            "name": "orange juice",
            "company": "FoodData Central",
            "characteristics": [
                "no pulp",
                "not fortified",
                "not from concentrate",
                "refrigerated"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.897
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 834b50343b704d6d9786a8dd014fb703",
        "fundamental_nutrients": {
            "energy": 32.4,
            "carbohydrates": 4.66,
            "protein": 2.75,
            "fat": 0.312,
            "fiber": 1.88,
            "sodium": 0.00531,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "mushroom",
            "name": "mushroom",
            "company": "FoodData Central",
            "characteristics": [
                "portabella"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.922
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, f7a572107111493f825dcd4a1ea031ca",
        "fundamental_nutrients": {
            "energy": 46.4,
            "carbohydrates": 8.5,
            "protein": 2.41,
            "fat": 0.308,
            "fiber": 3.01,
            "sodium": 0.000771,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "mushroom",
            "name": "mushroom",
            "company": "FoodData Central",
            "characteristics": [
                "king oyster"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.922
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, c185094e9b21440d8ef79cc25918cc01",
        "fundamental_nutrients": {
            "energy": 44.4,
            "carbohydrates": 8.14,
            "protein": 2.42,
            "fat": 0.245,
            "fiber": 2.94,
            "sodium": 0.000417,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "mushroom",
            "name": "mushroom",
            "company": "FoodData Central",
            "characteristics": [
                "enoki"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, d4e316ec70094a11b91a4d99c80bb2aa",
        "fundamental_nutrients": {
            "energy": 30.2,
            "carbohydrates": 4.01,
            "protein": 3.09,
            "fat": 0.197,
            "fiber": 1.78,
            "sodium": 0.00457,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "mushroom",
            "name": "mushroom",
            "company": "FoodData Central",
            "characteristics": [
                "crimini"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 741f9f5c27194b759d9a020e1b578173",
        "fundamental_nutrients": {
            "energy": 37.6,
            "carbohydrates": 6.6,
            "protein": 2.2,
            "fat": 0.265,
            "fiber": 3.07,
            "sodium": 0.000345,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "mushroom",
            "name": "mushroom",
            "company": "FoodData Central",
            "characteristics": [
                "maitake"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, ff8ab7245ee74f8b9a86ccc403aff9e9",
        "fundamental_nutrients": {
            "energy": 39.8,
            "carbohydrates": 6.76,
            "protein": 2.18,
            "fat": 0.449,
            "fiber": 3.14,
            "sodium": 0.000891,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "mushroom",
            "name": "mushroom",
            "company": "FoodData Central",
            "characteristics": [
                "beech"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, c7c2512ba9584171931b7d12744c2975",
        "fundamental_nutrients": {
            "energy": 39.2,
            "carbohydrates": 5.76,
            "protein": 3.5,
            "fat": 0.24,
            "fiber": 2.75,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "mushroom",
            "name": "mushroom",
            "company": "FoodData Central",
            "characteristics": [
                "pioppini"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.924
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, d942c6f007174d959348f6ab30c00a80",
        "fundamental_nutrients": {
            "energy": 40.7,
            "carbohydrates": 3.0,
            "protein": 2.78,
            "fat": 1.96,
            "fiber": 0.0,
            "sodium": 0.0394,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "soy milk",
            "name": "soy milk",
            "company": "FoodData Central",
            "characteristics": [
                "sweetened",
                "plain",
                "refrigerated"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.92
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 0cad21564408448a857d3dc149ee9a2d",
        "fundamental_nutrients": {
            "energy": 19.3,
            "carbohydrates": 0.671,
            "protein": 0.656,
            "fat": 1.56,
            "fiber": 0.0,
            "sodium": 0.0592,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "almond milk",
            "name": "almond milk",
            "company": "FoodData Central",
            "characteristics": [
                "unsweetened",
                "plain",
                "refrigerated"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.917
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 59d63963f2df47bcb2a9f5289635648d",
        "fundamental_nutrients": {
            "energy": 48.3,
            "carbohydrates": 5.1,
            "protein": 0.797,
            "fat": 2.75,
            "fiber": 0.0,
            "sodium": 0.042,
            "sugar": 2.32
        },
        "product_designation": {
            "food": "oat milk",
            "name": "oat milk",
            "company": "FoodData Central",
            "characteristics": [
                "unsweetened",
                "plain",
                "refrigerated"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.912
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 7b266d3266574a658254086568dc98c7",
        "fundamental_nutrients": {
            "energy": 48.0,
            "carbohydrates": 10.3,
            "protein": 0.941,
            "fat": 0.351,
            "fiber": 3.1,
            "sodium": 0.0866,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "carrots",
            "name": "carrots",
            "company": "FoodData Central",
            "characteristics": [
                "mature",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.918
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 7ac8b2f8af0b4d5e82e4dbe9431bfa7c",
        "fundamental_nutrients": {
            "energy": 40.8,
            "carbohydrates": 9.08,
            "protein": 0.805,
            "fat": 0.138,
            "fiber": 2.69,
            "sodium": 0.0627,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "carrots",
            "name": "carrots",
            "company": "FoodData Central",
            "characteristics": [
                "baby",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.919
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 72b35c1b97ce46ff8b5f446a56f59eea",
        "fundamental_nutrients": {
            "energy": 22.9,
            "carbohydrates": 4.78,
            "protein": 0.715,
            "fat": 0.106,
            "fiber": 0.942,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "peppers",
            "name": "peppers",
            "company": "FoodData Central",
            "characteristics": [
                "bell",
                "green",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.929
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 883b0a5fb8d44941822f131a94cf63f6",
        "fundamental_nutrients": {
            "energy": 30.8,
            "carbohydrates": 6.6,
            "protein": 0.819,
            "fat": 0.121,
            "fiber": 1.07,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "peppers",
            "name": "peppers",
            "company": "FoodData Central",
            "characteristics": [
                "bell",
                "yellow",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.933
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 86b9ae3eacad4ab494d9a94109af3e28",
        "fundamental_nutrients": {
            "energy": 31.3,
            "carbohydrates": 6.65,
            "protein": 0.896,
            "fat": 0.126,
            "fiber": 1.16,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "peppers",
            "name": "peppers",
            "company": "FoodData Central",
            "characteristics": [
                "bell",
                "red",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.934
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 286428126af644e293e2b480b51bb8f6",
        "fundamental_nutrients": {
            "energy": 31.7,
            "carbohydrates": 6.7,
            "protein": 0.882,
            "fat": 0.156,
            "fiber": 0.967,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "peppers",
            "name": "peppers",
            "company": "FoodData Central",
            "characteristics": [
                "bell",
                "orange",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.935
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 753d385b663b400da6d95c2576c25881",
        "fundamental_nutrients": {
            "energy": 42.8,
            "carbohydrates": 4.81,
            "protein": 3.46,
            "fat": 1.08,
            "fiber": 0.0,
            "sodium": 0.0925,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "buttermilk",
            "name": "buttermilk",
            "company": "FoodData Central",
            "characteristics": [
                "low fat"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.92
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 32c0c062db55444cbfde5e401f950755",
        "fundamental_nutrients": {
            "energy": 78.0,
            "carbohydrates": 5.57,
            "protein": 3.82,
            "fat": 4.48,
            "fiber": 0.0,
            "sodium": 0.0418,
            "sugar": 4.09
        },
        "product_designation": {
            "food": "yogurt",
            "name": "yogurt",
            "company": "FoodData Central",
            "characteristics": [
                "plain",
                "whole milk"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.913
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 300c9919faff4d5294e58ce703988c7f",
        "fundamental_nutrients": {
            "energy": 93.7,
            "carbohydrates": 4.75,
            "protein": 8.78,
            "fat": 4.39,
            "fiber": 0.0,
            "sodium": 0.0338,
            "sugar": 3.25
        },
        "product_designation": {
            "food": "yogurt",
            "name": "yogurt",
            "company": "FoodData Central",
            "characteristics": [
                "greek",
                "plain",
                "whole milk"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.917
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, d9bd65d6d57545918c3cd0ace21cf388",
        "fundamental_nutrients": {
            "energy": 403,
            "carbohydrates": 4.33,
            "protein": 30.1,
            "fat": 29.5,
            "fiber": 0.0,
            "sodium": 1.05,
            "sugar": 0.638
        },
        "product_designation": {
            "food": "cheese",
            "name": "cheese",
            "company": "FoodData Central",
            "characteristics": [
                "parmesan",
                "grated",
                "refrigerated"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.919
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 6d4d58f81b924ac5bd8638916f0a02ff",
        "fundamental_nutrients": {
            "energy": 273,
            "carbohydrates": 5.58,
            "protein": 19.7,
            "fat": 19.1,
            "fiber": 0.0,
            "sodium": 1.03,
            "sugar": 1.63
        },
        "product_designation": {
            "food": "cheese",
            "name": "cheese",
            "company": "FoodData Central",
            "characteristics": [
                "feta",
                "whole milk",
                "crumbled"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.908
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 0511ef9bbb57445eab5999b3d724f337",
        "fundamental_nutrients": {
            "energy": 622,
            "carbohydrates": 16.2,
            "protein": 26.2,
            "fat": 50.2,
            "fiber": 9.27,
            "sodium": 0.000894,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "almond"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.946
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 08cc681ee1884c78a7761fc53205e7fe",
        "fundamental_nutrients": {
            "energy": 389,
            "carbohydrates": 69.9,
            "protein": 13.2,
            "fat": 6.31,
            "fiber": 10.5,
            "sodium": 0.00362,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "oat",
                "whole grain"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.948
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, b589573afcd4404e9b2b3efd7b829a71",
        "fundamental_nutrients": {
            "energy": 361,
            "carbohydrates": 79.9,
            "protein": 8.11,
            "fat": 0.951,
            "fiber": 5.4,
            "sodium": 0.047700000000000006,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "potato"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.938
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, db7111592be9465aa7b7aa4ec99771e2",
        "fundamental_nutrients": {
            "energy": 632,
            "carbohydrates": 22.7,
            "protein": 24.0,
            "fat": 49.4,
            "fiber": 6.32,
            "sodium": 0.221,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "peanut butter",
            "name": "peanut butter",
            "company": "FoodData Central",
            "characteristics": [
                "creamy"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.922
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 8f32a7a5c8c6498ba2920bd6ac79cbe9",
        "fundamental_nutrients": {
            "energy": 697,
            "carbohydrates": 14.2,
            "protein": 19.7,
            "fat": 62.4,
            "fiber": 8.37,
            "sodium": 0.0636,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "sesame butter",
            "name": "sesame butter",
            "company": "FoodData Central",
            "characteristics": [
                "creamy"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.939
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, d7050a564cb04a898916619475c504da",
        "fundamental_nutrients": {
            "energy": 645,
            "carbohydrates": 21.2,
            "protein": 20.8,
            "fat": 53.0,
            "fiber": 9.72,
            "sodium": 0.000996,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "almond butter",
            "name": "almond butter",
            "company": "FoodData Central",
            "characteristics": [
                "creamy"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.945
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 8bfdb05b23c74c038202f9b810a5139e",
        "fundamental_nutrients": {
            "energy": 545,
            "carbohydrates": 34.4,
            "protein": 18.0,
            "fat": 37.3,
            "fiber": 23.1,
            "sodium": 0.0367,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flaxseed",
            "name": "flaxseed",
            "company": "FoodData Central",
            "characteristics": [
                "ground"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.963
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 5b19d6fbb55142fca30e16400f7952fb",
        "fundamental_nutrients": {
            "energy": 103,
            "carbohydrates": 4.6,
            "protein": 11.6,
            "fat": 4.22,
            "fiber": 0.0,
            "sodium": 0.35,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "cottage cheese",
            "name": "cottage cheese",
            "company": "FoodData Central",
            "characteristics": [
                "full fat",
                "large or small curd"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.917
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 207a89a7b06a45b6ba257aff282a5e7f",
        "fundamental_nutrients": {
            "energy": 343,
            "carbohydrates": 4.56,
            "protein": 5.79,
            "fat": 33.5,
            "fiber": 0.0,
            "sodium": 0.368,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "cream cheese",
            "name": "cream cheese",
            "company": "FoodData Central",
            "characteristics": [
                "full fat",
                "block"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.884
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 9030a598122f4643ade33df092a24143",
        "fundamental_nutrients": {
            "energy": 343,
            "carbohydrates": 3.8,
            "protein": 2.02,
            "fat": 35.6,
            "fiber": 0.0,
            "sodium": 0.0206,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "cream",
            "name": "cream",
            "company": "FoodData Central",
            "characteristics": [
                "heavy"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.884
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, ca92d315117f4cffb113b428812f273f",
        "fundamental_nutrients": {
            "energy": 196,
            "carbohydrates": 5.56,
            "protein": 3.07,
            "fat": 18.0,
            "fiber": 0.0,
            "sodium": 0.05,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "cream",
            "name": "cream",
            "company": "FoodData Central",
            "characteristics": [
                "sour",
                "full fat"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.903
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 7fbd669b64dc4ff98c3675f401da13b2",
        "fundamental_nutrients": {
            "energy": 17.1,
            "carbohydrates": 3.37,
            "protein": 0.742,
            "fat": 0.074,
            "fiber": 0.0,
            "sodium": 0.0161,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "lettuce",
            "name": "lettuce",
            "company": "FoodData Central",
            "characteristics": [
                "iceberg",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.918
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, ca7671e009f7417badb03ee49a659b29",
        "fundamental_nutrients": {
            "energy": 20.8,
            "carbohydrates": 4.06,
            "protein": 0.977,
            "fat": 0.071,
            "fiber": 0.0,
            "sodium": 0.023,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "lettuce",
            "name": "lettuce",
            "company": "FoodData Central",
            "characteristics": [
                "romaine",
                "green",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.92
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 3607296ab6944cacba1bb552ec398a4d",
        "fundamental_nutrients": {
            "energy": 17.5,
            "carbohydrates": 3.26,
            "protein": 0.883,
            "fat": 0.106,
            "fiber": 0.0,
            "sodium": 0.0249,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "lettuce",
            "name": "lettuce",
            "company": "FoodData Central",
            "characteristics": [
                "leaf",
                "red",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.92
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 9d4d5d168ad74c1f994565297df6df8b",
        "fundamental_nutrients": {
            "energy": 22.0,
            "carbohydrates": 4.07,
            "protein": 1.09,
            "fat": 0.156,
            "fiber": 0.0,
            "sodium": 0.0289,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "lettuce",
            "name": "lettuce",
            "company": "FoodData Central",
            "characteristics": [
                "leaf",
                "green",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.921
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 00d498c5475e40d381aeb39f7505439e",
        "fundamental_nutrients": {
            "energy": 689,
            "carbohydrates": 18.6,
            "protein": 15.7,
            "fat": 61.3,
            "fiber": 3.94,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "nuts",
            "name": "nuts",
            "company": "FoodData Central",
            "characteristics": [
                "pine nuts",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.953
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 76af9ecae66444238758673396485c72",
        "fundamental_nutrients": {
            "energy": 626,
            "carbohydrates": 20.0,
            "protein": 21.5,
            "fat": 51.1,
            "fiber": 10.8,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "nuts",
            "name": "nuts",
            "company": "FoodData Central",
            "characteristics": [
                "almonds",
                "whole",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.945
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 67429a12a8794c5e93eaad8276e596a9",
        "fundamental_nutrients": {
            "energy": 730,
            "carbohydrates": 10.9,
            "protein": 14.6,
            "fat": 69.7,
            "fiber": 5.21,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "nuts",
            "name": "nuts",
            "company": "FoodData Central",
            "characteristics": [
                "walnuts",
                "english",
                "halves",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.928
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, b8c49104fa5f4219ba9d3c54d3fb392f",
        "fundamental_nutrients": {
            "energy": 750,
            "carbohydrates": 12.7,
            "protein": 9.96,
            "fat": 73.3,
            "fiber": 5.79,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "nuts",
            "name": "nuts",
            "company": "FoodData Central",
            "characteristics": [
                "pecans",
                "halves",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.919
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, dc69dcaee86b4377a06d2304ac3477c0",
        "fundamental_nutrients": {
            "energy": 382,
            "carbohydrates": 68.7,
            "protein": 13.5,
            "fat": 5.89,
            "fiber": 0.0,
            "sodium": 0.0006680000000000001,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "oats",
            "name": "oats",
            "company": "FoodData Central",
            "characteristics": [
                "whole grain",
                "rolled",
                "old fashioned"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.949
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, fb9db6ca0f5f4a30966f2c05cd989ad5",
        "fundamental_nutrients": {
            "energy": 381,
            "carbohydrates": 69.8,
            "protein": 12.5,
            "fat": 5.8,
            "fiber": 0.0,
            "sodium": 0.000311,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "oats",
            "name": "oats",
            "company": "FoodData Central",
            "characteristics": [
                "whole grain",
                "steel cut"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.949
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, c5597cf4ce8e4d938b68826c691e4e36",
        "fundamental_nutrients": {
            "energy": 60.1,
            "carbohydrates": 14.1,
            "protein": 0.461,
            "fat": 0.211,
            "fiber": 0.935,
            "sodium": 0.0,
            "sugar": 11.4
        },
        "product_designation": {
            "food": "pineapple",
            "name": "pineapple",
            "company": "FoodData Central",
            "characteristics": [
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.891
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, cdd825d7fd8f40fd8e8f0181e107ef71",
        "fundamental_nutrients": {
            "energy": 70.5,
            "carbohydrates": 16.2,
            "protein": 1.04,
            "fat": 0.192,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 13.9
        },
        "product_designation": {
            "food": "cherries",
            "name": "cherries",
            "company": "FoodData Central",
            "characteristics": [
                "sweet",
                "dark red",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.877
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 46894913289d4a0e859e59f0076f2663",
        "fundamental_nutrients": {
            "energy": 40.0,
            "carbohydrates": 7.41,
            "protein": 1.97,
            "fat": 0.275,
            "fiber": 3.01,
            "sodium": 0.0,
            "sugar": 2.33
        },
        "product_designation": {
            "food": "beans",
            "name": "beans",
            "company": "FoodData Central",
            "characteristics": [
                "snap",
                "green",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.916
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 2d367d31fe5b42e1b869e98faeed49d0",
        "fundamental_nutrients": {
            "energy": 83.4,
            "carbohydrates": 17.8,
            "protein": 2.27,
            "fat": 0.36,
            "fiber": 0.0,
            "sodium": 0.0027400000000000002,
            "sugar": 0.526
        },
        "product_designation": {
            "food": "potatoes",
            "name": "potatoes",
            "company": "FoodData Central",
            "characteristics": [
                "russet",
                "without skin",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.921
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, f330410720864efab636d77099737d8b",
        "fundamental_nutrients": {
            "energy": 75.6,
            "carbohydrates": 16.3,
            "protein": 2.06,
            "fat": 0.248,
            "fiber": 0.0,
            "sodium": 0.0028599999999999997,
            "sugar": 0.664
        },
        "product_designation": {
            "food": "potatoes",
            "name": "potatoes",
            "company": "FoodData Central",
            "characteristics": [
                "red",
                "without skin",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.922
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 344da21677d944ef9cabbbcdee3c66e4",
        "fundamental_nutrients": {
            "energy": 73.5,
            "carbohydrates": 16.0,
            "protein": 1.81,
            "fat": 0.264,
            "fiber": 0.0,
            "sodium": 0.0022400000000000002,
            "sugar": 0.645
        },
        "product_designation": {
            "food": "potatoes",
            "name": "potatoes",
            "company": "FoodData Central",
            "characteristics": [
                "gold",
                "without skin",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.922
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 10fc38eea0c940919d95edeec27070ef",
        "fundamental_nutrients": {
            "energy": 79.0,
            "carbohydrates": 17.3,
            "protein": 1.58,
            "fat": 0.375,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 6.06
        },
        "product_designation": {
            "food": "sweet potatoes",
            "name": "sweet potatoes",
            "company": "FoodData Central",
            "characteristics": [
                "orange flesh",
                "without skin",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.905
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 5b5778f96d8340158a10e26da03632e0",
        "fundamental_nutrients": {
            "energy": 16.7,
            "carbohydrates": 3.32,
            "protein": 0.492,
            "fat": 0.162,
            "fiber": 0.0,
            "sodium": 0.09720000000000001,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "celery",
            "name": "celery",
            "company": "FoodData Central",
            "characteristics": [
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.916
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 5e052ad2e690473f9d99b54376b7220d",
        "fundamental_nutrients": {
            "energy": 15.9,
            "carbohydrates": 2.95,
            "protein": 0.625,
            "fat": 0.178,
            "fiber": 0.0,
            "sodium": 0.00152,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "cucumber",
            "name": "cucumber",
            "company": "FoodData Central",
            "characteristics": [
                "with peel",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.919
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 9b8b8b43c7e245c482b87b577d854445",
        "fundamental_nutrients": {
            "energy": 31.4,
            "carbohydrates": 6.38,
            "protein": 0.961,
            "fat": 0.228,
            "fiber": 0.0,
            "sodium": 0.0161,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "cabbage",
            "name": "cabbage",
            "company": "FoodData Central",
            "characteristics": [
                "green",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.924
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, ce7fe83e97294d1aac66707275798d86",
        "fundamental_nutrients": {
            "energy": 34.1,
            "carbohydrates": 6.79,
            "protein": 1.24,
            "fat": 0.214,
            "fiber": 0.0,
            "sodium": 0.011699999999999999,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "cabbage",
            "name": "cabbage",
            "company": "FoodData Central",
            "characteristics": [
                "red",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.926
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, ddb42378616e4e9a91c6a9428fe1ac73",
        "fundamental_nutrients": {
            "energy": 36.4,
            "carbohydrates": 7.96,
            "protein": 0.641,
            "fat": 0.22,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 4.86
        },
        "product_designation": {
            "food": "strawberries",
            "name": "strawberries",
            "company": "FoodData Central",
            "characteristics": [
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.911
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, b15a862408b54c56a24e56f48bd39b14",
        "fundamental_nutrients": {
            "energy": 57.3,
            "carbohydrates": 12.9,
            "protein": 1.01,
            "fat": 0.188,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 2.68
        },
        "product_designation": {
            "food": "raspberries",
            "name": "raspberries",
            "company": "FoodData Central",
            "characteristics": [
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.915
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 302cfb3860084bdfab039df6924a3ef9",
        "fundamental_nutrients": {
            "energy": 63.9,
            "carbohydrates": 14.6,
            "protein": 0.703,
            "fat": 0.306,
            "fiber": 0.0,
            "sodium": 0.0,
            "sugar": 9.36
        },
        "product_designation": {
            "food": "blueberries",
            "name": "blueberries",
            "company": "FoodData Central",
            "characteristics": [
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.891
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 261a6f74be7e4e9180133a06ea741798",
        "fundamental_nutrients": {
            "energy": 85.9,
            "carbohydrates": 20.2,
            "protein": 0.914,
            "fat": 0.164,
            "fiber": 0.0,
            "sodium": 0.007,
            "sugar": 17.3
        },
        "product_designation": {
            "food": "grapes",
            "name": "grapes",
            "company": "FoodData Central",
            "characteristics": [
                "red",
                "seedless",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.865
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, ed7a6de078c64af39e07d16cf02bf38b",
        "fundamental_nutrients": {
            "energy": 80.1,
            "carbohydrates": 18.6,
            "protein": 0.899,
            "fat": 0.232,
            "fiber": 0.0,
            "sodium": 0.00317,
            "sugar": 16.1
        },
        "product_designation": {
            "food": "grapes",
            "name": "grapes",
            "company": "FoodData Central",
            "characteristics": [
                "green",
                "seedless",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.869
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 2d676d359b4046679cf8beb88294f284",
        "fundamental_nutrients": {
            "energy": 51.6,
            "carbohydrates": 12.3,
            "protein": 0.273,
            "fat": 0.162,
            "fiber": 0.0,
            "sodium": 0.000504,
            "sugar": 9.66
        },
        "product_designation": {
            "food": "applesauce",
            "name": "applesauce",
            "company": "FoodData Central",
            "characteristics": [
                "unsweetened",
                "with added vitamin c"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.893
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, f2f750439d154881a3a9a5c328fce23c",
        "fundamental_nutrients": {
            "energy": 384,
            "carbohydrates": 68.8,
            "protein": 13.2,
            "fat": 6.24,
            "fiber": 7.21,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "amaranth"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.952
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 16a600bf6fe34e00aaabfbd077caf7b4",
        "fundamental_nutrients": {
            "energy": 385,
            "carbohydrates": 69.5,
            "protein": 11.9,
            "fat": 6.6,
            "fiber": 6.3,
            "sodium": 0.00632,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "quinoa"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.944
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 27d7b794446d40d4b0834e2e717e09ba",
        "fundamental_nutrients": {
            "energy": 375,
            "carbohydrates": 77.4,
            "protein": 8.27,
            "fat": 3.59,
            "fiber": 6.02,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "sorghum"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.936
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 3a0ed77c64fa4f3e876b4711beb18f65",
        "fundamental_nutrients": {
            "energy": 358,
            "carbohydrates": 75.0,
            "protein": 8.88,
            "fat": 2.48,
            "fiber": 10.4,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "buckwheat"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.945
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, b19192e1b2ca4eb89b070a7cd7bab809",
        "fundamental_nutrients": {
            "energy": 359,
            "carbohydrates": 77.2,
            "protein": 8.4,
            "fat": 1.91,
            "fiber": 13.7,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "rye"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.944
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, a98397a8216248b0959a195f1a314481",
        "fundamental_nutrients": {
            "energy": 367,
            "carbohydrates": 77.4,
            "protein": 8.72,
            "fat": 2.45,
            "fiber": 12.8,
            "sodium": 0.020300000000000002,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "barley"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.94
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 1a4de59f5db04c91983e0ebafaae2675",
        "fundamental_nutrients": {
            "energy": 357,
            "carbohydrates": 87.3,
            "protein": 0.918,
            "fat": 0.494,
            "fiber": 4.83,
            "sodium": 0.013099999999999999,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "cassava"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.926
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 407f2d894b74403185417303aabc66f1",
        "fundamental_nutrients": {
            "energy": 356,
            "carbohydrates": 71.1,
            "protein": 11.1,
            "fat": 3.04,
            "fiber": 4.05,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "buckwheat",
            "name": "buckwheat",
            "company": "FoodData Central",
            "characteristics": [
                "whole grain"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.942
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 011f4cdea2764c17b5b3fd4ba327e8b0",
        "fundamental_nutrients": {
            "energy": 376,
            "carbohydrates": 74.4,
            "protein": 10.0,
            "fat": 4.19,
            "fiber": 2.62,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "millet",
            "name": "millet",
            "company": "FoodData Central",
            "characteristics": [
                "whole grain"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.935
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 32cfd2ef31744acc9214ee96d6792c3d",
        "fundamental_nutrients": {
            "energy": 366,
            "carbohydrates": 76.7,
            "protein": 7.25,
            "fat": 3.31,
            "fiber": 3.02,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "rice",
            "name": "rice",
            "company": "FoodData Central",
            "characteristics": [
                "brown",
                "long grain",
                "unenriched",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.937
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, de60f52788654d27a8840553b7a8d68c",
        "fundamental_nutrients": {
            "energy": 359,
            "carbohydrates": 80.3,
            "protein": 7.04,
            "fat": 1.03,
            "fiber": 0.149,
            "sodium": 0.000462,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "rice",
            "name": "rice",
            "company": "FoodData Central",
            "characteristics": [
                "white",
                "long grain",
                "unenriched",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.926
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 9a7c0913e1414002aec29915b37299ad",
        "fundamental_nutrients": {
            "energy": 185,
            "carbohydrates": -0.853,
            "protein": 18.2,
            "fat": 12.8,
            "fiber": 0.0,
            "sodium": 0.0616,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beef",
            "name": "beef",
            "company": "FoodData Central",
            "characteristics": [
                "ground",
                "90% lean meat / 10% fat",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.925
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 92dcac6aa6c64947bb452536e2cb11d8",
        "fundamental_nutrients": {
            "energy": 243,
            "carbohydrates": -0.619,
            "protein": 17.5,
            "fat": 19.4,
            "fiber": 0.0,
            "sodium": 0.0549,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "beef",
            "name": "beef",
            "company": "FoodData Central",
            "characteristics": [
                "ground",
                "80% lean meat / 20% fat",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 148dcfc96cc64051bf1dca6b7315e3fc",
        "fundamental_nutrients": {
            "energy": 228,
            "carbohydrates": -0.091,
            "protein": 17.8,
            "fat": 17.5,
            "fiber": 0.0,
            "sodium": 0.0536,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "pork",
            "name": "pork",
            "company": "FoodData Central",
            "characteristics": [
                "ground",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, fc244aa0f4204f4f94df33e51b864288",
        "fundamental_nutrients": {
            "energy": 133,
            "carbohydrates": -0.762,
            "protein": 17.9,
            "fat": 7.16,
            "fiber": 0.0,
            "sodium": 0.063,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "chicken",
            "name": "chicken",
            "company": "FoodData Central",
            "characteristics": [
                "ground",
                "with additives",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, de101fb974a943f9b442a8a6abe4b9cc",
        "fundamental_nutrients": {
            "energy": 153,
            "carbohydrates": -0.77,
            "protein": 17.3,
            "fat": 9.59,
            "fiber": 0.0,
            "sodium": 0.08020000000000001,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "turkey",
            "name": "turkey",
            "company": "FoodData Central",
            "characteristics": [
                "ground",
                "93% lean/ 7% fat",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.923
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 9b60d6e5b83346b79c9768ed2ba8d295",
        "fundamental_nutrients": {
            "energy": 664,
            "carbohydrates": 21.6,
            "protein": 15.0,
            "fat": 57.4,
            "fiber": 5.98,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "nuts",
            "name": "nuts",
            "company": "FoodData Central",
            "characteristics": [
                "brazilnuts",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.942
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 7862a786de584f22bcab0d3f5e80482c",
        "fundamental_nutrients": {
            "energy": 565,
            "carbohydrates": 36.3,
            "protein": 17.4,
            "fat": 38.9,
            "fiber": 4.1,
            "sodium": 0.0047599999999999995,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "nuts",
            "name": "nuts",
            "company": "FoodData Central",
            "characteristics": [
                "cashew nuts",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.949
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 5d00121463f34338b7021c1c4127ed42",
        "fundamental_nutrients": {
            "energy": 641,
            "carbohydrates": 26.5,
            "protein": 13.5,
            "fat": 53.5,
            "fiber": 8.41,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "nuts",
            "name": "nuts",
            "company": "FoodData Central",
            "characteristics": [
                "hazelnuts or filberts",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.945
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, ea00af16dfa04062a5cacca6068df5bc",
        "fundamental_nutrients": {
            "energy": 588,
            "carbohydrates": 26.5,
            "protein": 23.2,
            "fat": 43.3,
            "fiber": 8.01,
            "sodium": 0.00149,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "peanuts",
            "name": "peanuts",
            "company": "FoodData Central",
            "characteristics": [
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.936
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 180b7b6a82214d1196927938fa9a927a",
        "fundamental_nutrients": {
            "energy": 385,
            "carbohydrates": 80.5,
            "protein": 5.29,
            "fat": 4.64,
            "fiber": 8.71,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "chestnut"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.937
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, e1fab4ed3247412c83e1fac52a3ef4b4",
        "fundamental_nutrients": {
            "energy": 712,
            "carbohydrates": 24.1,
            "protein": 7.79,
            "fat": 64.9,
            "fiber": 7.56,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "nuts",
            "name": "nuts",
            "company": "FoodData Central",
            "characteristics": [
                "macadamia nuts",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.941
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, ffdc031833354d9eb7368bf876860d13",
        "fundamental_nutrients": {
            "energy": 598,
            "carbohydrates": 27.7,
            "protein": 20.5,
            "fat": 45.0,
            "fiber": 6.97,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "nuts",
            "name": "nuts",
            "company": "FoodData Central",
            "characteristics": [
                "pistachio nuts",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.936
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 5ad2ca1757c94b82a22a98bf3ef0b699",
        "fundamental_nutrients": {
            "energy": 555,
            "carbohydrates": 18.7,
            "protein": 29.9,
            "fat": 40.0,
            "fiber": 5.08,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "seeds",
            "name": "seeds",
            "company": "FoodData Central",
            "characteristics": [
                "pumpkin seeds (pepitas)",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.97
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, 2e59b305553444ee8d25e8e46e266358",
        "fundamental_nutrients": {
            "energy": 609,
            "carbohydrates": 24.5,
            "protein": 18.9,
            "fat": 48.4,
            "fiber": 7.22,
            "sodium": 0.0,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "seeds",
            "name": "seeds",
            "company": "FoodData Central",
            "characteristics": [
                "sunflower seed",
                "kernel",
                "raw"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.951
            }
        },
        "serving_description": null,
        "units": "g"
    },
    {
        "id": "foundation, f6715e243690421a8c552ef27f346b43",
        "fundamental_nutrients": {
            "energy": 438,
            "carbohydrates": 58.9,
            "protein": 16.1,
            "fat": 15.3,
            "fiber": 34.2,
            "sodium": 0.0469,
            "sugar": 0.0
        },
        "product_designation": {
            "food": "flour",
            "name": "flour",
            "company": "FoodData Central",
            "characteristics": [
                "coconut"
            ]
        },
        "serving_size": 30.0,
        "evaluation": {
            "nutriscore": null,
            "foundation": {
                "score": 0.982
            }
        },
        "serving_description": null,
        "units": "g"
    }
]
`;

export const foundation_products: product_type[] = Object.freeze(JSON.parse(foundation_string));
