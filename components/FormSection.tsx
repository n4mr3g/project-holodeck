//NOTE: Moving to "Chat.tsx" to avoid passing props down to "FormSection.tsx".
//NOTE: Moving to "Chat.tsx" to avoid passing props down to "FormSection.tsx".
//NOTE: Moving to "Chat.tsx" to avoid passing props down to "FormSection.tsx".
//NOTE: Moving to "Chat.tsx" to avoid passing props down to "FormSection.tsx".
//!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!

// "use client";
// import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
// import { useRef } from "react";

// const FormSection = ({ sendPrompt }: { sendPrompt: any }) => {
//   const { register, handleSubmit, reset } = useForm<FieldValues>();
//   const inputRef = useRef<HTMLInputElement>(null);

//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     sendPrompt(data);
//     inputRef.current?.focus();
//     reset();
//   };

//   return (
//     <>
//       <div className="form-section">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <input
//             ref={inputRef}
//             type="text"
//             autoComplete="off"
//             autoFocus={true}
//             {...register("prompt", { required: true })}
//             className="form-control"
//             placeholder="Enter your prompt here..."
//             // value={newPrompt}
//           ></input>
//           <button className="btn" type="submit">
//             Send
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default FormSection;
