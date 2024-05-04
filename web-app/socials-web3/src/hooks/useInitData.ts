import { useEffect } from "react";

const useInitData = () => {
  const initAll = async () => {
    Promise.all([]);
  };

  useEffect(() => {
    initAll();
  }, []);
};

export default useInitData;
