import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Product } from './types'

admin.initializeApp();

const inventoryRef = admin.database().ref('/inventory');

export const getProducts = functions.https.onRequest(async (req, res) => {
    const allowEmpty: Boolean = req.query.allowEmpty === "true" ? true : false;
    console.log(allowEmpty);
    await inventoryRef.once("value", (snapshot) => {
        let products: any[] = snapshot ? snapshot.val() : [];
        products = allowEmpty === true ? products : products.filter((product) => product.inventory_count != 0);
        res.status(200);
        res.send(products);
    });
});

export const getOneProduct = functions.https.onRequest(async (req, res) => {
    const title = req.query.title;
    await inventoryRef.once("value", (snapshot) => {
        const products: any[] = snapshot ? snapshot.val() : [];
        const result = products.find((product) => product.title === title);
        res.status(200);
        res.send(result);
    });
});

export const purchaseProduct = functions.https.onRequest(async (req, res) => {
    const title: String = req.query.title;
    await inventoryRef.once("value", async (snapshot) => {
        const original: any[] = snapshot ? snapshot.val() : [];
        const products = original !== null ? original : [];
        let result = null;
        products.forEach((product) => {
            if (product.title === title && product.inventory_count != 0) {
                product.inventory_count--;
                result = product;
            }
        });
        await inventoryRef.set(products);
        res.status(200);
        res.send(result);
    });
})

export const addProduct = functions.https.onRequest(async (req, res) => {
    const title: String = req.body.title;
    const price: Number = req.body.price;
    const inventory: Number = req.body.inventory;

    if (title !== null && price !== null && inventory !== null) {
        const product: Product = {
            title: title,
            price: price,
            inventory_count: inventory
        };
        await inventoryRef.once("value", async (snapshot) => {
            const original: any[] = snapshot ? snapshot.val() : [];
            const products = original !== null ? original : [];
            products.push(product);
            await inventoryRef.set(products);
        });
        res.status(200);
        res.send("Successfully inserted " + title);
    } else {
        res.status(400);
        res.send("Error!");
    }
});
