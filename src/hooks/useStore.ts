import { useAppSelector } from 'state/redux/store';

/**
 *
 * @returns redux store
 */
const useStore = () => {
  const store = useAppSelector(store => store);

  return { ...store };
};

export default useStore;
