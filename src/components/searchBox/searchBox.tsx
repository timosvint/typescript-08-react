import { useAppDispatch, useAppSelector } from "../../TypeScript-types/redux-types/hookis"
import { onFilter } from "../../redux/filter/filter"
import { selectFilterName } from "../../redux/filter/selectorFilter";
import TextField from "@mui/material/TextField"; 
import css from "./searchBox.module.css"
export const SearchBox = () => {
    const dispatch = useAppDispatch();
   const filter = useAppSelector(selectFilterName)


   return ( <div className={css.mainDiv}>
       <TextField className={css.link} id="standard-basic" label="Filter" variant="standard" type="text" value={filter} onChange={event => dispatch(onFilter(event.target.value))} />
       </div>
   )
}

