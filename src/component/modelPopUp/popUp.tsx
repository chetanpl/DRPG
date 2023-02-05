import React, { useState } from 'react'
export default function Popup({ setviewMode, setnewRecord, newRecord }: any): React.ReactElement {
const { first_name, last_name, email } = newRecord[0];
console.log('first_name',first_name);
    const [btnevent, setBtnEvent] = useState<number>(0);

    function updateUserRecord(e: any): void {
        const { 0: first_name, 1: last_name, 2: email } = e.target;
        let record = {
            "first_name": first_name.value,
            "last_name": last_name.value,
            "email": email.value
        }
        // apiActions.put(`https://reqres.in/api/users/${newRecord.id}`,record).then((result) => {

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
   
    function updateFiledValues(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setnewRecord({
            ...newRecord,
            [e.target.name]: value
        });
    }
    return (
        <form className="modal-content" onSubmit={submit} data-testid="poupForm">
            <div className='movecenter'>
                First Name : <b>
                    <input type="text" data-testid="poupFirstNameTestId" onChange={e => updateFiledValues(e)} value={first_name} name="first_name" placeholder="First Name" />
                </b>
            </div>
            <div className='movecenter'>
                Last Name : <b>
                    <input type="text" data-testid="poupLastNameTestId" onChange={e => updateFiledValues(e)} value={last_name} name="last_name" placeholder="Last Name" /></b>
            </div>
            <div className='movecenter'>
                Email Id : <b>
                    <input type="text" data-testid="poupEmailIdTestId" onChange={e => updateFiledValues(e)} value={email} name="email" placeholder="email" />
                </b>
            </div>
            <div className='movecenter'>
                <button data-testid="closeBtn"  onClick={() => setBtnEvent(1)}>Close</button>
                <input type="submit" data-testid="updateBtn"  onClick={() => setBtnEvent(2)} value='UpdateRecord' />
            </div>
        </form>
    )
}