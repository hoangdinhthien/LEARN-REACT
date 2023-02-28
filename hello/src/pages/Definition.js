import React from 'react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    useParams,
    useNavigate,
    Link,
    json,
    useLocation,
} from 'react-router-dom';
import NotFound from '../components/NotFound';
import DefinitionSearch from '../components/DefinitionSearch';
import useFetch from '../hooks/UseFetch';


export default function Definition ( props ) {
    // const [ word, setWord ] = useState();
    // const [notFound, setNotFound] = useState( false );
    // const [error, setError] = useState( false );

    let { search } = useParams();

    const location = useLocation();
    const navigate = useNavigate();
    const [word, errorStatus] = useFetch(
        'https://api.dictionaryapi.dev/api/v2/entries/en/' + search
    );

    if ( errorStatus === 404 ) {
        return (
            <>
                <NotFound />
                <Link to='/dictionary'>Search another</Link>
            </>
        );
    }

    if ( errorStatus ) {
        return (
            <>
                <p>There was a problem with the server, try again later!</p>
                <Link to='/dictionary'>Search another</Link>
            </>
        );
    }

    return (
        <>
            {/* if word is defined => return the meaning with the key(uuid)
            else return null
            */}
            {word?.[0]?.meanings ? (
                <>
                    <h1>Here is a definition:</h1>
                    {word[0].meanings.map( ( meaning ) => {
                        return (
                            <p key={uuidv4()}>
                                {meaning.partOfSpeech + ': '}
                                {meaning.definitions[0].definition}
                            </p>
                        );
                    } )}
                    <p>Search again:</p>
                    <DefinitionSearch></DefinitionSearch>
                </>
            ) : null}
        </>
    );
}
