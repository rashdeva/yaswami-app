import { Input } from "~/components/ui/input";
import { SelectCity } from "./city-input";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "~/db/zod";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";

export const RegisterPage = () => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit() {}

  return (
    <Form {...form}>
      <h1 className="text-lg font-bold mb-2">Create Profile</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <div className="space-y-2">
          <Input placeholder="Name" />
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="About you" />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Instagram" />
              </FormControl>
              <FormDescription>Instagram profile if exist</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Date of birth" type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SelectCity />
        </div>

        <FormField
          name="language_code"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup defaultValue="option-one" className="flex flex-row">
                  <div className="flex-1 flex items-center space-x-2">
                    <Label
                      className="bg-background px-3 py-2 rounded-md items-center flex gap-2 w-full text-base"
                      htmlFor="option-one"
                    >
                      <RadioGroupItem value="option-one" id="option-one" /> Male
                    </Label>
                  </div>
                  <div className="flex-1 flex items-center space-x-2">
                    <Label
                      className="bg-background px-3 py-2 rounded-md items-center flex gap-2 w-full text-base"
                      htmlFor="option-two"
                    >
                      <RadioGroupItem value="option-two" id="option-two" />{" "}
                      Female
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
