export type muscle_type = "rectus-abdominis" | "";

export type instructions_type =
    {
        steps: string[];
        tips: string[];
    };


export type set_type =
    {
        time?: number;
        repetitions?: number;
    }

export type set_impact_type =
    {
        required_weekly: {
            beginner: number;
            intermediate: number;
            advanced: number;
        };
    }

export type exercise_type =
    {
        instructions: instructions_type
        set: set_type;
        set_impact: set_impact_type;
    }

const planks: exercise_type =
    {
        instructions:
            {
                steps:
                    [
                        "Start by positioning yourself face down on the floor/mat.",
                        "Place your forearms on the ground, elbows directly under your shoulders, and form a 90-degree angle with your arms.",
                        "Extend your legs straight back, toes touching the ground, and lift your body up, balancing on your forearms and toes.",
                        "Maintain a straight line from your head to your heels, engaging your core muscles to keep your body stable.",
                    ],
                tips:
                    [
                        "Keep your neck in line with your spine by looking down at the floor/mat.",
                        "Ensure your shoulders are relaxed and not hunched up towards your ears.",
                        "Breathe evenly throughout the exercise, focusing on maintaining proper form and stability."
                    ]
            },
        set:
            {
                time: 60
            },
        set_impact:
            {
                required_weekly:
                    {
                        beginner: 10,
                        intermediate: 15,
                        advanced: 30
                    }
            }
    }
