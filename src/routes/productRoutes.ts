import { Router } from "express";
import { ProductController } from "../controllers/productController";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getProducts);
router.get("/:productId", productController.getProduct);

export default router;
