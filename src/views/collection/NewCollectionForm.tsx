import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createCollectionAction} from '../../store/saga/collection/collection.sagaActions';

const NewCollectionForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(createCollectionAction({name}));
    };

    return (
        <div>
            <p>New collection form</p>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </form>
            </div>
        </div>
    );
};

export default NewCollectionForm;
