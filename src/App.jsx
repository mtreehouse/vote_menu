import { useState, useEffect } from "react";
import { client, databases, DB_ID, COLLECTION_ID } from "./lib/appwrite";
import Question from "./components/Question";
import { ChakraProvider, Image } from "@chakra-ui/react";
import Setting from "./components/Setting";

function App() {
  const [questions, setQuestions] = useState([]);
  const [hasAuth, setHasAuth] = useState(false);

  useEffect(() => {
    getQuestionsFromDB();

    const unsubscribe = client.subscribe(
      `databases.${DB_ID}.collections.${COLLECTION_ID}.documents`,
      (res) => {
        console.log(res);

        if (
          res.events.includes("databases.*.collections.*.documents.*.update")
        ) {
          setQuestions((prevQuestions) => {
            return prevQuestions.map((question) => {
              if (question.$id !== res.payload.$id) {
                return question;
              }

              return res.payload;
            });
          });

          console.log("Updated Question");
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  async function getQuestionsFromDB() {
    const questions = await databases.listDocuments(DB_ID, COLLECTION_ID);
    setQuestions(questions.documents);
  }

  return (
    <ChakraProvider>
      <Image
        className="bottom-logo"
        src="https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fadb3f94b-da1c-4855-a7c6-0ca46bfc0db4%2FLG.png&blockId=2b1db4fd-3804-4d8a-8b6e-e2dfa8f7d4e4&width=250"
        onDoubleClick={() => {
          setHasAuth((prev) => !prev);
        }}
      />
      <main className="container max-w-3xl mx-auto px-4 py-10 d">
        {questions.map((question) => (
          <Question key={question.$id} data={question} />
        ))}
      </main>
      <Setting data={questions} hasAuth={hasAuth} />
    </ChakraProvider>
  );
}

export default App;
