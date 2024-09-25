import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {useFetchCollectionsQuery} from '../../../store/api/collection.api';
import {IPagination} from '../../../types/pageable';

const Collections = (): ReactElement => {
    const {data, error, isLoading} = useFetchCollectionsQuery();
    const {pagination, content: collections} = data || {};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div>
            <p>Collections</p>
            <div>
                {collections?.map((collection) => (
                    <div key={`collections-list-item-${collection._id}`}>
                        <Link to={`/collections/${collection._id as string}`}>{collection.name}</Link>
                    </div>
                ))}
            </div>
            <div>{(pagination as IPagination).page}</div>
            <div>{(pagination as IPagination).size}</div>
        </div>
    );
};

export default Collections;
