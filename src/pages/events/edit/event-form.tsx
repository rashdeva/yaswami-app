import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { createEventSchema } from "../../../db/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { createEvent } from "~/db/api";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "~/components/ui/use-toast";
import { EventTypeSelect } from "~/components/event-type-select/event-type-select";

export type EventFormProps = {
  form: UseFormReturn<z.infer<typeof createEventSchema>>;
  onSubmit: (data: z.infer<typeof createEventSchema>) => void;
};

export function EventForm({ eventId }: { eventId?: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof createEventSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(createEventSchema),
    // defaultValues: {
    //   name: userName,
    // },
  });

  async function handleSubmit(values: any) {
    console.log(eventId);
    try {
      await createEvent(values);
      toast({
        title: "Event is successfully created",
      });
      navigate("/events");
    } catch (error) {
      toast({
        title: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">{t("eventForm.title")}</FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder={t("eventForm.titlePlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">
                {t("eventForm.description")}
              </FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder={t("eventForm.descriptionPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="start-date">
                  {t("eventForm.startDate")}
                </FormLabel>
                <FormControl>
                  <Input
                    id="start-date"
                    type="date"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="start-time">
                  {t("eventForm.startTime")}
                </FormLabel>
                <FormControl>
                  <Input id="start-time" type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="end-date">
                  {t("eventForm.endDate")}
                </FormLabel>
                <FormControl>
                  <Input id="end-date" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="end-time">
                  {t("eventForm.endTime")}
                </FormLabel>
                <FormControl>
                  <Input id="end-time" type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="event_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="event-type">
                  {t("eventForm.eventType")}
                </FormLabel>
                <FormControl>
                  <EventTypeSelect
                    label={t("registerForm.eventType")}
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="max_participants"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="max-participants">
                  {t("eventForm.maxParticipants")}
                </FormLabel>
                <FormControl>
                  <Input id="max-participants" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="price">{t("eventForm.price")}</FormLabel>
                <FormControl>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="thumbnail">
                  {t("eventForm.thumbnailUrl")}
                </FormLabel>
                <FormControl>
                  <Input
                    id="thumbnail"
                    type="url"
                    placeholder={t("eventForm.thumbnailUrlPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="comment">
                  {t("eventForm.comment")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="comment"
                    placeholder={t("eventForm.commentPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" size="lg">
          {t("eventForm.submit")}
        </Button>
      </form>
    </Form>
  );
}
