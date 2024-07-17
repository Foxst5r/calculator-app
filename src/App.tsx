import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { calculate } from "./calculator/calc";
import { useState } from "react";
import { TitleBar } from "./components/TitleBar";
import { CalculateResult } from "./components/CaclulateResult";
import { ExpressionHistory } from "./components/ExpressionHistory";
import { useTranslation } from "react-i18next";

export function App() {
  const { t } = useTranslation();
  const [textInput, setTextInput] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [postfix, setPostfix] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-10 h-screen items-center">
      <TitleBar />
      <div className="flex w-1/2 items-center justify-center">
        <Input
          type="input"
          label={t("calculator.input")}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <Button
          onPress={() => {
            const res = calculate(textInput);
            setAnswer(res.answer.toString());
            setPostfix(res.postfix.toString());
            if (!history.includes(textInput)) {
              setHistory([...history, textInput]);
            }
          }}
          className="border-2 flex w-32 h-16"
          color="primary"
        >
          {t("calculator.enter")}
        </Button>
      </div>
      <CalculateResult answer={answer} postfix={postfix} />
      <ExpressionHistory
        history={history}
        setHistory={setHistory}
        setTextInput={setTextInput}
      />
    </div>
  );
}

export default App;
