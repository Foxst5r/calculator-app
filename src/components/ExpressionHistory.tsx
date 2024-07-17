import { Button, Card, CardBody } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <div className="flex place-self-center flex-col gap-4">
      <Button
        onPress={() => {
          setHistory([]);
        }}
      >
        {t("calculator.clearHistory")}
      </Button>
      <Card>
        <CardBody>
          {history.map((entry, index) => {
            return (
              <div
                className="text-center"
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
    </div>
  );
};

//How to click back on the previous history of the button
//Clear history
//Duplicates shouldnt be added

//
