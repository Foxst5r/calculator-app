import i18n from "i18next";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@nextui-org/react";

type LangType = {
  key: string;
  label: string;
};

const items: LangType[] = [
  { key: "en", label: "English" },
  { key: "sp", label: "Español" },
];

export function LanguageSelector() {
  const [selected, setSelected] = React.useState<LangType>(items[0]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize p-10" size="lg">
          {selected.label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected.key}
        onSelectionChange={(key: Selection) => {
          console.log(`key: ${JSON.stringify(key)}`);
          const param = key as unknown as { currentKey: string };
          const res = items.find((item) => item.key === param.currentKey);
          const found = res ? res : items[0];

          i18n.changeLanguage(found.key);
          setSelected(found);
        }}
      >
        <DropdownItem key="en">English</DropdownItem>
        <DropdownItem key="sp">Espanol</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
