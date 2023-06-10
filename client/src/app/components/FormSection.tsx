"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";

const FormSection = ({ sendPrompt } : {sendPrompt: any} ) => {
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
          <textarea
            {...register("prompt", { required: true })}
            rows={5}
            className="form-control"
            placeholder="Enter your prompt here..."
            // value={newPrompt}
          ></textarea>
          <button className="btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default FormSection;
