import React, { useState } from 'react'
import apiActions from '../utility/apiCall';
export default function Popup({ setviewMode, setnewRecord, newRecord }: any): React.ReactElement {
    const { first_name, last_name, email, id } = newRecord[0];
    const [btnevent, setBtnEvent] = useState<number>(0);
    const [firstName, setFirstName] = useState<string>(first_name);
    const [lastName, setLastName] = useState<string>(last_name);
    const [emailid, setEmailid] = useState<string>(email);

    function updateUserRecord(e: any): void {
        // const { 0: first_name, 1: last_name, 2: email } = e.target;
        // let record = {
        //     "first_name": first_name.value,
        //     "last_name": last_name.value,
        //     "email": email.value,
        //     "id": id
        // }
        // apiActions.put(`https://reqres.in/api/users/${newRecord.id}`, record).then((result) => {
        // });
    }
    function submit(e: React.SyntheticEvent<HTMLFormElement>) {
        if (btnevent === 1) {
            setviewMode(false);
        }
        if (btnevent === 2) {
            updateUserRecord(e);

        }
    }

    // function updateFiledValues(e: React.ChangeEvent<HTMLInputElement>) {
    //     const value = e.target.value;
    //     setnewRecord({
    //         ...newRecord,
    //         [e.target.name]: value
    //     });
    //     console.log(newRecord);
    // }
    return (
        <form className="modal-content" onSubmit={submit} data-testid="poupForm">
            <div className='movecenter'>
                First Name : <b>
                    <input type="text" data-testid="poupFirstNameTestId" onChange={e => setFirstName(e.target.value)} value={firstName} name="first_name" placeholder="First Name" />
                </b>
            </div>
            <div className='movecenter'>
                Last Name : <b>
                    <input type="text" data-testid="poupLastNameTestId" onChange={e => setLastName(e.target.value)} value={lastName} name="last_name" placeholder="Last Name" /></b>
            </div>
            <div className='movecenter'>
                Email Id : <b>
                    <input type="text" data-testid="poupEmailIdTestId" onChange={e => setEmailid(e.target.value)} value={emailid} name="email" placeholder="email" />
                </b>
            </div>
            <div className='movecenter'>
                <button data-testid="closeBtn" onClick={() => setBtnEvent(1)}>Close</button>
                <input type="submit" data-testid="updateBtn" onClick={() => setBtnEvent(2)} value='UpdateRecord' />
            </div>
        </form>
    )
}
