import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: ({ req: { user } }) => {
      // Дозволяємо створення користувачів без авторизації, якщо це перший користувач
      if (!user) {
        return true;
      }
      return user?.isSuperAdmin === true;
    },
    update: ({ req: { user } }) => {
      return user?.isSuperAdmin === true;
    },
    delete: ({ req: { user } }) => {
      return user?.isSuperAdmin === true;
    },
  },
  labels: {
    singular: "Користувач",
    plural: "Користувачі",
  },
  admin: {
    useAsTitle: "email",
    group: "Система",
  },
  auth: true,
  hooks: {
    beforeChange: [
      async ({ req, data, operation }) => {
        // Якщо це створення першого користувача, автоматично робимо його супер адміном
        if (operation === "create") {
          const userCount = await req.payload.find({
            collection: "users",
            limit: 1,
          });

          if (userCount.totalDocs === 0) {
            data.isSuperAdmin = true;
          }
        }

        // Якщо в системі немає супер адміністраторів, робимо першого користувача супер адміном
        if (operation === "create" && !data.isSuperAdmin) {
          const superAdminCount = await req.payload.find({
            collection: "users",
            where: { isSuperAdmin: { equals: true } },
          });

          if (superAdminCount.totalDocs === 0) {
            data.isSuperAdmin = true;
          }
        }
      },
    ],
    beforeDelete: [
      async ({ req, id }) => {
        const userToDelete = await req.payload.findByID({
          collection: "users",
          id,
        });

        if (userToDelete.isSuperAdmin) {
          const superAdminCount = await req.payload.find({
            collection: "users",
            where: {
              isSuperAdmin: {
                equals: true,
              },
            },
          });

          if (superAdminCount.totalDocs <= 1) {
            throw new Error(
              "Неможливо видалити користувача: це єдиний супер адміністратор в системі"
            );
          }
        }
      },
    ],
  },
  fields: [
    {
      name: "isSuperAdmin",
      label: "Супер адміністратор",
      type: "checkbox",
      defaultValue: true,
      validate: async (value, { req, id }) => {
        // Якщо знімаємо галочку супер адміна
        if (value === false && id) {
          const currentUser = await req.payload.findByID({
            collection: "users",
            id,
          });

          // Якщо поточний користувач є супер адміном
          if (currentUser.isSuperAdmin) {
            const superAdminCount = await req.payload.find({
              collection: "users",
              where: { isSuperAdmin: { equals: true } },
            });

            if (superAdminCount.totalDocs <= 1) {
              return "Неможливо зняти права супер адміністратора: це єдиний супер адміністратор в системі";
            }
          }
        }

        return true;
      },
      access: {
        update: async ({ req, id, data }) => {
          if (!req.user?.isSuperAdmin) return false;
          if (!id) return true;

          const currentUser = await req.payload.findByID({
            collection: "users",
            id,
          });

          // Запобігаємо зняттю галочки з останнього супер адміна
          if (currentUser.isSuperAdmin && data?.isSuperAdmin === false) {
            const superAdminCount = await req.payload.find({
              collection: "users",
              where: { isSuperAdmin: { equals: true } },
            });
            if (superAdminCount.totalDocs <= 1) {
              return false;
            }
          }

          return true;
        },
      },
    },
  ],
};
