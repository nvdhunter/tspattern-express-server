import { Request, Response } from "express";
import { controller, get, bodyValidator, post } from "./decorators";

@controller("/auth")
export class LoginController {
  // can only add @get() route binder decorator to func of type RequestHandler
  add(a: number, b: number): number {
    return a + b;
  }

  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password"/>
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === "hi@hi.com" && password === "password") {
      req.session!.loggedIn = true;
      console.log(req.session);
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect("/");
  }
}
