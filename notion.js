const { Client } = require("@notionhq/client");
require("dotenv").config();

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

async function getDatabase() {
  const response = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  console.log(response);
}

getDatabase();

function createSuggestion({ title, votes, tags }) {
  notion.pages.create({
    parent: { database_id: process.env.NOTION_DATABASE_ID },

    properties: {
      [process.env.NOTION_TITLE_ID]: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },

      [process.env.NOTION_VOTES_ID]: {
        number: votes,
      },

      [process.env.NOTION_TAGS_ID]: {
        select: {
          name: tags,
        },
      },
    },
  });
}

createSuggestion({ title: "molly need food", votes: 90, tags: "needed" });
