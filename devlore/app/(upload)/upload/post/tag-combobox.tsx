import {
  Combobox,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxValue,
} from "@/components/ui/combobox";

const TagCombobox = ({
  value,
  onChange,
  options,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  options: string[];
}) => {
  return (
    <div>
      <Combobox items={options} multiple value={value} onValueChange={onChange}>
        <ComboboxChips>
          <ComboboxValue>
            {value.map((tag: string) => (
              <ComboboxChip key={tag}> {tag} </ComboboxChip>
            ))}
          </ComboboxValue>
          <ComboboxChipsInput placeholder="Add a tag" />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>No tag found</ComboboxEmpty>
          <ComboboxList>
            {options.map((tag) => (
              <ComboboxItem key={tag} value={tag}>
                {" "}
                {tag}{" "}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default TagCombobox;
