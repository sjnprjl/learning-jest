const { registration, uniqueConstraint, login } = require("./index");

let database = [
  {
    username: "username",
    password: "password123!",
  },
];
// reset database on each test
beforeEach(() => {
  database = [
    {
      username: "username",
      password: "password123!",
    },
  ];
});

// registration function test
describe("can register user", () => {
  it("should throw error if not options provided", () => {
    expect(() => registration()).toThrow(
      new Error("first argument must not be undefined or null.")
    );
  });
  it("should throw error if username is not provided", () => {
    expect(() => {
      registration(
        {
          name: "sujan parajuli",
          password: "password",
          email: "validemail@gmail.com",
        },
        database
      );
    }).toThrow(
      new Error("username must be not be empty and must be valid string")
    );
  });
  it("should throw error if password is not provided", () => {
    expect(() =>
      registration(
        {
          name: "sujan parajuli",
          email: "validemail@gmail.com",
          username: "somevalidusername",
        },
        database
      )
    ).toThrow(new Error("password must not be empty"));
  });

  describe("should throw error if password is weak", () => {
    it("should throw if password length is less than 8", () => {
      expect(() =>
        registration(
          {
            name: "sujan parajuli",
            email: "validemail@gmail.com",
            username: "valideusername",
            password: "pass",
          },
          database
        )
      ).toThrow(new Error("password is weak"));
    });
    it("should throw if password does not contain alphanumeric characters", () => {
      expect(() =>
        registration(
          {
            name: "sujan parajuli",
            email: "validemail@gmail.com",
            username: "valideusername",
            password: "pass",
          },
          database
        )
      ).toThrow(new Error("password is weak"));
    });
    it("should not register if user already exist", () => {
      expect(() =>
        registration(
          {
            name: "sujan parajuli",
            email: "validemail@gmail.com",
            username: "username",
            password: "password123!",
          },
          database
        )
      ).toThrow(new Error("username already exist"));
    });
  });
  describe("should not throw error if everything is fine", () => {
    it("should not throw error if password is strong", () => {
      expect(
        registration(
          {
            name: "sujan parajuli",
            email: "validemail@gmail.com",
            username: "valideusername",
            password: "password123!",
          },
          database
        )
      ).toEqual(true);
    });
  });
});
describe("check database", () => {
  it("should throw error if database already contains username", () => {
    expect(() =>
      uniqueConstraint(
        [{ username: "someone", password: "password" }],
        "someone"
      )
    ).toThrow();
  });
  it("should return true if username does not exist.", () => {
    expect(uniqueConstraint([], "someone")).toEqual(true);
  });
});

describe("login", () => {
  it("should throw error if option is not defined", () => {
    expect(() => login(database)).toThrow();
  });
  it("should throw error if password is not defined", () => {
    expect(() => login(database, { username: "username" })).toThrow(
      new Error("password must be string")
    );
  });

  it("should throw error if username is not defined", () => {
    expect(() => login(database, { password: "somepaswword" })).toThrow(
      new Error("username must be string")
    );
  });
  it("should return true if login", () => {
    expect(
      login([{ username: "sjnprjl", password: "password" }], {
        username: "sjnprjl",
        password: "password",
      })
    ).toEqual(true);
  });
  it("should return false if login is not successful", () => {
    expect(
      login([{ username: "sjnprjl", password: "password" }], {
        username: "sjnprjl",
        password: "pass",
      })
    ).toEqual(false);
  });
});
