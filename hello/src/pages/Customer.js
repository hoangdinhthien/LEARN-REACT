import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../shared';
import { NavigateBeforeRounded } from '@mui/icons-material';

export default function Customer () {
    //variable in {} will grab the properties on object
    const { id } = useParams(); //useParams return an object but we only want the id so use {}
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const [notFound, setNotFound] = useState();
    useEffect( () => {
        const url = baseUrl + 'api/customers/' + id;
        fetch( url )
            .then( ( response ) => {
                if ( response.status === 404 ) {
                    //render a 404 component in this page (new URL)
                    // navigate( '/404' ); //==> NotFound component

                    //redirect to a 404 page
                    setNotFound( true );
                }
                return response.json();
            } )
            .then( ( data ) => {
                setCustomer( data.customer );
            } );
    }, [] );

    return (
        <>
            {notFound ? <p>The customer with id {id} is not found</p> : null}
            {customer ?
                <div>
                    <p>{customer.id}</p>
                    <p>{customer.name}</p>
                    <p>{customer.industry}</p>
                </div>
                : null}
            <button onClick={( e ) => {
                const url = baseUrl + 'api/customers/' + id;
                fetch( url, { method: 'DELETE', header: { 'Content-Type': 'application/json' } } )
                    .then( ( response ) => {
                        if ( !response.ok ) {
                            throw new Error( 'Something went wrong' );
                        }
                        navigate( '/customers' );
                    } ).catch( ( e ) => {
                        console.log( e );
                    } );
            }}
            >
                Delete
            </button>
            <br></br>
            <Link to='/Customers/'>Go back</Link>
        </>
    );
}
