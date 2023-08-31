import { FC } from "react";
import { Col, Navbar } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { FilterPlatform, FilterGenre, Sorting } from "../filter";

import s from "./sidebar.module.css";

export const SideBar: FC = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="md" variant="dark" className={s.navbar}>
        <Navbar.Toggle>
          <div className={s.filter}>
            <FaFilter />
            Filter
          </div>
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Col className="mt-2 d-md-none">
            <FilterPlatform light />
          </Col>
          <Col className="mt-2 d-md-none">
            <FilterGenre light />
          </Col>
          <Col className="my-2 d-md-none">
            <Sorting light />
          </Col>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
