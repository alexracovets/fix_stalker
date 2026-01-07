"use client";

import { Fragment } from "react";

import { ElementsPage } from "@payload-types";
import { AtomText, AtomWrapper } from "@atoms";

type LexicalRichTextType = ElementsPage["description"];
type LexicalNode = NonNullable<LexicalRichTextType>["root"]["children"][number];

interface LexicalTextPart {
    text?: string;
    style?: string;
    [k: string]: unknown;
}

interface LexicalParagraphNode extends LexicalNode {
    type: "paragraph";
    children?: LexicalTextPart[];
}

const FilterTextPart = (part: LexicalTextPart) => {
    switch (part.style) {
        case "":
            return part.text;
        default:
            return null;
    }
}

const FilterText = (text: LexicalNode) => {
    switch (text.type) {
        case "paragraph": {
            const paragraphNode = text as LexicalParagraphNode;
            if (!paragraphNode.children) return null;
            return <AtomText variant="default">
                {paragraphNode.children.map((part: LexicalTextPart, idx: number) => {
                    return <Fragment key={idx}>{FilterTextPart(part)}</Fragment>;
                })}
            </AtomText>;
        }
        default:
            return null;
    }
}

export const RichText = ({ text }: { text: LexicalRichTextType }) => {
    if (!text || !text.root) return null;
    const textArea = text.root.children;
    return (
        <AtomWrapper variant="rich_text_wrapper">
            {
                textArea.map((item: LexicalNode, index: number) => {
                    return <Fragment key={index}>{FilterText(item)}</Fragment>;
                })
            }
        </AtomWrapper>
    );
};