import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {fetchGroups} from "./store/reducers/ActionCreators";
import GroupItem from "./components/GroupItem/GroupItem";
import FilterRow from "./components/FilterRow/FilterRow";
import s from "./App.module.css";

const App = () => {
    const dispatch = useAppDispatch()
    const {isLoading, error, filteredList} = useAppSelector(state => state.groupsSlice)
    useEffect(() => {
        dispatch(fetchGroups())
    }, [])
    return (
        <main className={s.cont}>
            {error && <h1 className={s.textCenter}>{error}</h1>}
            {isLoading ?
                <h1 className={s.textCenter}>Идет загрузка...</h1>
                :
                <section className={s.section}>
                    <FilterRow/>
                    {
                        filteredList.length > 0 ?
                            <ul className={s.list}>
                                {
                                    filteredList.map(group =>
                                        <GroupItem group={group} key={group.id}/>
                                    )
                                }
                            </ul>
                            :
                            <h1 className={s.textCenter}>По вашему запросу ничего не найдено</h1>
                    }
                </section>

            }

        </main>
    );
};

export default App;