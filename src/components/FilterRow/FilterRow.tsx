import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {filterState, setFriends, setPrivacy} from "../../store/reducers/groupsSlice";
import ColorDropdown from "../ColorDropdown/ColorDropdown";
import s from "./FilterRow.module.css";

const FilterRow = () => {
    const {filters} = useAppSelector(state => state.groupsSlice)
    const dispatch = useAppDispatch()
    const togglePrivacy = (val: boolean | null) => {
        dispatch(setPrivacy(val))
        dispatch(filterState())
    }
    const toggleFriends = (val: boolean | null) => {
        dispatch(setFriends(val))
        dispatch(filterState())
    }
    return (
        <div>
            <h2>Фильтры по:</h2>
            <div className={s.cont}>
                <div className={s.col}>
                    <h3>Приватности</h3>
                    <label>
                        <input
                            type={'radio'}
                            name={'privacy'}
                            checked={filters.privacy === null}
                            onClick={() => togglePrivacy(null)}
                        />
                        Все
                    </label>
                    <label>
                        <input
                            type={'radio'}
                            name={'privacy'}
                            checked={filters.privacy === false}
                            onClick={() => togglePrivacy(false)}
                        />
                        Открытые
                    </label>
                    <label>
                        <input
                            type={'radio'}
                            name={'privacy'}
                            checked={filters.privacy === true}
                            onClick={() => togglePrivacy(true)}
                        />
                        Закрытые
                    </label>
                </div>
                <div className={s.col}>
                    <h3>Наличию друзей</h3>
                    <label>
                        <input
                            type={'radio'}
                            name={'friends'}
                            checked={filters.hasFriends === null}
                            onClick={() => toggleFriends(null)}
                        />
                        Все
                    </label>
                    <label>
                        <input
                            type={'radio'}
                            name={'friends'}
                            checked={filters.hasFriends === true}
                            onClick={() => toggleFriends(true)}
                        />
                        Есть
                    </label>
                    <label>
                        <input
                            type={'radio'}
                            name={'friends'}
                            checked={filters.hasFriends === false}
                            onClick={() => toggleFriends(false)}
                        />
                        Нет
                    </label>
                </div>
                <div className={s.col}>
                    <h3>Цвету</h3>
                    <ColorDropdown/>
                </div>
            </div>
        </div>
    );
};

export default FilterRow;