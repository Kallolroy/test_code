import axios from "../utils/axios";
import { setError } from '../actions/error-actions';

export const getImageData = async (companyId, imageId) => {
    var imageData = null;
    const url = `/common/companies/${companyId}/images/${imageId}`
    await axios.get(url)
        .then(res => {
            (res.data !== "") && (imageData = res.data);
        }).catch(err => {
            console.log(err);
        });
    return imageData;
};

