import type { Field } from "payload";

export const ObjectsFields = (): Field[] => {
    return [
        {
            type: "group",
            name: "objects_group",
            label: "Поля для предметів",
            admin: {
                condition: (data) => data.type === "objects",
            },
            fields: [
                {
                    label: "Ефекти дії",
                    name: "effects",
                    type: "array",
                    admin: {
                        condition: (data) => data.type === "objects",
                    },
                    fields: [
                        {
                            name: "title",
                            label: "Назва ефекту",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "description",
                            label: "Опис ефекту",
                            type: "text",
                            required: true,
                        }
                    ]
                },
                {
                    label: "Деталі Елемента",
                    name: "details",
                    type: "array",
                    admin: {
                        condition: (data) => data.type === "objects",
                    },
                    fields: [
                        {
                            type: "row",
                            fields: [
                                {
                                    name: "indicator",
                                    label: "Показник",
                                    type: "relationship",
                                    relationTo: "detaile_table",
                                    required: true,
                                    hasMany: false,
                                    admin: {
                                        width: "50%",
                                    },
                                },
                                {
                                    name: "value",
                                    label: "Значення",
                                    type: "text",
                                    required: true,
                                    admin: {
                                        width: "50%",
                                    },
                                },
                                {
                                    name: "effect",
                                    type: "radio",
                                    label: "Ефект",
                                    required: true,
                                    defaultValue: "normal",
                                    options: [
                                        {
                                            label: "Позитивний ефект",
                                            value: "positive",
                                        },
                                        {
                                            label: "Негативний ефект",
                                            value: "negative",
                                        },
                                        {
                                            label: "Нейтрально",
                                            value: "normal",
                                        },
                                    ],
                                },
                                {
                                    name: "efect_power",
                                    type: "radio",
                                    label: "Сила ефекту",
                                    required: true,
                                    defaultValue: "normal",
                                    dbName: "ef_pwr",
                                    options: [
                                        {
                                            label: "Низька",
                                            value: "low",
                                        },
                                        {
                                            label: "Середня",
                                            value: "medium",
                                        },
                                        {
                                            label: "Висока",
                                            value: "high",
                                        },
                                        {
                                            label: "Нейтрально",
                                            value: "normal",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
};
