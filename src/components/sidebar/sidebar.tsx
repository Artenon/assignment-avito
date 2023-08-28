import { FC, Dispatch, SetStateAction } from "react";
import { Offcanvas, Col } from "react-bootstrap";
import { FilterPlatform, FilterGenre, Sorting } from "../filter";

type SideBarProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const SideBar: FC<SideBarProps> = ({ isOpen, setIsOpen }) => {
  const hideHandler = () => setIsOpen(false);

  return (
    <Offcanvas
      show={isOpen}
      onHide={hideHandler}
      data-bs-theme="dark"
      style={{ maxWidth: 250 }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filter</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Col>
          <FilterPlatform light />
        </Col>
        <Col className="mt-2">
          <FilterGenre light />
        </Col>
        <Col className="mt-2">
          <Sorting light />
        </Col>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
