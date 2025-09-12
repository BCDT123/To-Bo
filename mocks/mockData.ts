const mockData: Record<string, any[]> = {
  users: [
    {
      id: "1",
      name: "Brenda",
      email: "brenda@example.com",
      admin: true,
      photoUrl: "",
      language: "es",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Carlos",
      email: "carlos@example.com",
      admin: false,
      photoUrl: "",
      language: "en",
      createdAt: new Date(),
    },
  ],
  "/api/posts": [{ id: 101, title: "Post de prueba" }],
  Babies: [
    {
      id: "1",
      gender: "female",
      color: "pink",
      photoUrl: "/images/baby1.png",
      birthday: new Date("2022-01-01"),
      name: "Sofia",
      createdAt: new Date("2022-01-01"),
      updatedAt: new Date("2022-06-01"),
    },
    {
      id: "2",
      gender: "male",
      color: "blue",
      photoUrl: "/images/baby2.png",
      birthday: new Date("2021-05-15"),
      name: "Mateo",
      createdAt: new Date("2021-05-15"),
      updatedAt: new Date("2022-05-15"),
    },
  ],
};

export default mockData;
