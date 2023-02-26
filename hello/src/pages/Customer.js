import React from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { baseUrl } from '../shared';
import { LoginContext } from '../App';

export default function Customer () {
    const [ loggedIn, setLoggedIn ] = useContext( LoginContext );
    //variable in {} will grab the properties on object
    const { id } = useParams(); //useParams return an object but we only want the id so use {}
    const navigate = useNavigate();
    const [ customer, setCustomer ] = useState();
    const [ tempCustomer, setTempCustomer ] = useState();
    const [ notFound, setNotFound ] = useState();
    const [ changed, setChanged ] = useState( false );
    const [ error, setError ] = useState();

    const location = useLocation();

    useEffect( () => {
        if ( !customer ) return;
        if ( !customer ) return;
        // console.log( customer, tempCustomer );

        let equal = true;
        if ( customer.name !== tempCustomer.name ) equal = false;
        if ( customer.industry !== tempCustomer.industry ) equal = false;

        if ( equal ) setChanged( false );
    } );

    useEffect( () => {
        const url = baseUrl + 'api/customers/' + id;
        fetch( url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem( 'access' )
            },
        } )
            .then( ( response ) => {
                if ( response.status === 404 ) {
                    //render a 404 component in this page (new URL)
                    // navigate( '/404' ); //==> NotFound component
                    //redirect to a 404 page
                    setNotFound( true );
                } else if ( response.status === 401 ) {
                    setLoggedIn( false );
                    navigate( '/login', {
                        state: {
                            previousUrl: location.pathname,
                        }
                    } );
                }

                if ( !response.ok ) {
                    // console.log( 'response:', response );
                    throw new Error( 'Something went wrong, try again later.' );
                }
                return response.json();
            } )
            .then( ( data ) => {
                setCustomer( data.customer );
                setTempCustomer( data.customer );
                setError( undefined );
            } )
            .catch( ( e ) => {
                setError( e.message );
            } );
    }, [] );

    function updateCustomer ( e ) {
        e.preventDefault();
        const url = baseUrl + 'api/customers/' + id;
        fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem( 'access' )
            },
            body: JSON.stringify( tempCustomer ),
        } )
            .then( ( response ) => {
                // console.log( 'response:', response );
                if ( response.status === 401 ) {
                    setLoggedIn( false );
                    navigate( '/login', {
                        state: {
                            previousUrl: location.pathname,
                        }
                    } );
                }
                if ( !response.ok ) throw new Error( 'Something went wrong!' );
                return response.json();
            } )
            .then( ( data ) => {
                setCustomer( data.customer );
                setChanged( false );
                // console.log( data );
                setError( undefined );
            } )
            .catch( ( e ) => {
                // console.log( 'e', e );
                setError( e.message );
            } );
    }

    return (
        <div className='p-3'>
            {notFound ? <p>The customer with id {id} is not found</p> : null}
            {customer ? (
                <div>
                    {/* shown wanna show the id :3 */}
                    {/* <p className='m-2 block px-2' type='text' >{tempCustomer.id}</p> */}
                    <form
                        id='customer'
                        onSubmit={updateCustomer}
                        className='w-full max-w-sm'
                    >
                        <div className='md:flex md:items-center mb-6'>
                            <div className='md:w-1/4'>
                                <label for='name'>Name:</label>
                            </div>
                            <div className='md:w-3/4'>
                                <input
                                    id='name'
                                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                                    type='text'
                                    value={tempCustomer.name}
                                    onChange={( e ) => {
                                        setChanged( true );
                                        setTempCustomer( {
                                            ...tempCustomer,
                                            name: e.target.value,
                                        } );
                                    }}
                                />
                            </div>
                        </div>

                        <div className='md:flex md:items-center mb-6'>
                            <div className='md:w-1/4'>
                                <label for='industry'>Industry:</label>
                            </div>
                            <div className='md:w-3/4'>
                                <input
                                    id='industry'
                                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                                    type='text'
                                    value={tempCustomer.industry}
                                    onChange={( e ) => {
                                        setChanged( true );
                                        setTempCustomer( {
                                            ...tempCustomer,
                                            industry: e.target.value,
                                        } );
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                    {changed ? (
                        <div className='mb-2'>
                            <button
                                className='mr-2 bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                                onClick={( e ) => {
                                    setTempCustomer( { ...customer } );
                                    setChanged( false );
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                form='customer'
                                className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                            >
                                Save
                            </button>
                        </div>
                    ) : null}

                    <div>
                        <button
                            className='bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                            onClick={( e ) => {
                                const url = baseUrl + 'api/customers/' + id;
                                fetch( url, {
                                    method: 'DELETE',
                                    header: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + localStorage.getItem( 'access' )
                                    },
                                } )
                                    .then( ( response ) => {
                                        if ( response.status === 401 ) {
                                            setLoggedIn( false );
                                            navigate( '/login', {
                                                state: {
                                                    previousUrl: location.pathname,
                                                }
                                            } );
                                        }
                                        if ( !response.ok ) {
                                            throw new Error(
                                                'Something went wrong'
                                            );
                                        }
                                        setError( undefined );
                                        navigate( '/customers' );
                                    } )
                                    .catch( ( e ) => {
                                        // console.log( e );
                                        setError( e.message );
                                    } );
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : null}
            {error ? <p>{error}</p> : null}
            <br></br>

            {/* onCLick in navigate alternative */}
            <Link to='/Customers/'>
                <button className='no-underline bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
                    ← Go back
                </button>
            </Link>
        </div>
    );
}
