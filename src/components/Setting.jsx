import { AddIcon, HamburgerIcon, InfoIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { databases, DB_ID, COLLECTION_ID } from "../lib/appwrite";
import { useEffect } from "react";

function Setting({ data, hasAuth }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const resetVotes = (e) => {
    if (!hasAuth) {
      alert("권한이 없습니다.");
    } else {
      const isConfirm = confirm("투표를 초기화하시겠습니까?");
      if (isConfirm) {
        databases.updateDocument(DB_ID, COLLECTION_ID, data[0].$id, {
          votes_1: 0,
          votes_2: 0,
          votes_3: 0,
        });
      }
    }
  };

  const addMenu = (e) => {
    if (!hasAuth) {
      alert("권한이 없습니다.");
    } else {
    }
  };

  return (
    <div className="setting-menu">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem
            icon={<RepeatIcon />}
            onClick={resetVotes}
            {...(hasAuth ? { command: "★" } : {})}
          >
            투표 리셋
          </MenuItem>
          <MenuItem
            icon={<AddIcon />}
            onClick={addMenu}
            {...(hasAuth ? { command: "★" } : {})}
          >
            메뉴 추가
          </MenuItem>
          <MenuItem icon={<InfoIcon />} onClick={onOpen}>
            info
          </MenuItem>
        </MenuList>
      </Menu>
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>투표</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            메뉴 선택 후 제출을 눌러주세요.
            <br />
            <span style={{ color: "red", fontSize: "12px" }}>
              *취소는 불가합니다.
            </span>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Setting;
