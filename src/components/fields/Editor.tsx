import { useEffect } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';


const EMPTY_STATE = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

const theme = {
    // Theme styling goes here
}

function SwitchMode({ editable }: { editable?: boolean }) { 

    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        // Focus the editor when the effect fires!
        console.log('Switching editable mode to', editable);
        editable && editor.setEditable(editable)
    }, [editor, editable])

    return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
    console.error(error);
}


function Editor({ editable, defaultValue, onChange: handleChange }: { editable?: boolean, defaultValue?: string | null, onChange?: (editorState: string) => void, name?: string }) {
    const editorState = defaultValue ?? EMPTY_STATE;
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        editable,
        editorState
    };


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