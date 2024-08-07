import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, Image, Stack, Text } from "@chakra-ui/react";

export default function Vote({
  text,
  percentage,
  votes,
  answerNum,
  isSubmitted,
}) {
  const info = text.split("--");
  const [title, url, detail, image] = info;

  return (
    <div className="votes">
      <input
        className="appearance-none"
        type="radio"
        name="vote"
        value={answerNum}
        id={answerNum}
      />
      <label
        htmlFor={answerNum}
        className="bg-white block rounded border-4 border-transparent cursor-pointer shadow-lg p-6"
      >
        <div className="text-xl font-bold flex items-center justify-between">
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            size="sm"
          >
            <Image
              objectFit="cover"
              boxSize="150px"
              src={image}
              alt="Caffe Latte"
            />

            <Stack style={{ width: "480px", height: "150px" }}>
              <CardBody>
                <Button
                  rightIcon={<ExternalLinkIcon />}
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => {
                    window.open(url);
                  }}
                >
                  {title}
                </Button>
                <Text style={{ marginTop: "20px" }} fontSize="md">
                  {detail}
                </Text>
              </CardBody>
            </Stack>
          </Card>

          {isSubmitted && <span>{percentage || 0}%</span>}
        </div>
        {isSubmitted && (
          <>
            <progress
              className="w-full h-2 mt-4 rounded-lg [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg"
              value={percentage || 0}
              max="100"
            >
              {percentage}%
            </progress>
            <small className="text-slate-500">{votes} 표</small>
          </>
        )}
      </label>
    </div>
  );
}
