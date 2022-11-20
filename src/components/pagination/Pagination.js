import { useState } from "react";
import styles from "./Pagination.module.scss";

function Pagination({ productsPerPage, curPage, setCurPage, totalProducts }) {
  const pageNums = [];
  const totalPages = totalProducts / productsPerPage;
  //page nums limit
  const [pageNum] = useState(5);
  const [maxNum, setMaxNum] = useState(5);
  const [minNum, setMinNum] = useState(0);

  //pagination
  const paginate = (pageNum) => {
    setCurPage(pageNum);
  };

  const paginateNext = () => {
    setCurPage(curPage + 1);
    if (curPage + 1 > maxNum) {
      setMaxNum(maxNum + pageNum);
      setMinNum(minNum + pageNum);
    }
  };

  const paginatePrev = () => {
    setCurPage(curPage - 1);

    if ((curPage - 1) % pageNum === maxNum) {
      setMaxNum(maxNum - pageNum);
      setMinNum(minNum - pageNum);
    }
  };

  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNums.push(i);
  }

  return (
    <ul className={styles.pagination}>
      <li
        onClick={paginatePrev}
        className={curPage === pageNums[0] ? `${styles.hidden}` : null}
      >
        Prev
      </li>
      {pageNums.map((num) => {
        if (num < maxNum + 1 && num > minNum) {
          return (
            <li
              key={num}
              onClick={() => paginate(num)}
              className={curPage === num ? `${styles.active}` : null}
            >
              {num}
            </li>
          );
        }
        return null;
      })}
      <li
        onClick={paginateNext}
        className={
          curPage === pageNums[pageNums.length - 1] ? `${styles.hidden}` : null
        }
      >
        Next
      </li>
      <p>
        <b className={styles.page}>{`page ${curPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
}

export default Pagination;
