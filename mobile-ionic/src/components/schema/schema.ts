export type product_state_updater_type =
    {
        (id: string, quantity: number, servings: number): void
    }

export type product_input_type =
    {
        serving: string;
        product_designation: string;
        fundamental_nutrients: string;
        product_evaluation: string;
    }
