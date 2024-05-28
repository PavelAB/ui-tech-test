import { useEffect, useState } from "react"
import useFields, {Field } from "../components/fields/useFields.ts"
import { log } from "console"

const fieldName: string[] = ["text", "number", "date", "country", "submit"]


function Aside({ children }: { children?: React.ReactNode }) {


    const [thatField, setThatField] = useState<Field>()
    const { fields } = useFields()
    let IDFormFieldSelect: string = ''

    
    useEffect(() => {

        if(children)
            IDFormFieldSelect = children as string
        
        let permField = fields.find(item => item.id === IDFormFieldSelect)        

        setThatField(permField)

    }, [children])

    
    console.log("==>", thatField?.type);
    


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

    const handleSubmit = (event: any) => {
        event.preventDefault()
        console.log("Submitted value", event.target.target)
        
    }
    // Preremplir la formulaire
    return (
        <aside
            className="h-full border-l border-gray-200 w-1/6 px-4 py-10"
        >
            <h3 className="text-lg border-b border-gray-100">Properties</h3>
            <div className="mt-2" />
            <form onSubmit={handleSubmit} >
                <div >
                    <label htmlFor="">Entry type your submit </label>
                    <select 
                        name="" 
                        id=""
                        value={thatField.type} 
                        className={"mt-1 rounded border w-full border-gray-200 text-base font-medium px-3 py-2"}
                        >
                            {fieldName.map(item => (
                                <option value={item}>{item}</option>
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