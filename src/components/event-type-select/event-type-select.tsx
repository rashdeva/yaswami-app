import { SelectProps } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getEventTypes } from "~/db/api";

export type EventTypeSelectProps = SelectProps & {
  label?: string
}

export const EventTypeSelect = (props: EventTypeSelectProps) => {
  const { data: eventTypes, isFetching } = useQuery({
    queryKey: ["event_types"],
    queryFn: getEventTypes,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder={props.label} />
      </SelectTrigger>
      <SelectContent>
        {!isFetching && (
          <SelectGroup>
            {eventTypes?.map((eventType) => (
              <SelectItem key={eventType.id} value={eventType.id.toString()}>
                {eventType.name}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
        {isFetching && (
          <div className="flex gap-2 px-2 py-4 items-center justify-center">
            <Loader2 className="animate-spin" />
            Loading 
          </div>
        )}
      </SelectContent>
    </Select>
  );
};
