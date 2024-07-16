import { Button, Card, CardBody } from "@nextui-org/react";

type HistoryProps = {
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setTextInput: React.Dispatch<React.SetStateAction<string>>;
};

export const ExpressionHistory = ({
  history,
  setHistory,
  setTextInput,
}: HistoryProps) => {
  return (
    <div className="flex place-self-center flex-col gap-4">
      <Card>
        <CardBody>
          {history.map((entry, index) => {
            return (
              <div
                onClick={() => {
                  setTextInput(history[index]);
                }}
                key={index}
              >
                {entry}
              </div>
            );
          })}
        </CardBody>
      </Card>
      <Button
        onPress={() => {
          setHistory([]);
        }}
      >
        Clear History
      </Button>
    </div>
  );
};

//How to click back on the previous history of the button
//Clear history
//Duplicates shouldnt be added
