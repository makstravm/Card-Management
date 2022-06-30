import { RootStore } from "store/index";
import { axiosInstance } from "api/index";

const responseCardList = {
  data: [
    {
      Name: "Bob",
      Position: "dqe",
      Department: ".NET",
      Car: false,
      id: 1,
    },
    {
      Name: "Jane",
      Position: "Programmer",
      Department: "SEO",
      Car: false,
      id: 2,
    },
  ],
};

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
      },
      response: {
        use: jest.fn(),
        eject: jest.fn(),
      },
    },
    get: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
  })),
}));

const { fields, cards } = new RootStore();

describe("cards", () => {
  beforeEach(() => {
    cards.cardsList = responseCardList.data;
  });

  describe("should  get all cards", () => {
    it("should receive data for successful response", async () => {
      jest.spyOn(axiosInstance, "get").mockResolvedValue(responseCardList);
      await cards.getAllCardsAction();
      expect(cards.cardsList).toEqual(responseCardList.data);
    });

    it("should receive data for error response", async () => {
      jest.spyOn(axiosInstance, "get").mockRejectedValue("Error");
      await cards.getAllCardsAction();
      expect(cards.error).toEqual("Error");
    });
  });

  describe("should  delete card", () => {
    it("should receive data for successful response", async () => {
      const delSpy = jest.spyOn(axiosInstance, "delete");

      cards.cardsList = responseCardList.data;
      expect(cards.cardsList.length).toBe(2);
      await cards.deleteCardAction(2);
      expect(delSpy).toBeCalledTimes(1);
      expect(cards.cardsList.length).toBe(1);
    });

    it("should receive data for error response", async () => {
      jest.spyOn(axiosInstance, "delete").mockRejectedValue("Error");
      await cards.deleteCardAction(2);
      expect(cards.error).toEqual("Error");
    });
  });

  describe("should  save card", () => {
    const newCard = {
      Name: "Lolly",
      Position: "Programmer",
      Department: "JAVA",
      Car: true,
      id: 3,
    };

    it("should receive data for successful response", async () => {
      jest.spyOn(axiosInstance, "post").mockResolvedValue({ data: newCard });
      await cards.saveCardAction(newCard);
      expect(cards.cardsList).toEqual([...responseCardList.data, newCard]);
    });

    it("should receive data for error response", async () => {
      jest.spyOn(axiosInstance, "post").mockRejectedValue("Error");
      await cards.saveCardAction(newCard);
      expect(cards.error).toEqual("Error");
    });
  });

  describe("should edited card after moved it", () => {
    it("should receive data for successful response checkbox field", async () => {
      const newCardList = [
        {
          Name: "Bob",
          Position: "dqe",
          Department: ".NET",
          Car: true,
          id: 1,
        },
        {
          Name: "Jane",
          Position: "Programmer",
          Department: "SEO",
          Car: false,
          id: 2,
        },
      ];

      const moveEditedSpy = jest.spyOn(axiosInstance, "put");

      await cards.moveEditCardAction(1, "Car", "true");
      expect(cards.cardsList).toEqual(newCardList);
      expect(moveEditedSpy).toBeCalledTimes(1);
    });

    it("should receive data for successful response checkbox field", async () => {
      const newCardList = [
        {
          Name: "Bob",
          Position: "dqe",
          Department: "SEO",
          Car: false,
          id: 1,
        },
        {
          Name: "Jane",
          Position: "Programmer",
          Department: "SEO",
          Car: false,
          id: 2,
        },
      ];

      const moveEditedSpy = jest.spyOn(axiosInstance, "put");

      await cards.moveEditCardAction(1, "Department", "SEO");
      expect(cards.cardsList).toEqual(newCardList);
      expect(moveEditedSpy).toBeCalled();
    });

    it("should receive data for error response", async () => {
      jest.spyOn(axiosInstance, "put").mockRejectedValue("Error");
      await cards.moveEditCardAction(1, "Car", "true");
      expect(cards.error).toEqual("Error");
    });
  });

  describe("should  edit card", () => {
    const editedCard = {
      Name: "Lolly",
      Position: "Programmer",
      Department: "JAVA",
      Car: true,
      id: 2,
    };

    const newCardList = [
      {
        Name: "Bob",
        Position: "dqe",
        Department: ".NET",
        Car: false,
        id: 1,
      },
      {
        Name: "Lolly",
        Position: "Programmer",
        Department: "JAVA",
        Car: true,
        id: 2,
      },
    ];

    it("should receive data for successful response", async () => {
      jest.spyOn(axiosInstance, "put").mockResolvedValue({ data: editedCard });
      await cards.editCardAction(editedCard);
      expect(cards.cardsList).toEqual(newCardList);
    });

    it("should receive data for error response", async () => {
      jest.spyOn(axiosInstance, "put").mockRejectedValue("Error");
      await cards.editCardAction(editedCard);
      expect(cards.error).toEqual("Error");
    });
  });

  describe("should  get grouped card list ", () => {
    beforeEach(() => {
      fields.fieldsList = [
        {
          name: "Name",
          type: "text",
          required: true,
          options: [],
          id: 1,
        },
        {
          name: "Position",
          type: "text",
          required: true,
          options: [],
          id: 2,
        },
        {
          name: "Department",
          type: "select",
          required: false,
          options: [
            {
              id: "0.5372611094649213",
              value: ".NET",
            },
            {
              id: "0.5692681653767555",
              value: "C++",
            },

            {
              id: "0.7056778685517964",
              value: "Java",
            },
            {
              id: "0.3927097732007325",
              value: "SEO",
            },
          ],
          id: 3,
        },
        {
          name: "Car",
          type: "checkbox",
          required: false,
          options: [],
          id: 4,
        },
      ];
    });

    it("should  get grouped card by All", async () => {
      const groupCardsAll = [
        "All",
        [
          {
            Name: "Bob",
            Position: "dqe",
            Department: ".NET",
            Car: false,
            id: 1,
          },
          {
            Name: "Jane",
            Position: "Programmer",
            Department: "SEO",
            Car: false,
            id: 2,
          },
        ],
      ];

      expect(cards.getGroupCardsList("All")).toEqual([groupCardsAll]);
    });

    it("should get grouped card by Car", async () => {
      const groupCardsCar = [
        [
          "false",
          [
            {
              Name: "Bob",
              Position: "dqe",
              Department: ".NET",
              Car: false,
              id: 1,
            },
            {
              Name: "Jane",
              Position: "Programmer",
              Department: "SEO",
              Car: false,
              id: 2,
            },
          ],
        ],
        ["true", []],
      ];

      expect(cards.getGroupCardsList("Car")).toEqual(groupCardsCar);
    });

    it("should get grouped card by Department", async () => {
      const groupCardsDepartment = [
        [
          ".NET",
          [
            {
              Name: "Bob",
              Position: "dqe",
              Department: ".NET",
              Car: false,
              id: 1,
            },
          ],
        ],
        ["C++", []],
        ["Java", []],

        [
          "SEO",
          [
            {
              Name: "Jane",
              Position: "Programmer",
              Department: "SEO",
              Car: false,
              id: 2,
            },
          ],
        ],
        ["none", []],
      ];

      expect(cards.getGroupCardsList("Department")).toEqual(
        groupCardsDepartment
      );
    });
  });
});
