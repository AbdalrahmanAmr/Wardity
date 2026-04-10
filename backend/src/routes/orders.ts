import { Router, Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";
import { validate, createOrderSchema, updateOrderStatusSchema } from "../utils/validation.js";
import * as orderService from "../services/orderService.js";

export const ordersRouter = Router();

ordersRouter.use(authenticateToken);

ordersRouter.get("/", async (req: AuthRequest, res: Response) => {
  const orders = await orderService.getUserOrders(req.userId!);
  res.json(orders);
});

ordersRouter.get("/:id", async (req: AuthRequest, res: Response) => {
  const order = await orderService.getOrderById(req.params.id, req.userId!);
  if (!order) {
    res.status(404).json({ message: "Order not found", status: 404 });
    return;
  }
  res.json(order);
});

ordersRouter.get("/:id/receipt", async (req: AuthRequest, res: Response) => {
  const receipt = await orderService.getReceipt(req.params.id, req.userId!);
  if (!receipt) {
    res.status(404).json({ message: "Order not found", status: 404 });
    return;
  }
  res.json(receipt);
});

ordersRouter.post("/", async (req: AuthRequest, res: Response) => {
  const validated = validate(createOrderSchema, req.body);
  const result = await orderService.createOrder(req.userId!, validated);
  res.status(201).json(result);
});

ordersRouter.patch("/:id", async (req: AuthRequest, res: Response) => {
  const { status: newStatus } = validate(updateOrderStatusSchema, req.body);

  if (newStatus !== "cancelled") {
    res.status(403).json({ message: "You can only cancel an order", status: 403 });
    return;
  }

  const result = await orderService.cancelOrder(req.params.id, req.userId!);
  if (!result) {
    res.status(404).json({ message: "Order not found", status: 404 });
    return;
  }
  res.json(result);
});
