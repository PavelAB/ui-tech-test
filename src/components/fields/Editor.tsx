import { useEffect } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';


// ce quoi le EMPTY_STATE
const EMPTY_STATE = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

const theme = {
    // Theme styling goes here
}

function SwitchMode({ editable }: { editable?: boolean }) {  // Bien comprendre a quoi corespond l'editable 
    // editable un parametre de type boolean 
    const [editor] = useLexicalComposerContext(); // Que fait le hook en question

    useEffect(() => {
        // Focus the editor when the effect fires!
        console.log('Switching editable mode to', editable);
        editable && editor.setEditable(editable)
    }, [editor, editable]);  //Update en fonction du hook precedent et editable

    return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
    console.error(error);
}


// la composante TSX partage
function Editor({ editable, defaultValue, onChange: handleChange }: { editable?: boolean, defaultValue?: string | null, onChange?: (editorState: string) => void, name?: string }) {
    const editorState = defaultValue ?? EMPTY_STATE;
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        editable,
        editorState
    };


    // Verifier les composantes suivantes LexicalComposer, SwitchMode, PlainTextPlagin, OnChangePlugin, HistoryPlagin tout ca vient du react d'un certaine bibliotheque lexical, bien comprendre a quoi corresponfd Lexical
    return (
        <LexicalComposer initialConfig={initialConfig}>  
            <SwitchMode editable={editable} />
            <PlainTextPlugin
                contentEditable={<ContentEditable className='focus:outline-none' />}
                placeholder={<div className='absolute top-0 text-gray-400 -z-10'>Enter your Question...</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={(editorState) => handleChange && handleChange(JSON.stringify(editorState))} />
            <HistoryPlugin />
        </LexicalComposer>
    );
}

export default Editor;