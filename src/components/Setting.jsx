import {
  ChatIcon,
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
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  NumberInput,
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
        const votes = Object.keys(data[0]).filter((k) => k.includes("votes"));
        const voteObj = {};
        votes.forEach((vote) => {
          voteObj[vote] = 0;
        });
        databases.updateDocument(DB_ID, COLLECTION_ID, data[0].$id, voteObj);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const menuObj = {};
    formData.forEach((value, key) => {
      menuObj[key] = value;
    });

    databases.updateDocument(DB_ID, COLLECTION_ID, data[0].$id, menuObj);
    onClose();
  };

  const editTitle = (e) => {
    if (!hasAuth) {
      alert("권한이 없습니다.");
    } else {
      modalData.current = {
        title: "타이틀 수정",
        body: <Input name={"text"} defaultValue={data[0]["text"]} />,
        hasSave: true,
      };
      onOpen(e);
    }
  };

  const editMenu = (e) => {
    if (!hasAuth) {
      alert("권한이 없습니다.");
    } else {
      const answers = Object.keys(data[0]).filter((k) => k.includes("answer"));
      modalData.current = {
        title: "메뉴 수정",
        body: (
          <>
            {answers.map((answerName, idx) => (
              <Stack spacing={4} key={idx}>
                <InputGroup size="sm">
                  <InputLeftAddon width={90}>{answerName}</InputLeftAddon>
                  <Input
                    name={answerName}
                    defaultValue={data[0][answerName] || ""}
                    title={data[0][answerName] || ""}
                  />
                </InputGroup>
              </Stack>
            ))}
          </>
        ),
        hasSave: true,
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
          투표 결과는 실시간으로 조회됩니다.
          <br />
          <span style={{ color: "red", fontSize: "12px" }}>
            *취소는 불가합니다.
            <br />
            *같은 메뉴 내 다른 식당 제안 가능
          </span>
        </>
      ),
    };
    onOpen(e);
  };

  const CommonModal = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>{modalData.current.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{modalData.current.body}</ModalBody>
            <ModalFooter>
              {modalData.current.hasSave ? (
                <Button type="submit" colorScheme="red" mr={3}>
                  저장
                </Button>
              ) : (
                false
              )}
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                닫기
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <div className="setting-menu">
      <Menu>
        <MenuButton
          as={IconButton}
          borderRadius={"inherit"}
          width={49}
          height={50}
          backgroundColor={"transparent"}
          _hover={{ backgroundColor: "transparent" }}
          _expanded={{ backgroundColor: "transparent" }}
          _focus={{ backgroundColor: "transparent" }}
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
            icon={<ChatIcon />}
            onClick={editTitle}
            {...(hasAuth ? { command: "★" } : {})}
          >
            타이틀 수정
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
