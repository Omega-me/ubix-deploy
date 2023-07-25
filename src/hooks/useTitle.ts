import { useAppSelector, useAppDispatch } from 'state/redux/store';
import { setTitle } from 'state/redux/store/global.store';

const useTitle = () => {
  const { title } = useAppSelector(store => store.globalState);
  const dispatch = useAppDispatch();

  /**
   *
   * @param title
   */
  const setAppTitle = (title: string) => {
    dispatch(setTitle(title));
  };

  return { setAppTitle, title };
};

export default useTitle;
