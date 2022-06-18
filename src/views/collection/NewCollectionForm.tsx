import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createCollectionAction} from '../../store/saga/collection/collection.sagaActions';
import Field from '../../components/form/Field/Field';
import Form from '../../components/form/Form';
import H1 from '../../components/elements/H1';
import CenteredContainer from '../../components/shared/CenteredContainer';

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
