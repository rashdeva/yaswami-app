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
import { preRegistrationSchema } from "~/db/zod";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { z } from "zod";
import { useMainButton } from "@tma.js/sdk-react";
import { config } from "~/config";
import { useNavigate } from "react-router-dom";
import { EventTypeSelect } from "~/components/event-type-select/event-type-select";
import { useUserStore } from "~/db/userStore";
import { registerTeacher } from "~/db/api";
import { toast } from "~/components/ui/use-toast";

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const mb = useMainButton();
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

  useEffect(() => {
    mb.setBgColor("#")
      .enable()
      .setText(t("registerForm.submit"))
      .show()
      .on("click", () => form.handleSubmit(handleSubmit)());

    return () => {
      mb.hide()
        .disable()
        .off("click", () => form.handleSubmit(handleSubmit)());
    };
  }, [mb, form, t]);

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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="event_type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <EventTypeSelect
                    label={t("registerForm.eventType")}
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  {t("registerForm.eventTypeDescription")}
                </FormDescription>
                <FormMessage />
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
                  <FormMessage />
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
                        className="bg-background px-3 py-2 rounded-md items-center flex gap-2 w-full text-base"
                        htmlFor="genderMale"
                      >
                        <RadioGroupItem value="Male" id="genderMale" />{" "}
                        {t("registerForm.genderMale")}
                      </Label>
                    </div>
                    <div className="flex-1 flex items-center space-x-2">
                      <Label
                        className="bg-background px-3 py-2 rounded-md items-center flex gap-2 w-full text-base"
                        htmlFor="genderFemale"
                      >
                        <RadioGroupItem value="Female" id="genderFemale" />{" "}
                        {t("registerForm.genderFemale")}
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {config.isLocalDev && (
            <Button variant="default" className="w-full" type="submit">
              {t("registerForm.submit")}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
