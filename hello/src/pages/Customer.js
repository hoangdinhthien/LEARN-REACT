import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../shared';

export default function Customer () {
    //variable in {} will grab the properties on object
    const { id } = useParams(); //useParams return an object but we only want the id so use {}
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState();
    const [changed, setChanged] = useState( false );


    useEffect( () => {
        // console.log( 'customer', customer );
        // console.log( 'customer', tempCustomer );
        // console.log( changed );
    } );


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
                setTempCustomer( data.customer );
            } );
    }, [] );

    function updateCustomer () {
        const url = baseUrl + 'api/customers/' + id;
        fetch( url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( tempCustomer )
        } )
            .then( ( response ) => {
                return response.json();
            } )
            .then( ( data ) => {
                setCustomer( data.customer );
                setChanged( false );
                console.log( data );
            } )
            .catch();
    }

    return (
        <>
            {notFound ? <p>The customer with id {id} is not found</p> : null}
            {customer ?
                <div>
                    {/* shown wanna show the id :3 */}
                    {/* <p className='m-2 block px-2' type='text' >{tempCustomer.id}</p> */}
                    <input
                        className='m-2 block px-2'
                        type='text'
                        value={tempCustomer.name}
                        onChange={( e ) => {
                            setChanged( true );
                            setTempCustomer( { ...tempCustomer, name: e.target.value } );
                        }}
                    />
                    <input
                        className='m-2 block px-2'
                        type='text'
                        value={tempCustomer.industry}
                        onChange={( e ) => {
                            setChanged( true );
                            setTempCustomer( { ...tempCustomer, industry: e.target.value } );
                        }}
                    />
                    {changed ?
                        <>
                            <button
                                className=''
                                onClick={( e ) => {
                                    setTempCustomer( { ...customer } );
                                    setChanged( false );
                                }}
                            >Cancel</button>
                            {' '}
                            <button
                                className=''
                                onClick={updateCustomer}
                            >Save</button>
                        </>
                        : null}
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
