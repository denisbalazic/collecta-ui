import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createCollectionAction} from '../../../store/saga/collection/collection.sagaActions';
import Field from '../../compounds/Field';
import Form from '../../compounds/Form';
import H1 from '../../elements/H1';
import CenteredContainer from '../../elements/CenteredContainer';

const NewCollectionForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');

    const handleSubmit = () => {
        dispatch(createCollectionAction({name}));
    };

    return (
        <CenteredContainer>
            <Form handleSubmit={handleSubmit}>
                <H1>New collection</H1>
                <Field
                    label="Name"
                    name="name"
                    placeholder="Name"
                    value={name}
                    handleChange={(name, value) => setName(value as string)}
                />
            </Form>
        </CenteredContainer>
    );
};

export default NewCollectionForm;
