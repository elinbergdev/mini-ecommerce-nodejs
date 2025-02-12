import { Request, Response } from "express";
import { productService } from "../services/productService";

export class ProductController {
  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await productService.getProducts(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const userId = req.headers["user-id"] as string; // In real app, get from auth

      if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      const product = await productService.getProductWithDiscount(
        productId,
        userId,
      );

      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
