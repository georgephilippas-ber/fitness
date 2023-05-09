export type page_registry_type =
    {
        protected: boolean;
        allowed: string;
        endpoint: string;
        view: string;
        layout: string;
        enabled: boolean;
        injection: object;
        page_characteristics: page_characteristics;
    }

export type page_characteristics =
    {
        title: string;
        css_filenames: string[];
    };
