import React, { useEffect, useState } from 'react';
import AddUser from './AddUser';
import firebaseObj from './firebase';
import Swal from 'sweetalert2';

const Parent = () => {
    const firebaseRealtimeDb = firebaseObj.database();
    const [usersList_original, setUsersList_original] = useState();
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        firebaseRealtimeDb.ref('users').on('value', snapchat => {
            console.log(snapchat.val());
            var duplicateList = snapchat.val();
            var temp = [];
            for (var id in duplicateList) {
                temp.push({ id, ...duplicateList[id] });
            }
            setUsersList_original(temp);
            console.log(usersList_original);
        })
    }, [firebaseRealtimeDb]);

    const deleteUser = (user) => {
        firebaseRealtimeDb.ref(`users/${user.id}`).remove((error) => {
            if (!error) {
                Swal.fire('Congrats', 'User deleted Succefully', 'success');
            } else {
                Swal.fire('Error', 'Something went wrong', 'error');
            }
        });
    }

    const tableBody = usersList_original ? usersList_original.map((user) => {
        return <tr key={user.id}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>
                <i className="far fa-trash-alt m-2" onClick={() => deleteUser(user)}></i>
                <i className="fas fa-edit m-2" onClick={() => setCurrentUser(user)}></i>
            </td>
        </tr>
    }) : null;
    return (<>
        <div className='container'>
            <div className='row justify-content-center text-center mt-3'>
                <div className='col-md-6 shadow p-3 mb-5 bg-white rounded'>
                    <AddUser currentUser={currentUser} />
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <h1>Users List</h1>
                    <table className='table table-dark'>
                        <thead>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
}

export default Parent;