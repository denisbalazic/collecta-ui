import {useMatch} from 'react-router-dom';
import {ICollection} from '../types/ICollection';
import {useFetchCollectionQuery} from '../store/api/collection.api';

interface collectionHook {
    isCollectionMode: boolean;
    collection?: ICollection;
}

export const useCollection = (): collectionHook => {
    const match = useMatch('/collections/:id/*');
    const collectionId = match?.params?.id;

    const {data: collection} = useFetchCollectionQuery(collectionId || '', {skip: !collectionId});

    return {
        isCollectionMode: !!collectionId,
        collection,
    };
};
