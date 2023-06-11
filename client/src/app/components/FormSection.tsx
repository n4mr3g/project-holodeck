import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";

const FormSection = ({ sendPrompt }: { sendPrompt: any }) => {
  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const [newPrompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // sendQuestion(data.prompt);
    sendPrompt(data);
    reset();
  };

  return (
    <>
      <div className="form-section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("prompt", { required: true })}
            className="form-control"
            placeholder="Enter your prompt here..."
            // value={newPrompt}
          ></input>
          <button className="btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default FormSection;
