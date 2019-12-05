const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.example.com",
    description: "GQL Apollo Crud"
  }
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => "This is my API",
    feed: () => links
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },

    updateLink: (parent, args) => {
      let link = links.filter(link => link.id === args.id);
      const linkIndex = link[0].id.charAt(5);
      link = { id: args.id, description: args.description, url: args.url };
      links[linkIndex] = link;
      return links[linkIndex];
    },

    deleteLink: (parent, args) => {
      const linkIndex = args.id.charAt(5);
      links.splice(linkIndex, 1);
      return links[linkIndex];
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
