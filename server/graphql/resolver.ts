// Provide resolver functions for your schema fields
import { ProductController } from './controllers/productController'

export const resolvers = {
    Query: {
        product: (obj: any, args: any) => ProductController.getProduct(args.title),
        allProducts: (obj: any, args: any) => ProductController.getAllProducts(args.allowEmpty),
    },
    Mutation: {
        purchaseProduct: (obj: any, args: any) => ProductController.purchaseProduct(args.title)
    }
};
