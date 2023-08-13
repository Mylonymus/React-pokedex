import { Input } from "antd";
import { setFilter } from "../slices/dataSlice";
import { useDispatch } from "react-redux";

const Searcher = () => {

    const dispatch = useDispatch();
    const handleOnChange = (e) => {
        dispatch(setFilter(e.target.value));
    };

    return <Input.Search placeholder="Buscar..." onChange={handleOnChange} style={{marginBottom: 10}}/>
}

export default Searcher;