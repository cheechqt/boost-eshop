import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

const useFetchCollection = (colName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCollection = () => {
      setIsLoading(true);
      try {
        const colRef = collection(db, colName);
        const q = query(colRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
          const allData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(allData);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    };
    getCollection();
  }, [colName]);

  return { data, isLoading };
};

export default useFetchCollection;
