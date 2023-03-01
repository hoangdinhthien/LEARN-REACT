import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { baseUrl } from '../shared';

export default function useFetch ( url, { method, headers, body } = {} ) {
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  function request () {
    fetch( url, {
      method: method,
      headers: headers,
      body: body,
    } )
      .then( ( response ) => {
        if ( response.status === 401 ) {
          navigate( '/login', {
            state: {
              previousUrl: location.pathname,
            },
          } );
        }
        if ( !response.ok ) {
          throw response.status;
        }
        return response.json();
      } )
      .then( ( data ) => {
        setData( data );
      } )
      .catch( ( e ) => {
        setErrorStatus( e );
      } );
  }

  function appendData ( newData ) {
    fetch( url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify( newData ),
    } )
      .then( ( response ) => {
        if ( response.status === 401 ) {
          navigate( '/login', {
            state: {
              previousUrl: location.pathname,
            },
          } );
        }
        if ( !response.ok ) {
          throw response.status;
        }
        return response.json();
      } )
      .then( ( d ) => {
        // d: data

        const submitted = Object.values( d )[0]; // ==> grab the object that is been added to the array
        console.log( 'in the the ....', submitted );

        const newState = { ...data }; // ==> duplicate the existing state which will be a new object
        Object.values( newState )[0].push( submitted ); // ==> push the new object onto the new state

        setData( newState ); // ==> replace the existing state with that new object , because it's a new object, it's seen as a state change
      } )
      .catch( ( e ) => {
        setErrorStatus( e );
      } );
  }
  return { request, appendData, data, errorStatus };
}
