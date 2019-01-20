import { Product } from '../types/types'
import * as rm from 'typed-rest-client/RestClient'

const requestURL = "https://us-central1-shopify-challenge-s19.cloudfunctions.net/";

export class ProductController {
    public static async getProduct(title: String): Promise<Product | null> {
        let rest: rm.RestClient = new rm.RestClient('rest-client', requestURL);
        const result: rm.IRestResponse<Product> = await rest.get<Product>(`getOneProduct?title=${title}`);
        return result.result;
    }

    public static async getAllProducts(allowEmpty: Boolean): Promise<Product[]> {
        let rest: rm.RestClient = new rm.RestClient('rest-client', requestURL);
        console.log(`getProducts?allowEmpty=${allowEmpty}`);
        const result: rm.IRestResponse<Product[]> = await rest.get<Product[]>(`getProducts?allowEmpty=${allowEmpty}`);
        return result.result ? result.result : [];
    }

    public static async purchaseProduct(title: String): Promise<Product | null> {
        let rest: rm.RestClient = new rm.RestClient('rest-client', requestURL);
        const result: rm.IRestResponse<Product> = await rest.get<Product>(`purchaseProduct?title=${title}`);
        return result.result;
    }
}