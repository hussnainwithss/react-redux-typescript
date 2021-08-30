import { useLocation } from 'react-router';

/** *
    Function Gives Access to URLSearchParams
  ** */
export default function useQuery(): URLSearchParams {
    return new URLSearchParams(useLocation().search);
}
