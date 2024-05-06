import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tables } from "~/database.types";
import { UseFormReturn } from "react-hook-form";

export type EventFormProps = {
  form: UseFormReturn<any>;
  onSubmit: (data: Tables<"events">) => void;
};

export function EventForm({ form, onSubmit }: EventFormProps) {
  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Event Title"
              {...form.register("title")}
              name="title"
              required
            />
          </div>
        </div>
        <div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Event Description"
              {...form.register("description")}
              name="description"
              required
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                required
                type="date"
                {...form.register("start_date")}
                name="start_date"
                className="w-full"
              />
            </div>
          </div>
          <div>
            <div>
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                required
                type="time"
                {...form.register("start_time")}
                name="start_time"
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                required
                type="date"
                {...form.register("end_date")}
                name="end_date"
              />
            </div>
          </div>
          <div>
            <div>
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                required
                type="time"
                {...form.register("end_time")}
                name="end_time"
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div>
              <Label htmlFor="event-type">Event Type</Label>
              <Select
                required
                {...form.register("event_type")}
                name="event_type"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"1"}>Conference</SelectItem>
                  <SelectItem value={"2"}>Workshop</SelectItem>
                  <SelectItem value={"3"}>Meetup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <div>
              <Label htmlFor="max-participants">Max Participants</Label>
              <Input
                id="max-participants"
                min="1"
                required
                type="number"
                {...form.register("max_participants")}
                name="max_participants"
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                min="0"
                required
                step="0.01"
                type="number"
                {...form.register("price")}
                name="price"
              />
            </div>
          </div>
          <div>
            <div>
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                placeholder="https://example.com/thumbnail.jpg"
                required
                type="url"
                {...form.register("thumbnail_url")}
                name="thumbnail_url"
              />
            </div>
          </div>
          <div>
            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                placeholder="Comment"
                {...form.register("comment")}
                name="comment"
                required
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full h-16" size="lg">
          Submit
        </Button>
      </form>
    </Form>
  );
}
