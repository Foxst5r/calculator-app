import { Card, CardBody } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

type Prop = {
  answer: string;
  postfix: string;
};

export const CalculateResult = ({ answer, postfix }: Prop) => {
  const { t } = useTranslation();
  return (
    <div className="flex place-self-center flex-col gap-4">
      <Card>
        <CardBody>
          {t("calculator.answer")} {answer}
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          {t("calculator.postfix")} {postfix}
        </CardBody>
      </Card>
    </div>
  );
};
