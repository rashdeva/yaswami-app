import { Input } from "~/components/ui/input";
import { SelectCity } from "../../components/city-input/city-input";
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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { EventTypeSelect } from "~/components/event-type-select/event-type-select";
import { useUserStore } from "~/db/userStore";
import { registerTeacher } from "~/db/api";
import { toast } from "~/components/ui/use-toast";
import { cn } from "~/lib/utils";

export const preRegistrationSchema = z.object({
  name: z.string().min(1, "registerForm"),
  about: z.string().min(1, "registerForm").optional(),
  birthday: z.string().optional(),
  city: z.string().min(1, "registerForm"),
  specialty: z.string(),
  gender: z.enum(["male", "female"], {
    message: "registerForm",
  }),
  user_id: z.number().optional(),
});

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [userName, user] = useUserStore((state) => [
    state.getUserName(),
    state.user,
  ]);

  const form = useForm<z.infer<typeof preRegistrationSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(preRegistrationSchema),
    defaultValues: {
      name: userName,
    },
  });

  useEffect(() => {
    form.resetField("name", {
      defaultValue: userName,
    });
  }, [userName]);

  async function handleSubmit(values: any) {
    try {
      await registerTeacher(values);
      navigate("/register/success");
    } catch (error) {
      toast({
        title: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    form.register("user_id");
  }, [form]);

  // Update the hidden input value when user.id changes
  useEffect(() => {
    form.setValue("user_id", user.id);
  }, [user.id, form]);

  return (
    <div className="flex flex-col items-center pt-4 pb-10">
      <Form {...form}>
        <h1 className="text-lg font-bold mb-2">{t("registerForm.title")}</h1>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          <div className="space-y-2">
            <input type="hidden" {...form.register("user_id")} />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder={t("registerForm.name")} />
                  </FormControl>
                  <FormMessage formName="registerForm" />
                </FormItem>
              )}
            />
            <FormField
              name="about"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t("registerForm.about")}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("registerForm.aboutDescription")}
                  </FormDescription>
                  <FormMessage formName="registerForm" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="specialty"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <EventTypeSelect
                    label={t("registerForm.specialty")}
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  {t("registerForm.specialtyDescription")}
                </FormDescription>
                <FormMessage formName="registerForm" />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SelectCity {...field} label={t("registerForm.city")} />
                  </FormControl>
                  <FormDescription>
                    {t("registerForm.cityDescription")}
                  </FormDescription>
                  <FormMessage formName="registerForm" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="gender"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>{t("registerForm.gender")}</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-row"
                  >
                    <div className="flex-1 flex items-center space-x-2">
                      <Label
                        className={cn(
                          "bg-card px-3 py-2 rounded-md items-center flex gap-2 w-full text-base"
                        )}
                        htmlFor="genderMale"
                      >
                        <RadioGroupItem value="male" id="genderMale" />{" "}
                        {t("registerForm.genderMale")}
                      </Label>
                    </div>
                    <div className="flex-1 flex items-center space-x-2">
                      <Label
                        className={cn(
                          "bg-card px-3 py-2 rounded-md items-center flex gap-2 w-full text-base"
                        )}
                        htmlFor="genderFemale"
                      >
                        <RadioGroupItem value="female" id="genderFemale" />{" "}
                        {t("registerForm.genderFemale")}
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage formName="registerForm" />
              </FormItem>
            )}
          />
          <Button variant="default" className="w-full" type="submit">
            {t("registerForm.submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
};
