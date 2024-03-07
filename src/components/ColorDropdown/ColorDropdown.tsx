import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {filterState, setColor} from "../../store/reducers/groupsSlice";
import s from "./ColorDropdown.module.css";

const ColorDropdown = () => {
    const {filters, groups} = useAppSelector(state => state.groupsSlice)
    const dispatch = useAppDispatch()

    const colors = useMemo(() => {
        const set = new Set()
        groups.forEach(el => el.avatar_color && set.add(el.avatar_color))
        return Array.from(set)
    }, [groups])
    const toggleColor = (val: string | null) => {
        dispatch(setColor(val))
        dispatch(filterState())
        toggle()
    }

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const dropdownRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    return (
        <div className={s.dropdown} ref={dropdownRef}>
            <button className={s.toggle_btn} onClick={toggle}>
                {filters.color ?? 'Любой'}
            </button>
            {
                isOpen &&
                <div className={s.items_list}>
                    <button onClick={() => toggleColor(null)}>Любой</button>
                    {
                        colors.map(el =>
                            <button onClick={() => toggleColor(el as string)}>{el as string}</button>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default ColorDropdown;