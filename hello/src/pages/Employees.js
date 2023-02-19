import '../index.css';
import Employee from '../components/Employee';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddEmployee from '../components/AddEmployee';
import EditEmployee from '../components/EditEmployee';
import Header from '../components/Header';

function Employees () {
    const [employees, setEmployees] = useState(
        [
            {
                id: 1,
                name: 'Hoang',
                role: 'Developer',
                img: 'https://images.pexels.com/photos/15299026/pexels-photo-15299026.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'
            },
            {
                id: 2,
                name: 'Ty',
                role: 'Manager',
                img: 'https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=400'
            },
            {
                id: 3,
                name: 'Teo',
                role: 'Tester',
                img: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=400'
            },
            {
                id: 4,
                name: 'Martial ',
                role: 'Developer',
                img: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=400'
            },
            {
                id: 5,
                name: 'Tamra ',
                role: 'Seller',
                img: 'https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=400'
            },
            {
                id: 6,
                name: 'Karola ',
                role: 'Senior',
                img: 'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=400'
            },
            {
                id: 7,
                name: 'Karola ',
                role: 'Senior',
                img: 'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=400'
            },

        ]
    );

    // create a new list and replace a state list 
    function updateEmployee ( id, newName, newRole ) {
        const updatedEmployees = employees.map( ( employee ) => {
            if ( id == employee.id ) {
                // return new employee
                return { ...employee, name: newName, role: newRole }; //spreading 
            }
            return employee;
        } );
        setEmployees( updatedEmployees );
    }

    function newEmployee ( name, role, img ) {
        const newEmployee = {
            id: uuidv4(),
            name: name,
            role: role,
            img: img,
        };
        setEmployees( [...employees, newEmployee] );
    }

    const showEmployees = true;
    return (
        <div className="">
            {/* if showEmployees == true -> show all employees */}
            {showEmployees ? (
                <>
                    <div className='flex flex-wrap justify-center'>
                        {employees.map( ( employee ) => {
                            const editEmployee = <EditEmployee
                                id={employee.id}
                                name={employee.name}
                                role={employee.role}
                                updateEmployee={updateEmployee}
                            />;
                            return (
                                <Employee
                                    key={employee.id}
                                    id={employee.id}
                                    name={employee.name}
                                    role={employee.role}
                                    img={employee.img}
                                    editEmployee={editEmployee}
                                />
                            );
                        } )}
                    </div>

                    <AddEmployee newEmployee={newEmployee} />
                </>
            ) : (

                <p>You cannot see Employees</p>
            )}
        </div>
    );
}

export default Employees;
