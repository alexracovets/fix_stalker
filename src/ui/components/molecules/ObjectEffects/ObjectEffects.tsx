"use client";

import { AtomWrapper, AtomText } from "@atoms";


interface ObjectEffectsProps {
    list: {
        title: string;
        description: string;
    }[];
}

export const ObjectEffects = ({ list }: ObjectEffectsProps) => {
    return (
        <AtomWrapper variant="object_effects_list">
            {list.map((item) => (
                <AtomWrapper variant="object_effects_item" key={item.title}>
                    <AtomText variant="object_effects_item_title">{item.title}</AtomText>
                    <AtomText variant="object_effects_item_description">{item.description}</AtomText>
                </AtomWrapper>
            ))}
        </AtomWrapper>
    );
};