import { Router, Response } from "express";
import { validate, registerSchema, loginSchema, profileUpdateSchema, changePasswordSchema } from "../utils/validation.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";
import * as authService from "../services/authService.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res: Response) => {
  const { email, password, name } = validate(registerSchema, req.body);
  const result = await authService.register(email, password, name);
  res.status(201).json({ data: result, message: "User registered successfully", status: 201 });
});

authRouter.post("/login", async (req, res: Response) => {
  const { email, password } = validate(loginSchema, req.body);
  const result = await authService.login(email, password);
  res.json({ data: result, message: "Login successful", status: 200 });
});

authRouter.get("/me", authenticateToken, async (req: AuthRequest, res: Response) => {
  const user = await authService.getProfile(req.userId!);
  if (!user) {
    res.status(404).json({ message: "User not found", status: 404 });
    return;
  }
  res.json({ data: user, message: "User profile retrieved successfully", status: 200 });
});

authRouter.patch("/profile", authenticateToken, async (req: AuthRequest, res: Response) => {
  const { name, phone } = validate(profileUpdateSchema, req.body);
  const updated = await authService.updateProfile(req.userId!, { name, phone });
  if (!updated) {
    res.status(400).json({ message: "No fields to update", status: 400 });
    return;
  }
  res.json({ data: updated, message: "Profile updated successfully", status: 200 });
});

authRouter.patch("/password", authenticateToken, async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = validate(changePasswordSchema, req.body);
  await authService.changePassword(req.userId!, currentPassword, newPassword);
  res.json({ message: "Password changed successfully", status: 200 });
});
