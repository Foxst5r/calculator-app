import "../styles.css";

interface calculatorProps {
  handleOnPress: (value: string) => void;
}

function Buttons({ handleOnPress }: calculatorProps) {
  function onPress(event) {
    const value: string = event.target.innerText;
    handleOnPress(value);
  }

  return <div className="buttons-container"></div>;
}

export default Buttons;
