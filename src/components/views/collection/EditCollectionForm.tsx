import React, {ReactElement, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Form from '../../compounds/Form';
import {H1} from '../../elements/headers';
import Field from '../../compounds/Field';
import CenteredContainer from '../../elements/CenteredContainer';
import {useFetchCollectionQuery, useUpdateCollectionMutation} from '../../../store/api/collection.api';

const EditCollectionForm = (): ReactElement => {
    const {collectionId = ''} = useParams();
    const [name, setName] = useState<string>('');

    const {data: collection} = useFetchCollectionQuery(collectionId);

    const [updateCollection, {error: updateError}] = useUpdateCollectionMutation();

    useEffect(() => {
        if (collection) {
            setName(collection.name);
        }
    }, [collection]);

    const handleSubmit = (): void => {
        updateCollection({...collection, name});
    };

    return (
        <CenteredContainer>
            <Form onSubmit={handleSubmit}>
                <H1>Update collection</H1>
                <Field label="Name" name="name" value={name} onChange={(name, value) => setName(value as string)} />
            </Form>
            {updateError && <div>Error updating</div>}
        </CenteredContainer>
    );
};

export default EditCollectionForm;
