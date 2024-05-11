import { useSelector } from 'react-redux';
export default function useVerify() {
  const { token } = useSelector(state => state.token);
  if (!token) { return false; };
  return true;
}