import React from 'react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Definition () {
    const [word, setWord] = useState();

    useEffect( () => {
        fetch( 'https://api.dictionaryapi.dev/api/v2/entries/en/helicopter' )
            .then( ( response ) => response.json() )
            .then( ( data ) => {
                setWord( data[0].meanings );
                console.log( data[0].meanings );
            } );
    }, [] );

    return (
        <>
            <h1>Here is a definition:</h1>
            {/* if word is defined => return the meaning with the key(uuid)
            else return null
            */}
            {word ? word.map( ( meaning ) => {
                return (
                    <p key={uuidv4()}>
                        {meaning.partOfSpeech + ': '}
                        {meaning.definitions[0].definition}
                    </p>
                );
            } ) : null}
        </>
    );
}
