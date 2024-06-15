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
import { preRegistrationSchema } from "~/db/zod";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { isTMA } from "@tma.js/sdk";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";
import { z } from "zod";
import { useMainButton } from "@tma.js/sdk-react";

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const mb = useMainButton();

  const form = useForm<z.infer<typeof preRegistrationSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(preRegistrationSchema),
  });

  async function handleSubmit(values: any) {
    const { error } = await supabase.from("pre_registration").insert([values]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      setSubmissionSuccess(true);
    }
  }

  useEffect(() => {
    mb.setBgColor("#")
      .setText("Зарегистрироваться")
      .show()
      .on("click", () => form.handleSubmit(handleSubmit)());

    return () => {
      mb.hide().off("click", () => form.handleSubmit(handleSubmit)());
    };
  }, [mb, form]);

  if (submissionSuccess) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-bold mb-2">Registration Successful!</h1>
        <p>Thank you for registering. We will get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pb-10">
      <Form {...form}>
        <h1 className="text-lg font-bold mb-2">{t("registerForm.title")}</h1>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
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
            name="instagram"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder={t("registerForm.instagram")} />
                </FormControl>
                <FormDescription>
                  {t("registerForm.instagramDescription")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormField
              name="birthday"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("registerForm.birthday")}
                      type="date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SelectCity {...field} />
                  </FormControl>
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
          {!isTMA() && (
            <Button variant="default" className="w-full" type="submit">
              {t("registerForm.submit")}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
