import React from "react";
import { useNavigate } from "react-router-dom";
import TypeWriter from "typewriter-effect";
import { toast } from "react-toastify";
import chatApis from "lib/api/modules/chat.api";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  FormControl,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import Header from "components/Header";

enum STATE_NAMES {
  onRequest = "onRequest",
  question = "question",
  messages = "messages",
  answer = "answer",
}

const reducer = (state: any, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const Home = () => {
  const username = localStorage.getItem("username");

  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const chatWrapperRef = React.useRef<HTMLDivElement>(null);

  const [{ onRequest, question, messages }, dispatch] = React.useReducer(
    reducer,
    {
      onRequest: false,
      question: "",
      messages: [],
    }
  );

  const getAnswer = async () => {
    if (onRequest) return;

    const newMessages = [
      ...messages,
      {
        type: STATE_NAMES.question,
        content: question,
      },
    ];

    dispatch({
      name: STATE_NAMES.messages,
      value: newMessages,
    });

    dispatch({
      name: STATE_NAMES.question,
      value: "",
    });
    dispatch({
      name: STATE_NAMES.onRequest,
      value: true,
    });

    const { response, error } = await chatApis.completion({ prompt: question });

    if (response) {
      dispatch({
        name: STATE_NAMES.messages,
        value: [
          ...newMessages,
          { type: STATE_NAMES.answer, content: response.text },
        ],
      });
    }
    if (error) {
      toast.error(error.message);
      dispatch({
        name: STATE_NAMES.onRequest,
        value: false,
      });
    }
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.keyCode! === 13) getAnswer();
  };

  const onSignOut = () => {
    localStorage.removeItem("tkgpt");
    navigate("/signin");
  };

  const onCallFunction = () => {
    const typewriterEl = document?.querySelector<HTMLElement>(
      ".Typewriter__cursor"
    );
    typewriterEl!.style.display = "none";

    dispatch({
      name: STATE_NAMES.onRequest,
      value: false,
    });

    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  };

  React.useEffect(() => {
    const chatFn = (e: React.SyntheticEvent) => {
      e.currentTarget.scroll({
        top: e.currentTarget.scrollHeight,
        behavior: "smooth",
      });
    };

    setTimeout(() => {
      if (!chatWrapperRef.current) return;
      chatWrapperRef.current!.addEventListener("DOMNodeInserted", () => chatFn);
    }, 200);
  }, []);

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: "100%" }}
    >
      <Header bg borderBottom>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            paddingX: 2,
            maxWidth: "md",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {username}
          </Typography>
          <IconButton
            onClick={onSignOut}
            sx={{
              position: "absolute",
              top: "50%",
              right: "16px",
              transform: "translateY(-50%)",
            }}
          >
            <LogoutOutlinedIcon />
          </IconButton>
        </Box>
      </Header>

      <Box
        ref={chatWrapperRef}
        sx={{
          height: "100%",
          position: "fixed",
          zIndex: 1,
          maxWidth: "md",
          width: "100%",
          overflowY: "auto",
          paddingTop: "60px",
          paddingBottom: "90px",
          "&::-webkit-scrollbar": {
            width: "0px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            maxWidth: "md",
            width: "100%",
          }}
        >
          {(messages as { type: string; content: string }[]).map(
            (item, index) => (
              <Box key={index} padding={1}>
                <Box
                  sx={{
                    padding: 2,
                    bgcolor: `${item.type === STATE_NAMES.answer && "#2f2f2f"}`,
                    borderRadius: 3,
                  }}
                >
                  {index === messages.length - 1 ? (
                    item.type === STATE_NAMES.answer ? (
                      <TypeWriter
                        onInit={(writer) => {
                          writer
                            .typeString(item.content)
                            .callFunction(onCallFunction)
                            .changeDelay(50)
                            .start();
                        }}
                      />
                    ) : (
                      item.content
                    )
                  ) : (
                    item.content
                  )}
                </Box>
              </Box>
            )
          )}
        </Box>
      </Box>

      <Stack
        width="100%"
        alignItems="center"
        justifyContent="center"
        borderTop="1px solid #2c2c2c"
        bgcolor="#000"
        zIndex={3}
      >
        <Box padding={2} width="100%" maxWidth="md">
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              inputRef={inputRef}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              endAdornment={
                onRequest ? (
                  <CircularProgress size="1.5rem" />
                ) : (
                  <SendOutlinedIcon />
                )
              }
              autoFocus
              disabled={onRequest}
              onKeyUp={onEnterPress}
              value={question}
              onChange={(e) =>
                dispatch({
                  name: STATE_NAMES.question,
                  value: e.target.value,
                })
              }
              placeholder="질문을 입력해주세요.."
            />
          </FormControl>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Home;
