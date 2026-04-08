//react hook form
import { useForm } from "react-hook-form";
import FormField from "../components/FormField";

//react query
import { useSetUsername } from "../hooks/useAuthQuery";

//Zustand
import { useTempUserStore } from "../store/useAuthStore";

export default function UsernameSelection() {
  const { mutate: setUsername, isPending: isSetUsernamePending } =
    useSetUsername();
  const { tempUser } = useTempUserStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { username: tempUser } });

  function onSubmit(data) {
    console.log(data);
    setUsername();
  }
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="max-w-[450px]   mx-auto rounded-lg border border-card-border p-8 bg-zinc-950 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <FormField
                label="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                error={errors.username}
                register={register}
                disabled={isSetUsernamePending}
                validation={{
                  required: "Username is required",
                  minLength: {
                    value: 5,
                    message: "Must be at least 5 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Must be at most 15 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: "Only letters, numbers, and underscores allowed",
                  },
                  setValueAs: (value) => value.toLowerCase().trim(),
                }}
              />
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
