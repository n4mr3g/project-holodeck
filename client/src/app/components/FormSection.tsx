import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

const FormSection = ({ sendPrompt }: { sendPrompt: any }) => {
  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    sendPrompt(data);
    reset();
  };

  return (
    <>
      <div className="form-section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            autoComplete="off"
            autoFocus={true}
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
