import { ImSpinner8 } from 'react-icons/im';
import './loading.scss';

export default function Loading() {
    return (
        <div className='loading-contents'>
            <ImSpinner8 className='icon'/>
        </div>
    )
}