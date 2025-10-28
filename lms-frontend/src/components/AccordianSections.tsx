import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Accordion } from "./ui/accordion";
import { FileText } from "lucide-react";

export default function AccordianSections({
  sections,
}: AccordionSectionsProps) {
  return (
    <Accordion type="multiple" className="w-full">
      {sections &&
        sections.map((section) => (
          <AccordionItem
            key={section.sectionId}
            value={section.sectionTitle}
            className="overflow-hidden border-x border-b border-gray-600 first:rounded-t-lg first:border-t last:rounded-b-lg"
          >
            <AccordionTrigger className="w-full bg-[#1B1C22] px-4 py-3 hover:bg-gray-700/50">
              <h5 className="font-medium text-gray-400">
                {section.sectionTitle}
              </h5>
            </AccordionTrigger>
            <AccordionContent className="bg-[#25262F] px-4 py-4">
              <ul>
                {section.chapters.map((chapter) => (
                  <li
                    key={chapter.chapterId}
                    className="flex items-center py-1 text-gray-400/90"
                  >
                    <FileText className="mr-2 h-4" />
                    <span className="text-sm">{chapter.title}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
}
