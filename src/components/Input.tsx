import "../styles.css";

interface calculatorProps {
  input: string;
  error: boolean;
}

function Input({ input, error }: calculatorProps) {
  return (
    <div className="input-container">
      {error ? <h1>Error</h1> : <h1>{input ? input : "0"}</h1>}
    </div>
  );
}

export default Input;
