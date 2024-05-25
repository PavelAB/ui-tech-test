import { useEffect, useState } from "react"
import useFields, { Input, Submit, Combobox, Field } from "../components/fields/useFields.ts"
import FieldWrapper from "./fields/FieldWrapper.tsx"
import ButtonField from '../components/fields/SubmitField';
import { log } from "console";

const fieldName: string[] = ["text", "number", "date", "country", "submit"]


function Aside({ children }: { children?: React.ReactNode }) { //Bien comprendre la notion children
    const [thatField, setThatField] = useState<Field>() //oublie les const, il faut utiliser les states
    //COmprendre comment faire passer l'id 
    const { fields } = useFields()
    const IDFormFieldSelect: string = fields[1].id
    console.log(fields[2]);

    

    useEffect(() => {
        // Je dois l'acceder au champ de la formulaire pour preremplir les donnes de ma nouvelle formulaire qui va modifier les proprietes de mon champ
        console.log("=== ID ", IDFormFieldSelect);

        setThatField(fields.filter(item =>  // essayer le slice
            item.id === IDFormFieldSelect)[0])

    }, [])

    console.log("======= element", thatField);
    

    if (!thatField) {

        return (
            <aside
                className="h-full border-l border-gray-200 w-1/6 px-4 py-10"
            >
                <h3 className="text-lg border-b border-gray-100">Properties</h3>
                <h2 className="text-lg border-b border-gray-100">No data</h2>
                <div className="mt-2" />
                {children}
            </aside>
        )
    }
    // Preremplir la formulaire
    return (
        <aside
            className="h-full border-l border-gray-200 w-1/6 px-4 py-10"
        >
            <h3 className="text-lg border-b border-gray-100">Properties</h3>
            <div className="mt-2" />
            {children}
            <form action="" >
                <div >
                    <label htmlFor="">Entry type your submit </label>
                    <select name="" id="" className={"mt-1 rounded border w-full border-gray-200 text-base font-medium px-3 py-2"}>
                        {fieldName.map(item => (
                            <option >{item}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Entry your message</label>
                    <input 
                        type="text" 
                        placeholder={thatField.placeholder? thatField.placeholder : " "}
                        className={"mt-1 rounded border w-full border-gray-200 text-base font-medium px-3 py-2 placeholder:font-normal"}/>
                </div>
                <div>
                    <label htmlFor="">Entry your label</label>
                    <input 
                        type="text" 
                        placeholder={thatField.label? thatField.label : " "}
                        className={" mt-1 rounded border w-full border-gray-200 text-base font-medium px-3 py-2 placeholder:font-normal"}/>
                </div>
                
                <button type="submit"
                        className='mt-4 block px-2 py-1 border border-gray-300 hover:bg-gray-50 rounded'>
                        Edit
                </button>
            </form>
        </aside>
    )
}


export default Aside