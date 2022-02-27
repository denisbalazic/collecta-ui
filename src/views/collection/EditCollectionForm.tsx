import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {fetchCollectionAction, updateCollectionAction} from '../../store/saga/collection/collection.sagaActions';
import {collectionSelector} from '../../store/reducer/collection/collection.selector';

const EditCollectionForm = () => {
    const dispatch = useDispatch();
    const {collectionId = ''} = useParams();
    const {collection} = useSelector(collectionSelector);
    const [name, setName] = useState<string>('');

    useEffect(() => {
        dispatch(fetchCollectionAction(collectionId));
    }, [collectionId]);

    useEffect(() => {
        if (collection) {
            setName(collection.data.name);
        }
    }, [collection]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(updateCollectionAction({...collection?.data, name}));
    };

    return (
        <div>
            <p>Edit collection form</p>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </form>
            </div>
        </div>
    );
};

export default EditCollectionForm;
