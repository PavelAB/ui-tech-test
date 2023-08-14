
import { useReducer } from "react"
import { useSearchParams } from "react-router-dom";

type Mode = "preview" | "edit"

export default function useMode(): [Mode, () => void] {
    
    let [searchParams, setSearchParams] = useSearchParams()

    //TODO Understand at which point the parameter was added, and verify the behavior with useEffect to have the ability to navigate using buttons, and comprehend where the update error comes from.
    const getInitialMode = (): Mode => {            
        return searchParams.get('mode') === 'edit' ? 'edit' : 'preview'
    };
    
    const [mode, toggleMode] = useReducer((currentMode: Mode) => {
      
      const newMode = currentMode === "preview" ? "edit" : "preview"
        setSearchParams({ mode: newMode})
        // console.log(newMode);
        // console.log('params',searchParams.get('mode'));

        return newMode
      }, getInitialMode())
  

    return [mode, toggleMode]
}