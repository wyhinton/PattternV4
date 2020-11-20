
const defaultdata = {
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
      id: "group-0",
      title: "Test Group 1",
      isGroup: true,
      itemIds: ["item-1", "item-2"]
    },
    {
      id: "group-1",
      title: "Group 2",
      isGroup: true,
      itemIds: ["item-3"]
    },
    {
      id: "group-2",
      title: "Layer 1",
      isGroup: false,
      itemIds: ["item-4", "item-5", "item-6"]
    }
  ],
  groupOrder: ["group-0", "group-1", "group-2", ]
};

const defaultdata2 = {
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
      id: "group-4",
      title: "test grup 1",
      isGroup: true,
      itemIds: ["item-1", "item-2"]
    },
    {
      id: "group-5",
      title: "Group 2",
      isGroup: true,
      itemIds: ["item-3"]
    },
    {
      id: "group-6",
      title: "Layer 1",
      isGroup: false,
      itemIds: ["item-4", "item-5", "item-6"]
    }
  ],
  groupOrder: ["group-4", "group-5", "group-6", ]
};

var testListArray = {
  lists: [
    {
      id: 0,
      type: 'group',
      color: 'green',
      content: {
        nameOfContent: 'list1 content',
        listItems: defaultdata
      }
    },
    {
      id: 1,
      type: 'group',
      color: 'blue',
      content: {
        nameOfContent: 'list1 content',
        listItems: defaultdata2
      }
    },
    {
      id: 2,
      type: 'item',
      color: 'black',
      content: {
        nameOfContent: 'item content',
        listItems: defaultdata
      }
    },
  ]
}




export default testListArray
