import {DateTime} from "luxon";

export type calendar_period_type = "week" | "month" | "year";

const calendar_period_comprehensive: calendar_period_type[] =
    ["week", "month", "year"];

export type period_JSON_type =
    {
        beginning?: number;
        end?: number;
    }

export const global_beginning: DateTime = day(1, 4, 2023, "beginning");

export function today(point: "beginning" | "end" = "beginning"): DateTime {
    return DateTime.fromObject({
        day: DateTime.now().day,
        month: DateTime.now().month,
        year: DateTime.now().year, ...(point === "beginning" ? {
            hour: 0.,
            minute: 0.,
            second: 0.,
            millisecond: 0.,
        } : {
            hour: 23., minute: 59., second: 59., millisecond: 999.
        })
    }, {zone: "UTC"});
}

export const entire_day = (date: DateTime) => new Period(day_fromMillis(date.toMillis(), "beginning").toMillis(), day_fromMillis(date.toMillis(), "end").toMillis());

export function day(day: number, month: number, year: number, point: "beginning" | "end"): DateTime {
    return DateTime.fromObject({
        day, month, year, ...(point === "beginning" ? {
            hour: 0.,
            minute: 0.,
            second: 0.,
            millisecond: 0.
        } : {hour: 23., minute: 59., second: 59., millisecond: 999.})
    }, {zone: "UTC"})
}

export function day_fromMillis(milliseconds: number, point: "beginning" | "end") {
    return day(DateTime.fromMillis(milliseconds, {zone: "UTC"}).day, DateTime.fromMillis(milliseconds, {zone: "UTC"}).month, DateTime.fromMillis(milliseconds, {zone: "UTC"}).year, point);
}

export function now_asUTC(): DateTime {
    return DateTime.fromMillis(DateTime.now().toMillis(), {zone: "UTC"});
}

export class Period {
    constructor(private readonly beginning?: number, private readonly end?: number) {
    }

    public getBeginning(): number {
        return this.beginning || -Infinity;
    }

    public getEnd(): number {
        return this.end || Infinity;
    }

    hasFiniteBeginning(): boolean {
        return !!this.beginning && this.beginning !== -Infinity;
    }

    hasFiniteEnd(): boolean {
        return !!this.end && this.beginning !== Infinity;
    }

    static fromObject(object: period_JSON_type) {
        return new Period(object.beginning, object.end);
    }

    static beginningOf(calendar_period: calendar_period_type, date: Date | undefined = undefined): Period {
        const date_: Date = date || new Date();

        if (calendar_period_comprehensive.includes(calendar_period))
            return new Period(DateTime.fromJSDate(date_).startOf(calendar_period).toMillis(), date?.getTime());
        else {
            console.log(["invalid", "calendar_period", calendar_period].join(" "));

            return new Period();
        }
    }

    public static trailing(calendar_period: calendar_period_type, date: Date | undefined = undefined): Period {
        const date_: Date = date || new Date();

        if (calendar_period_comprehensive.includes(calendar_period))
            return new Period(DateTime.fromJSDate(date_).minus({[calendar_period + "s"]: 1}).toMillis(), date?.getTime());
        else {
            console.log(["invalid", "calendar_period", calendar_period].join(" "));

            return new Period();
        }
    }

    toJSON(): period_JSON_type {
        return {
            beginning: this.beginning,
            end: this.end
        }
    }

    readable(): string {
        return `from ${this.beginning ? DateTime.fromMillis(this.beginning).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY) : "-Infinity"} to ${this.end ? DateTime.fromMillis(this.end).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY) : "Infinity"}`;
    }

    public days_range(): DateTime[] {
        const beginning: DateTime = this.beginning ? day_fromMillis(this.beginning, "beginning") : global_beginning;

        const end: DateTime = this.end ? day_fromMillis(this.end, "end") : today("end");

        let dates_array_: DateTime[] = [];

        let current_: DateTime = beginning;
        while (current_.toMillis() < end.toMillis()) {
            dates_array_.push(current_);

            current_ = current_.plus({days: 1});
        }

        return dates_array_;
    }
}
