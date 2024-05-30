import { useMode } from "../ModeSwitch";
import { Field, Input } from "./useFields";

type InputFieldProps = Input & {
    update?: (data: Partial<Field>) => void
}

function InputField({ id, type, placeholder}: InputFieldProps) { 

    const [mode] = useMode()

    return (
        <input
            id={id}
            name={id}
            readOnly={mode == "edit"}
            type={type}
            placeholder={placeholder}
            className={"rounded border w-full border-gray-200 text-base font-medium px-3 py-2 placeholder:font-normal"}
        />
    )
}
export default InputField