import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {fetchCollectionAction, updateCollectionAction} from '../../store/saga/collection/collection.sagaActions';
import {collectionSelector} from '../../store/reducer/collection/collection.selector';
import Form from '../../components/form/Form';
import H1 from '../../components/elements/H1';
import Field from '../../components/form/Field/Field';
import CenteredContainer from '../../components/shared/CenteredContainer';

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

    const handleSubmit = () => {
        dispatch(updateCollectionAction({...collection?.data, name}));
    };

    return (
        <CenteredContainer>
            <Form handleSubmit={handleSubmit}>
                <H1>Update collection</H1>
                <Field label="Name" name="name" value={name} handleChange={(name, value) => setName(value as string)} />
            </Form>
        </CenteredContainer>
    );
};

export default EditCollectionForm;
