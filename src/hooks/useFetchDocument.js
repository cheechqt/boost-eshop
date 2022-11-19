import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useFetchDocument(colName, docID) {
  const [document, setDocument] = useState(null);

  const getDocument = async () => {
    const docRef = doc(db, colName, docID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDocument({
        id: docID,
        ...docSnap.data(),
      });
    } else {
      toast.error("Document not found");
    }
  };

  useEffect(() => {
    getDocument();
  });

  return { document };
}

export default useFetchDocument;
