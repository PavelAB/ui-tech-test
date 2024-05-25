import { useEffect, useReducer } from "react"
import { useSearchParams } from "react-router-dom"

type Mode = "preview" | "edit"



export default function useMode(): [Mode, () => void] {

  let [searchParams, setSearchParams] = useSearchParams()

  
  const reducer = (mode: Mode): Mode => {
    const newMode = mode === "preview" ? "edit" : "preview"
    setSearchParams({ mode: newMode })
    return newMode
  }

  const getInitialMode = (): Mode => {
    return searchParams.get('mode') === 'edit' ? 'edit' : 'preview'
  }


  const [mode, toggleMode] = useReducer(reducer, getInitialMode())

 // Used to verify if the URL is synchronized with the page rendering
  useEffect(() => {
    const newCurrentMode = searchParams.get('mode')
    if (newCurrentMode && newCurrentMode !== mode) {
      toggleMode()
    }
  }, [searchParams])

  return [mode, toggleMode]
}