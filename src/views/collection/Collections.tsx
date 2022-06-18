import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCollectionsAction} from '../../store/saga/collection/collection.sagaActions';
import {collectionSelector} from '../../store/reducer/collection/collection.selector';
import {getDynamicRoute, routeInd} from '../../router/routes';

const Collections = () => {
    const dispatch = useDispatch();
    const {collections} = useSelector(collectionSelector);

    useEffect(() => {
        dispatch(fetchCollectionsAction());
    }, []);

    return (
        <div>
            <p>Collections</p>
            <div>
                {collections &&
                    collections.data.map((collection) => (
                        <div key={`collections-list-item-${collection._id}`}>
                            <Link to={getDynamicRoute(routeInd.COLLECTION, [collection._id as string])}>
                                {collection.name}
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Collections;
