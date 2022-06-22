import { errorBoundary } from "../../services/errorBoundary";
import { axiosInstance, DELETE, GET, POST, PUT } from "..";

const response = {
  data: { car: "BMW" },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

const fakeError = {
  response: {
    status: 500,
  },
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

jest.mock("services/errorBoundary");

const mockRequestCallback = (
  axiosInstance.interceptors.request.use as jest.Mock
).mock.calls[0][0];

const mockResponseErrorCallback = (
  axiosInstance.interceptors.response.use as jest.Mock
).mock.calls[0][1];

const mockResponseCallback = (
  axiosInstance.interceptors.response.use as jest.Mock
).mock.calls[0][0];

describe("api", () => {
  it("should add authorization token to header", () => {
    localStorage.token = "token";
    expect(
      mockRequestCallback({ headers: { Authorization: "token" } })
    ).toStrictEqual({
      headers: { Authorization: "Bearer token" },
    });
  });

  it("should be error on response interceptor", () => {
    try {
      mockResponseErrorCallback(fakeError).catch(() => {});
    } catch {
      expect(errorBoundary).toHaveBeenCalled();
    }
  });

  it("should be error on response interceptor", () => {
    try {
      mockResponseCallback(response);
    } catch {
      expect(errorBoundary).not.toHaveBeenCalled();
    }
  });

  it("should be get data", async () => {
    const getSpy = jest.spyOn(axiosInstance, "get").mockResolvedValue(response);

    expect(getSpy).not.toHaveBeenCalled();

    const result = await GET("");

    expect(result.data).toEqual(response.data);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it("should be delete data", async () => {
    const deleteSpy = jest
      .spyOn(axiosInstance, "delete")
      .mockResolvedValue(response);

    expect(deleteSpy).not.toHaveBeenCalled();

    const result = await DELETE("");

    expect(result.statusText).toEqual(response.statusText);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it("should be put data", async () => {
    const putSpy = jest.spyOn(axiosInstance, "put").mockResolvedValue(response);

    expect(putSpy).not.toHaveBeenCalled();

    const result = await PUT("", "");

    expect(result.statusText).toBe("OK");
    expect(putSpy).toHaveBeenCalledTimes(1);
  });

  it("should be post data", async () => {
    const postSpy = jest
      .spyOn(axiosInstance, "post")
      .mockResolvedValue(response);

    expect(postSpy).not.toHaveBeenCalled();

    const result = await POST("", "");

    expect(result.status).toBe(200);
    expect(postSpy).toHaveBeenCalledTimes(1);
  });
});
