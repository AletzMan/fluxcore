import { DatePicker } from "lambda-ui-components";
import { useState } from "react";

export const DateItem = ({ filter }: { filter: any }) => {
    const [value, setValue] = useState<Date | undefined>(new Date());

    return (
        <DatePicker
            label={filter.label}
            size='tiny'
            value={value}
            onChange={(e) => setValue(e)}
            displayFormat="medium"
            type="modal"
        />
    )
}