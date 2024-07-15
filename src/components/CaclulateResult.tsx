import { Card, CardBody } from "@nextui-org/react";

type Prop = {
  answer: string;
  postfix: string;
};

export const CalculateResult = ({ answer, postfix }: Prop) => {
  return (
    <div className="flex place-self-center flex-col gap-4">
      <Card>
        <CardBody>{`Answer: ${answer}`}</CardBody>
      </Card>
      <Card>
        <CardBody>{`Postfix: ${postfix}`}</CardBody>
      </Card>
    </div>
  );
};
