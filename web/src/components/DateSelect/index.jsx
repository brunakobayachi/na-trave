import { addDays, format, subDays, formatISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Icon } from "~/components/Icon";
import { useState, useEffect } from "react";

export const DateSelect = ({ currentDate, onChange }) => {
    const date = new Date(currentDate);
    const [disabledLeftArrow, setDisabledLeftArrow] = useState(true);
    const [disabledRightArrow, setDisabledRightArrow] = useState(true);

    useEffect(() => {
        const isValidNextDate =
            currentDate == formatISO(new Date(2022, 11, 18));
        setDisabledRightArrow(isValidNextDate);

        const isValidPreviousDate =
            currentDate == formatISO(new Date(2022, 10, 20));
        setDisabledLeftArrow(isValidPreviousDate);
    }, [currentDate]);

    const prevDay = () => {
        const nextDate = subDays(date, 1);
        onChange(formatISO(nextDate));
    };

    const nextDay = () => {
        const nextDate = addDays(date, 1);
        onChange(formatISO(nextDate));
    };

    return (
        <div className="p-4 flex space-x-4 items-center justify-center">
            <button
                onClick={prevDay}
                disabled={disabledLeftArrow}
                className="appearance-none">
                <Icon
                    name="arrowLeft"
                    className={`w-6 ${
                        disabledLeftArrow ? "text-grey-500" : " text-red-500 "
                    }`}
                />
            </button>

            <span className="font-bold">
                {format(date, "d 'de' MMMM", { locale: ptBR })}
            </span>

            <button
                onClick={nextDay}
                disabled={disabledRightArrow}
                className="appearance-none">
                <Icon
                    name="arrowRight"
                    className={`w-6 ${
                        disabledRightArrow ? "text-grey-500" : " text-red-500 "
                    }`}
                />
            </button>
        </div>
    );
};
