import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import ReactPaginate from "react-paginate";
import { Col, Row } from "react-bootstrap";
import { Game } from "../../types/types";

import s from "./pagination.module.css";

const itemsPerPage = 18;

type PaginateProps = {
  pagesDisplayed: number;
  setItemOffset: Dispatch<SetStateAction<number>>;
  pageCount: number;
  length: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const Paginate: FC<PaginateProps> = ({
  pagesDisplayed,
  setItemOffset,
  pageCount,
  length,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = ({ selected }: { selected: number }) => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
    const newOffset = (selected * itemsPerPage) % length;
    setItemOffset(newOffset);
    setCurrentPage(selected);
  };

  return (
    <ReactPaginate
      nextLabel="&raquo;"
      onPageChange={handlePageClick}
      pageRangeDisplayed={pagesDisplayed}
      marginPagesDisplayed={pagesDisplayed}
      pageCount={pageCount}
      previousLabel="&laquo;"
      pageClassName={`page-item ${s.page_item}`}
      pageLinkClassName={`page-link ${s.page_link}`}
      previousClassName={`page-item ${s.page_item}`}
      previousLinkClassName={`page-link ${s.page_link}`}
      nextClassName={`page-item ${s.page_item}`}
      nextLinkClassName={`page-link ${s.page_link}`}
      breakLabel="..."
      breakClassName={`page-item ${s.page_item}`}
      breakLinkClassName={`page-link ${s.page_link}`}
      containerClassName="pagination justify-content-center px-0"
      activeClassName={s.active}
      disabledClassName={s.disabled}
      forcePage={currentPage}
    />
  );
};

type PaginationProps = {
  games: Game[];
  setCurrentItems: Dispatch<SetStateAction<Game[]>>;
};

export const Pagination: FC<PaginationProps> = ({ games, setCurrentItems }) => {
  const [pageCount, setPageCount] = useState<number>(1);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(games.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(games.length / itemsPerPage));
  }, [games, itemOffset, setCurrentItems]);

  return (
    <Row>
      <Col className="d-none d-md-block">
        <Paginate
          pagesDisplayed={2}
          setItemOffset={setItemOffset}
          pageCount={pageCount}
          length={games.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Col>
      <Col className="d-block d-md-none">
        <Paginate
          pagesDisplayed={1}
          setItemOffset={setItemOffset}
          pageCount={pageCount}
          length={games.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Col>
    </Row>
  );
};
