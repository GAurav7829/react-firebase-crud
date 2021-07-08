import React, { useEffect, useState } from 'react';
import firebaseObj from './firebase';
import Swal from 'sweetalert2';

const AddUser = (props) => {
    const firebaseRealtimeDb = firebaseObj.database();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');

    const saveData = () => {
        var user = {
            firstname: fname,
            lastname: lname,
            email: email
        }
        if (props.currentUser) {
            firebaseRealtimeDb.ref(`users/${props.currentUser.id}`).set(user, (error) => {
                if (!error) {
                    Swal.fire('Congrats', 'User details updated successfully', 'success');
                } else {
                    Swal.fire('Error', 'Something went wrong', 'error');
                }
            });
        } else {
            firebaseRealtimeDb.ref('users').push(user, (error) => {
                if (!error) {
                    Swal.fire('Congrats', 'User added Succefully', 'success');
                } else {
                    Swal.fire('Error', 'Something went wrong', 'error');
                }
            });
        }
        setFname('');
        setLname('');
        setEmail('');
    }
    useEffect(() => {
        if (props.currentUser) {
            setFname(props.currentUser.firstname);
            setLname(props.currentUser.lastname);
            setEmail(props.currentUser.email);
        }
    }, [props.currentUser]);
    return (<>
        <h1>Add User</h1>
        <input type='text' className='form-control' placeholder='firstname' value={fname} onChange={(e) => setFname(e.target.value)} />
        <input type='text' className='form-control' placeholder='lastname' value={lname} onChange={(e) => setLname(e.target.value)} />
        <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='button' value='SAVE' className='btn btn-primary' onClick={saveData} />
    </>);
}

export default AddUser;