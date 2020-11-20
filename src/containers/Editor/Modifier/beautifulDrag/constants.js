export const data = {
  items: {
    "item-1": {
      id: "item-1",
      title: "Item 1"
    },
    "item-2": {
      id: "item-2",
      title: "Item 2"
    },
    "item-3": {
      id: "item-3",
      title: "Item 3"
    },
    "item-4": {
      id: "item-4",
      title: "Item 4"
    },
    "item-5": {
      id: "item-5",
      title: "Item 5"
    },
    "item-6": {
      id: "item-6",
      title: "Item 6"
    }
  },
  groups: [
    {
      id: "group-1",
      title: "Group 1",
      isGroup: true,
      itemIds: ["item-1", "item-2"]
    },
    {
      id: "group-2",
      title: "Group 2",
      isGroup: true,
      itemIds: ["item-3"]
    },
    {
      id: "group-3",
      title: "Layer 1",
      isGroup: false,
      itemIds: ["item-4", "item-5", "item-6"]
    }
  ],
  groupOrder: ["group-1", "group-2", "group-3", ]
};

export default data
