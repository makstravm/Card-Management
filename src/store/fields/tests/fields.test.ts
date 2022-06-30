import { RootStore } from "store/index";
import { axiosInstance } from "api/index";
import { FieldStateType } from "../types";

const response = {
  data: [
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
          value: " C++",
        },
        {
          id: "0.5692681653767565",
          value: "JAVA",
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

const { cards, fields } = new RootStore();

jest.mock("js-cookie");

describe("fields", () => {
  describe("get field types", () => {
    it("should receive data for successful response", async () => {
      const response = {
        data: [
          {
            id: 1,
            value: "text",
          },
          {
            id: 2,
            value: "checkbox",
          },
          {
            id: 3,
            value: "select",
          },
        ],
      };

      jest.spyOn(axiosInstance, "get").mockResolvedValue(response);
      await fields.getFieldTypesAction();
      expect(fields.fieldTypes).toEqual(response.data);
    });

    it("should receive data for error response", async () => {
      jest.spyOn(axiosInstance, "get").mockRejectedValue("Error");
      await fields.getFieldTypesAction();
      expect(fields.error).toEqual("Error");
    });
  });

  describe("should get all fields ", () => {
    it("should receive data for successful response", async () => {
      const response = {
        data: [
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
                value: " C++",
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
        ],
      };

      jest.spyOn(axiosInstance, "get").mockResolvedValue(response);
      await fields.getAllFieldAction();
      expect(fields.fieldsList).toEqual(response.data);
    });

    it("should receive data for error response", async () => {
      jest.spyOn(axiosInstance, "get").mockRejectedValue("Error");
      await fields.getAllFieldAction();
      expect(fields.error).toEqual("Error");
    });
  });

  describe("should save field ", () => {
    const newFieldCheckBox: FieldStateType = {
      id: 10,
      name: "Married",
      type: "checkbox",
      required: false,
      options: [],
    };

    const newFieldText: FieldStateType = {
      id: 11,
      name: "Test",
      type: "test",
      required: false,
      options: [],
    };

    const card = [
      {
        Name: "Bob",
        Position: "dqe",
        Department: ".NET",
        Car: false,
        id: 1,
      },
    ];

    const cardUpdated = {
      Name: "Bob",
      Position: "dqe",
      Department: ".NET",
      Car: false,
      Married: false,
      id: 1,
    };

    beforeEach(() => {
      cards.cardsList = card;
      fields.fieldsList = response.data;
    });

    it("should receive data for successful response checkbox field", async () => {
      jest
        .spyOn(axiosInstance, "post")
        .mockResolvedValue({ data: newFieldCheckBox });
      jest.spyOn(axiosInstance, "put").mockResolvedValue({ data: cardUpdated });

      await fields.saveFieldAction(newFieldCheckBox);

      expect(fields.fieldsList).toStrictEqual([
        ...response.data,
        newFieldCheckBox,
      ]);
      expect(cards.cardsList).toStrictEqual([cardUpdated]);
    });

    it("should receive data for successful response text field", async () => {
      jest
        .spyOn(axiosInstance, "post")
        .mockResolvedValue({ data: newFieldText });
      jest.spyOn(axiosInstance, "put").mockResolvedValue({ data: cardUpdated });

      await fields.saveFieldAction(newFieldText);

      expect(fields.fieldsList).toStrictEqual([...response.data, newFieldText]);
      expect(cards.cardsList).toStrictEqual([cardUpdated]);
    });

    it("should receive data for error response text", async () => {
      jest.spyOn(axiosInstance, "post").mockRejectedValue("Error");
      await fields.saveFieldAction(newFieldCheckBox);
      expect(fields.error).toEqual("Error");
    });
  });

  describe("should edit field ", () => {
    const cardData = [
      {
        Name: "Bob",
        Position: "dqe",
        Department: "JAVA",
        Car: false,
        id: 1,
      },
    ];

    beforeEach(() => {
      fields.fieldsList = response.data;
      cards.cardsList = cardData;
    });

    it("should be edited field and updated select field with options are save  for successful response", async () => {
      const responseUpdateSelectField = {
        data: [
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
            name: "Department Update",
            type: "select",
            required: false,
            options: [
              {
                id: "0.5372611094649213",
                value: ".NET",
              },
              {
                id: "0.5692681653767555",
                value: " C++",
              },
              {
                id: "0.5692681653767565",
                value: "JAVA",
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
        ],
      };

      const updatedFieldSelect: FieldStateType = {
        name: "Department Update",
        type: "select",
        required: false,
        options: [
          {
            id: "0.5372611094649213",
            value: ".NET",
          },
          {
            id: "0.5692681653767555",
            value: " C++",
          },
          {
            id: "0.5692681653767565",
            value: "JAVA",
          },
        ],
        id: 3,
      };

      const cardDataUpdated = {
        Name: "Bob",
        Position: "dqe",
        "Department Update": ".NET",
        Car: false,
        Married: false,
        id: 1,
      };

      jest
        .spyOn(axiosInstance, "put")
        .mockResolvedValueOnce({ data: updatedFieldSelect });
      jest
        .spyOn(axiosInstance, "put")
        .mockResolvedValue({ data: cardDataUpdated });
      await fields.editFieldAction("Department", updatedFieldSelect);

      expect(fields.fieldsList).toStrictEqual(responseUpdateSelectField.data);
      expect(cards.cardsList).toStrictEqual([cardDataUpdated]);
    });

    it("should be edited field and updated select field with some option are removed  for successful response", async () => {
      const responseUpdatedSelectField = {
        data: [
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
            name: "Department Update",
            type: "select",
            required: false,
            options: [
              {
                id: "0.5372611094649213",
                value: ".NET",
              },
              {
                id: "0.5692681653767555",
                value: " C++",
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
        ],
      };

      const updatedFieldSelect: FieldStateType = {
        name: "Department Update",
        type: "select",
        required: false,
        options: [
          {
            id: "0.5372611094649213",
            value: ".NET",
          },
          {
            id: "0.5692681653767555",
            value: " C++",
          },
        ],
        id: 3,
      };

      const cardDataUpdated = {
        Name: "Bob",
        Position: "dqe",
        "Department Update": "none",
        Car: false,
        Married: false,
        id: 1,
      };

      jest
        .spyOn(axiosInstance, "put")
        .mockResolvedValueOnce({ data: updatedFieldSelect });
      jest
        .spyOn(axiosInstance, "put")
        .mockResolvedValue({ data: cardDataUpdated });
      await fields.editFieldAction("Department", updatedFieldSelect);

      expect(fields.fieldsList).toStrictEqual(responseUpdatedSelectField.data);
      expect(cards.cardsList).toStrictEqual([cardDataUpdated]);
    });

    it("should be edited field and updated checkbox field for successful response", async () => {
      const responseUpdateCheckBoxField = {
        data: [
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
                value: " C++",
              },
              {
                id: "0.5692681653767565",
                value: "JAVA",
              },
            ],
            id: 3,
          },
          {
            name: "Car Update",
            type: "checkbox",
            required: false,
            options: [],
            id: 4,
          },
        ],
      };

      const updatedField: FieldStateType = {
        name: "Car Update",
        type: "checkbox",
        required: false,
        options: [],
        id: 4,
      };

      const cardDataUpdated = {
        Name: "Bob",
        Position: "dqe",
        Department: ".NET",
        "Car Update": false,
        Married: false,
        id: 1,
      };

      jest
        .spyOn(axiosInstance, "put")
        .mockResolvedValueOnce({ data: responseUpdateCheckBoxField });
      jest
        .spyOn(axiosInstance, "put")
        .mockResolvedValue({ data: cardDataUpdated });

      await fields.editFieldAction("Car", updatedField);

      expect(cards.cardsList).toStrictEqual([cardDataUpdated]);
    });

    it("should receive data for error response", async () => {
      const updatedField: FieldStateType = {
        name: "Department Update",
        type: "select",
        required: false,
        options: [
          {
            id: "0.5372611094649213",
            value: ".NET",
          },
          {
            id: "0.5692681653767555",
            value: " C++",
          },
          {
            id: "0.5692681653767565",
            value: "JAVA",
          },
        ],
        id: 3,
      };

      jest.spyOn(axiosInstance, "put").mockRejectedValue("Error");
      await fields.editFieldAction("Car", updatedField);
      expect(fields.error).toEqual("Error");
    });
  });

  describe("should delete field ", () => {
    it("should receive date and updating cards for successful response", async () => {
      const card = [
        {
          Name: "Bob",
          Position: "dqe",
          Department: ".NET",
          Car: false,
          id: 1,
        },
      ];

      const cardUpdated = {
        Name: "Bob",
        Position: "dqe",
        Department: ".NET",
        Married: false,
        id: 1,
      };

      cards.cardsList = card;
      fields.fieldsList = response.data;

      const deleteSpy = jest.spyOn(axiosInstance, "delete");

      jest.spyOn(axiosInstance, "put").mockResolvedValue({ data: cardUpdated });

      await fields.deleteFieldAction(4, "Car");

      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(cards.cardsList).toStrictEqual([cardUpdated]);
    });

    it("should receive data for error response", async () => {
      jest.spyOn(axiosInstance, "delete").mockRejectedValue("Error");
      await fields.deleteFieldAction(4, "Car");
      expect(fields.error).toEqual("Error");
    });
  });

  describe("should delete field option ", () => {
    const selectField = {
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
          id: "0.5692681653767565",
          value: "JAVA",
        },
      ],
      id: 3,
    };

    it("should receive date for successful response", async () => {
      const updatedsSelectField = {
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
        ],
        id: 3,
      };

      const card = [
        {
          Name: "Bob",
          Position: "dqe",
          Department: "JAVA",
          Car: false,
          id: 1,
        },
        {
          Name: "Bob 2",
          Position: "dqe2",
          Department: ".NET",
          Car: false,
          id: 2,
        },
      ];

      const responseCardUpdated = [
        {
          Name: "Bob",
          Position: "dqe",
          Department: "none",
          Car: false,
          Married: false,
          id: 1,
        },
        {
          Name: "Bob 2",
          Position: "dqe2",
          Department: ".NET",
          Car: false,
          id: 2,
        },
      ];

      const cardUpdated = {
        Name: "Bob",
        Position: "dqe",
        Department: "none",
        Car: false,
        Married: false,
        id: 1,
      };

      cards.cardsList = [...card];
      fields.fieldsList = response.data;

      jest
        .spyOn(axiosInstance, "put")
        .mockResolvedValueOnce({ data: updatedsSelectField });

      jest.spyOn(axiosInstance, "put").mockResolvedValue({ data: cardUpdated });
      await fields.deleteFieldOptionAction(
        3,
        selectField,
        "JAVA",
        "Department"
      );

      expect(fields.fieldsList[2]).toStrictEqual(updatedsSelectField);
      expect(cards.cardsList).toStrictEqual(responseCardUpdated);
    });

    it("should receive data for error response", async () => {
      jest.spyOn(axiosInstance, "put").mockRejectedValue("Error");
      await fields.deleteFieldOptionAction(
        3,
        selectField,
        "JAVA",
        "Department"
      );
      expect(fields.error).toEqual("Error");
    });
  });

  it("should get groupOptions", () => {
    fields.fieldsList = response.data;
    fields.getFieldTypesAction();

    const { groupOptions } = fields;

    expect(groupOptions[1].value).toBe("Department");
  });

  it("should get fieldsListAndInitValFormi", () => {
    fields.fieldsList = response.data;

    const { fieldsListAndInitValFormik } = fields;

    expect(fieldsListAndInitValFormik.initialValues.Car).toBe(false);
    expect(fieldsListAndInitValFormik.fieldsList).toStrictEqual(response.data);
  });
});
