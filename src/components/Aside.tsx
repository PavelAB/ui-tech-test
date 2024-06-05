import React, { useEffect, useState } from "react"
import useFields from "../components/fields/useFields.ts"
import { useSelection } from "./SelectionManager.ts"

const fieldName: string[] = ["text", "number", "date", "country", "submit"]


function Aside({ children }: { children?: React.ReactNode }) { 
    
    const { fields } = useFields()

    const [valueSelect, setValueSelect] = useState<string>('')
    const [valueMessage, setValueMessage] = useState<string>('')
    const [valueLabel, setValueLabel] = useState<string>('')

    const selectedField = fields.map(field => {
        const [isSelected] = useSelection(field.id)
        return isSelected ? field : null
    }).filter(Boolean)[0]

    useEffect(() => {
        if(selectedField){
            setValueSelect(selectedField?.type)
            setValueMessage(selectedField?.placeholder ? selectedField?.placeholder : '')
            setValueLabel(selectedField?.label ? selectedField?.label : '')
        }
            
    }, [selectedField])
    
    // TODO Consider adding another useEffect to send data without using the 'Submit' button

    if (!selectedField) {

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

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const updatedField = {...selectedField, type: event.target.value }
        setValueSelect(updatedField?.type)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        
        const formData = {
                type: (form.elements[0] as HTMLInputElement).value,
                message: (form.elements[1] as HTMLInputElement).value,
                label: (form.elements[2] as HTMLInputElement).value
            }

        
        setValueMessage('')
        setValueLabel('')
        console.log("Submited data ==> ", formData)
        
    }
    
    return (
        <aside
            className="h-full border-l border-gray-200 w-1/6 px-4 py-10"
        >
            <h3 className="text-lg border-b border-gray-100">Properties</h3>
            <div className="mt-2" />
            {children}
            <form onSubmit={handleSubmit} >
                <div >
                    <label htmlFor="">Entry type your submit </label>
                    <select 
                        name="" 
                        id="" 
                        value={valueSelect}
                        onChange={handleSelectChange}
                        className={"mt-1 rounded border w-full border-gray-200 text-base font-medium px-3 py-2"}>
                            {fieldName.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">Entry your message</label>
                    <input 
                        type="text"
                        value={valueMessage}
                        onChange={(e) => setValueMessage(e.target.value)}
                        placeholder={selectedField.placeholder? selectedField.placeholder : " "}
                        className={"mt-1 rounded border w-full border-gray-200 text-base font-medium px-3 py-2 placeholder:font-normal"}/>
                </div>
                <div>
                    <label htmlFor="">Entry your label</label>
                    <input 
                        type="text" 
                        value={valueLabel}
                        onChange={(e) => setValueLabel(e.target.value)}
                        placeholder={selectedField.label? selectedField.label : " "}
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