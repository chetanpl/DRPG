// https://reqres.in/api/users?page=2

import React, { useEffect, useState } from "react";
import apiActions from "../utility/apiCall";
import "./userList.css";
import Popup from '../modelPopUp/popUp'
import Pagination from "../pagination/pagination";
import { gridObject } from "../utility/typeref";

function UserList() :React.ReactElement{
    const [userdata, setuserdata] = useState<gridObject[]>([]);
    const [filter, setFilter] = useState<gridObject[]>([]);
    const [viewMode, setviewMode] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [newRecord, setnewRecord] = useState<gridObject[]>();
    const [endPage, setEndPage] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setSetError] = useState<boolean>(false);


    useEffect(() => {
        retriveUsersList();
    }, [currentPage]);
    function searchEngine(name: string): void {
        const selectedRow = userdata?.filter(function (res: gridObject): boolean {
            return res.last_name.toLowerCase() === name.toLowerCase() || res.email.toLowerCase() === name.toLowerCase()
        });

        (name.length < 1) ?
            setFilter(userdata) :
            setFilter(selectedRow)

    }
    function retriveUsersList() {
        setLoading(true);
        apiActions.Get(`https://reqres.in/api/users?page=${currentPage}`).then((result) => {
            const { data, total } = result?.data;
            setEndPage(total);
            setuserdata(data);
            setFilter(data);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            setSetError(error.message)
        });
    }

    function handleView(rowid: number) {
        const selectedRow = userdata.filter((res: gridObject) => res.id === rowid)
        setnewRecord(selectedRow);
        setviewMode(true);
        //searchEngine(selectedRow[0].first_name);
        setFilter(userdata);
    }
    if (loading) return <pre>"Loading..."</pre>;
    if (error) return <pre>{error} </pre>

    return (
        <div className="myApp">
            <div className="search">Search: <input type='search' onChange={e => searchEngine(e.target.value)} /> Current Page :{currentPage}</div>
            {filter.length > 0 ? <div className="overflow"><table>
                <tbody>
                    <tr className="header">
                        <th className="avtar">Avtar</th>
                        <th className="tbl_title">Email</th>
                        <th className="tbl_title">First Name</th>
                        <th className="tbl_title">Last Name</th>
                        <th className="tbl_title">View</th>
                    </tr>
                </tbody>
                <tbody>
                    {
                        filter?.map((item) => (
                            <tr key={item?.id}>
                                <td className="tbl_img">{item?.avatar ? <img className="avtar" src={item?.avatar} alt={item.first_name} /> : ''}</td>
                                <td className="tbl_row">{item?.email}</td>
                                <td className="tbl_row">{item?.first_name}</td>
                                <td className="tbl_row">{item?.last_name}</td>
                                <td className="tbl_row">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleView(item.id)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table></div> : 'No Records Found'}
            {viewMode && (
                <div
                    className={"modal " + (viewMode ? "displayBlock" : "displayNone")}>
                    <Popup setviewMode={setviewMode} setnewRecord={setnewRecord} newRecord={newRecord}></Popup>
                </div>
            )}
            <div className="pagination">
                <Pagination
                    totalPosts={endPage}
                    paginate={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}
export default UserList;