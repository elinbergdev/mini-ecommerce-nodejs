import { Product } from "../model/Product";
import { redisService } from "./redisClient";

class ProductService {
  private products: Product[] = [
    { id: "1", name: "Laptop", price: 1000, description: "High-end laptop" },
    { id: "2", name: "Phone", price: 500, description: "Smartphone" },
    // Add more products as needed
  ];

  async getProducts(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = this.products.slice(startIndex, endIndex);
    const total = this.products.length;

    return {
      products: paginatedProducts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProductWithDiscount(
    productId: string,
    userId: string,
  ): Promise<Product | null> {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return null;

    const visitCount = await redisService.getVisitCount(productId, userId);
    await redisService.incrementVisit(productId, userId);

    let discount = 0;

    if (visitCount > 0) {
      discount += 0.1;
    }

    if (new Date().getDay() === 5) {
      discount += 0.05;
    }

    return {
      ...product,
      price: product.price * (1 - discount),
    };
  }
}

export const productService = new ProductService();
