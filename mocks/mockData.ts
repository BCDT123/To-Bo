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
};

export default mockData;
