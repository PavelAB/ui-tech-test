import { useMode } from "../ModeSwitch";
import { Field, Input } from "./useFields";

type InputFieldProps = Input & {
    update?: (data: Partial<Field>) => void
    onDetails: (id: string) => void
}

function InputField({ id, type, placeholder, onDetails }: InputFieldProps) { //Regarder le hook useField

    const [mode] = useMode()

    return (
        <input
            id={id}
            name={id}
            readOnly={mode == "edit"}
            type={type}
            placeholder={placeholder}
            className={"rounded border w-full border-gray-200 text-base font-medium px-3 py-2 placeholder:font-normal"}
            onClick={() => onDetails(id)}
        />
    )
}
export default InputField