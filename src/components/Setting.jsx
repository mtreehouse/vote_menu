import {
  EditIcon,
  HamburgerIcon,
  InfoIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
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
import { useRef } from "react";

function Setting({ data, hasAuth }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalData = useRef({ title: "", body: null });

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

  const editMenu = (e) => {
    if (!hasAuth) {
      alert("권한이 없습니다.");
    } else {
      modalData.current = {
        title: "메뉴 수정",
        body: <>menu</>,
      };
      onOpen(e);
    }
  };

  const showInfo = (e) => {
    modalData.current = {
      title: "투표",
      body: (
        <>
          메뉴 선택 후 제출을 눌러주세요.
          <br />
          <span style={{ color: "red", fontSize: "12px" }}>
            *취소는 불가합니다.
          </span>
        </>
      ),
    };
    onOpen(e);
  };

  const CommonModal = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalData.current.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalData.current.body}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
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
            icon={<EditIcon />}
            onClick={editMenu}
            {...(hasAuth ? { command: "★" } : {})}
          >
            메뉴 수정
          </MenuItem>
          <MenuItem icon={<InfoIcon />} onClick={showInfo}>
            info
          </MenuItem>
        </MenuList>
      </Menu>
      <CommonModal />
    </div>
  );
}

export default Setting;
