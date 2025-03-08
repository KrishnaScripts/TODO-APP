import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { todosData } from "../utils/interface";
import { setTodos } from "../redux/slicers/todosSlicers";

const CreateTodos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = window.location.pathname;
    const id = url.split('/')[2]; // get Id for Update records
    const allTodos = useSelector((state: any) => state?.users?.todosList);

    const [todoData, setTodoData] = useState<todosData>({ title: '', comments: '' });

    const [errors, setErrors] = useState({
        title: ''
    });

    // Handle form submission
    const handleClick = () => {
        if (validateForm()) {
            dispatch(setTodos(todoData));
            navigate('/');
        }
    }
    // Handle validation
    const validateForm = () => {
        let isValid = true;
        const newErrors = { title: '' };

        if (todoData.title.trim() === '') {
            newErrors.title = 'Title is required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    // Handle change in Title input field
    const handleTitleChange = (e: any) => {
        setTodoData({ ...todoData, title: e.target.value });

        // Automatically clear the error if user starts typing
        if (e.target.value.trim() !== '') {
            setErrors({ ...errors, title: '' });
        }
    }

    // Handle Edit case if ID is present
    useEffect(() => {
        if (id !== undefined) {
            const returnCurrent = allTodos.find((data: any) => data.id == id);
            if (returnCurrent) {
                setTodoData({
                    id: returnCurrent.id,
                    title: returnCurrent.title,
                    comments: returnCurrent.comments
                });
            }
        }
    }, []);

    return (
        <>
            <Header />
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="col-lg-12">
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    value={todoData.title}
                                    onChange={handleTitleChange}
                                />
                                {errors.title && <div className="text-danger">{errors.title}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Comments</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={todoData.comments}
                                    onChange={(e: any) => { setTodoData({ ...todoData, comments: e.target.value }) }}
                                />
                            </div>
                            <div className="mb-3">
                                <input 
                                    type="button" 
                                    value="Save" 
                                    className='btn btn-success me-2' 
                                    onClick={handleClick}
                                />
                                <Link to='/' className='btn btn-danger'>Cancel</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateTodos;
