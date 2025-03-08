import { Link } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { todosData } from "../utils/interface";
import { deleteTodos } from "../redux/slicers/todosSlicers";

const TodoList = () => {

    // Redux hooks for dispatching actions and accessing state
    const dispatch = useDispatch();
    const allTodosData = useSelector((state: any) => state?.users?.todosList);
    const [allTodos, setAllTodos] = useState<todosData[]>([]);

    //  Update the local state when the Redux state changes
    useEffect(() => {
        setAllTodos(allTodosData);
    }, [allTodosData]);

    //Handle delete operation
    const handleDelete = (userId: any) => {
        if (window.confirm("Are you sure you want to delete this TODO?")) {
            dispatch(deleteTodos(userId));
        }
    };

    return (
        <>
        {/* Reusable Header Component*/}
            <Header />
            <div className="container my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                <Link to='/create' className='btn fs-5'>+ Add Task</Link>
            </div>

            {/* Check if there are TODOs available */}
            {allTodos.length > 0 ? (
                <table className="table table-hover table-striped table-bordered shadow-lg">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Comments</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTodos.map((data: todosData, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.title}</td>
                                <td>{data.comments}</td>
                                <td className="d-flex gap-2">
                                    <Link to={`/edit/${data.id}`} className='btn'>
                                        <i className="bi bi-pencil-square"></i> Edit
                                    </Link>
                                    <button
                                        type='button'
                                        className='btn btn-danger btn-sm'
                                        onClick={() => handleDelete(data.id)}
                                    >
                                        <i className="bi bi-trash"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center mt-5">
                    <h4 className="text-secondary">No TODOs found</h4>
                </div>
            )}
</div>

        </>
    );
};

export default TodoList;
