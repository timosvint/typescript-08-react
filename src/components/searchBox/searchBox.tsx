import { useAppDispatch, useAppSelector } from "../../TypeScript-types/redux-types/hookis"
import { onFilter } from "../../redux/filter/filter"
import { selectFilterName } from "../../redux/filter/selectorFilter";

export const SearchBox = () => {
    const dispatch = useAppDispatch();
   const filter = useAppSelector(selectFilterName)


   return ( <div>
        <p>Find contacts by name</p>
        <input type="text" value={filter} onChange={event => dispatch(onFilter(event.target.value))}></input>    
    </div>
   )
}

