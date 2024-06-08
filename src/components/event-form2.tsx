import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Tables } from "~/database.types";
import { UseFormReturn } from "react-hook-form";
import {
  Cell,
  FileInput,
  IconContainer,
  Input,
  Section,
  Textarea,
  Image,
  Select,
} from "@telegram-apps/telegram-ui";
import { CalendarClock, CircleDollarSign, MapPin } from "lucide-react";

export type EventFormProps = {
  form: UseFormReturn<any>;
  onSubmit: (data: Tables<"events">) => void;
};

export function EventForm2({ form, onSubmit }: EventFormProps) {
  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold">Let's create event</h1>

        <div className="space-y-2">
          <Input placeholder="Title" {...form.register("title")} />
          <Textarea header="Description" placeholder="Description" {...form.register("description")} />
          <Select
            header="Event Category"
            {...form.register("type")}
          >
            <option className="disabled">Select Category</option>
            <option>Yoga</option>
            <option>Meditation</option>
            <option>Ecstatic Dance</option>
            <option>Breathwork</option>
            <option>Breathwork</option>
          </Select>
          <Section header="Extra data">
            <Cell
              before={
                <IconContainer>
                  <CalendarClock />
                </IconContainer>
              }
            >
              Date and Time
            </Cell>
            <Cell
              before={
                <IconContainer>
                  <MapPin />
                </IconContainer>
              }
            >
              Location
            </Cell>
            <Cell
              before={
                <IconContainer>
                  <CircleDollarSign />
                </IconContainer>
              }
            >
              Price
            </Cell>
          </Section>
          <Section>
            <div className="flex gap-2">
              <div className="px-4 py-4">
                <Image
                  size={96}
                  src="https://avatars.githubusercontent.com/u/84640980?v=4"
                />
              </div>
            </div>
            <FileInput multiple onChange={function noRefCheck() {}} />
          </Section>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Сохранить изменения
        </Button>
      </form>
    </Form>
  );
}
